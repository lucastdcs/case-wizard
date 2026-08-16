(()=>{var Vo=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Ut="AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg",Yo=Vo?`https://script.google.com/a/macros/google.com/s/${Ut}/dev`:`https://script.google.com/a/macros/google.com/s/${Ut}/exec`,vt="cw_data_broadcast",Vt="cw_data_tips",Wo=["Processando...","Mantenha o foco!","Aguarde..."];function Te(t,e={}){return new Promise((o,a)=>{let n="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script"),l=setTimeout(()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(new Error("Timeout: A API demorou muito para responder. (Apps Script bloqueado ou erro 500)"))},15e3);window[n]=p=>{clearTimeout(l),document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(p)};let s=Object.keys(e).map(p=>encodeURIComponent(p)+"="+encodeURIComponent(e[p])).join("&"),c=`${Yo}?op=${t}&callback=${n}&t=${Date.now()}&${s}`;i.src=c,i.onerror=()=>{clearTimeout(l),document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(new Error("Erro de conex\xE3o JSONP."))},document.body.appendChild(i)})}var de={fetchTips:async()=>{try{let t=await Te("tips");t?.tips&&localStorage.setItem(Vt,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await Te("broadcast");if(t?.broadcast)return localStorage.setItem(vt,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(vt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(vt)||"[]"),getRandomTip:()=>{let t=Wo,e=localStorage.getItem(Vt);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await de._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await de._performOp("update_broadcast",o)},deleteBroadcast:async t=>await de._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`Executando ${t}...`,e);let o=await Te(t,e);return o&&o.status==="success"?(console.log("Sucesso:",t),!0):(console.warn("Falha:",o),!1)}catch(o){return console.error("Erro JSONP:",o),!1}},logEvent:(t,e,o="",a=null)=>{try{let n="anon";try{let l=fe();l&&(n=l.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:n,version:"v5.1",category:t,action:e,label:o,value:a||""};Te("log",i).catch(l=>{})}catch(n){console.warn("Analytics error",n)}},logUsage:()=>{},sendBAUEscalation:async(t,e)=>{let o={...t,user:e,date:new Date().toISOString()};try{console.log("Executando create_bau...",o);let a=await Te("create_bau",o);if(a&&a.status==="success")return console.log("Sucesso: create_bau"),a;throw new Error(a?.error||a?.message||"Falha na opera\xE7\xE3o BAU")}catch(a){throw console.error("Erro JSONP (BAU):",a),a}},readAgentBAU:async()=>{let t=fe();if(!t)return console.warn("Email n\xE3o encontrado. N\xE3o foi poss\xEDvel buscar casos BAU."),[];try{console.log("Buscando casos BAU para:",t);let e=await Te("read_agent_bau",{user:t});if(e&&e.status==="success"&&Array.isArray(e.cases))return e.cases;if(e&&e.status==="error")throw new Error(e.message||"Erro retornado pela API de leitura");return[]}catch(e){throw console.error("Erro ao buscar casos BAU:",e),e}},updateBAUStatus:async(t,e,o={})=>{let a=fe();try{console.log(`Atualizando status BAU ${t} para ${e}...`);let n=await Te("update_bau_status",{id:t,status:e,user:a,...o});return n&&n.status==="success"}catch(n){return console.error("Erro ao atualizar status BAU:",n),!1}},updateBAUEscalation:async(t,e)=>{let o=fe(),a={...e,id:t,user:o,date_edited:new Date().toISOString()};try{console.log(`Executando update_bau para ${t}...`,a);let n=await Te("update_bau",a);if(n&&n.status==="success")return console.log("Sucesso: update_bau"),n;throw new Error(n?.error||n?.message||"Falha na atualiza\xE7\xE3o BAU")}catch(n){throw console.error("Erro JSONP (Update BAU):",n),n}},fetchUserProfile:async t=>{try{console.log(`Buscando perfil para: ${t}`);let e=await Te("get_user_profile",{ldap:t});return console.log("Resposta bruta do servidor:",e),e&&e.status==="success"&&e.profile?e.profile:null}catch(e){return console.error("Erro ao buscar perfil:",e),null}},getUserSnippets:async t=>{try{return console.log("Buscando snippets para:",t),await Te("get_user_snippets",{user:t})}catch(e){return console.error("Erro ao carregar snippets:",e),{status:"error",snippets:[]}}},saveSnippet:async(t,e)=>{let o={id:t.id,type:t.type,title:t.title,content:t.content,subject:t.subject||"",isCode:t.isCode,isRich:t.isRich,user:e};try{console.log("Salvando snippet na nuvem:",o);let a=await Te("save_snippet",o);return a&&a.status==="success"}catch(a){return console.error("Erro ao salvar snippet:",a),!1}},deleteSnippet:async(t,e)=>{try{console.log(`Deletando snippet ${t}...`);let o=await Te("delete_snippet",{id:t,user:e});return o&&o.status==="success"}catch(o){return console.error("Erro ao deletar snippet:",o),!1}}},Yt=de.sendBAUEscalation,Wt=de.readAgentBAU,Fa=de.updateBAUStatus,Xt=de.updateBAUEscalation,at=de.fetchUserProfile,La=de.getUserSnippets,Ia=de.saveSnippet,qa=de.deleteSnippet;var ne=t=>new Promise(e=>setTimeout(e,t));function xe(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function Ve(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}function Be(t,e,o){return Math.max(e,Math.min(t,o))}var nt="",Je="",wt=null;async function St(){try{let t=document.querySelector('material-button[debug-id="toggle-translation-button"]');if(t){let e=t.textContent.toLowerCase();(e.includes("show original")||e.includes("mostrar original"))&&(console.log("TechSol: Tradu\xE7\xE3o detectada. Revertendo para o idioma original..."),t.click(),await ne(400))}}catch(t){console.warn("TechSol: Erro ao tentar reverter tradu\xE7\xE3o:",t)}}async function Ct(){if(nt&&Je)return nt;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await ne(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let n=document.querySelector("profile-details img");if(n&&n.src.includes("/photos/")){let i=n.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let a=document.querySelector("profile-details .email");return a&&(Je=a.textContent.trim(),console.log("TechSol: Identidade confirmada ->",Je)),t.click(),document.body.click(),nt=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function Ke(){return nt||"Consultor"}function fe(){return Je||null}function Jt(t){let e=new Date,o=e.getHours(),a=e.getDay(),n="Ol\xE1",i="";o>=5&&o<12?(n="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(n="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(n="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let l=[];o>=0&&o<5?l=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?a===1?l=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:a===5?l=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:l=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?l=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:l=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(a===0||a===6)&&(l=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let s=l[Math.floor(Math.random()*l.length)];return{prefix:`${n},`,name:t,suffix:s,icon:i,isFriday:a===5}}async function Xo(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,a=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');a&&(a.click(),await ne(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(l=>{let s=l.innerText.trim();return s.includes("@")&&!s.includes("Is this:")&&s.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Jo(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function Ko(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Google Ads External Customer ID")||n.textContent.includes("Customer ID"));if(e){let n=e.closest("home-data-item")||e.parentElement;if(n){let i=n.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let a=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(a)return a[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"N/A"}function Zo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Account Manager")||o.textContent.includes("AM Name")||o.textContent.includes("Sales Rep"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar AM:",t)}return null}function Qo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("customer time zone")||o.textContent.toLowerCase().includes("time zone")||o.textContent.toLowerCase().includes("timezone"));if(e){let o=e.parentElement;if(o){let a=o.querySelector("sanitized-content");if(a&&a.textContent.trim())return a.textContent.trim();let n=o.querySelector(".data-pair-content")||e.nextElementSibling;if(n&&n.textContent.trim()){let i=n.textContent.trim();if(i&&i!=="---"&&i!=="N/A")return i}}}}catch(t){console.warn("Erro ao capturar Timezone:",t)}return null}async function ea(){let t="---";try{t=window.location.href.split("/").pop()}catch(e){console.warn("Falha URL:",e)}return t}function ta(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("sales program")||o.textContent.toLowerCase().trim()==="program"||o.textContent.toLowerCase().includes("programa"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector('sanitized-content ng-template[debug-id="html-value"]')||o.querySelector("sanitized-content");if(a)return a.textContent.trim();let n=o.querySelector(".data-pair-content")||o.nextElementSibling;if(n)return n.textContent.trim()}}catch(t){console.warn("Erro ao capturar Sales Program:",t)}return""}function oa(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Language")||o.textContent.includes("Idioma"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar Idioma:",t)}return"N/A"}function aa(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Speakeasy ID")||n.textContent.includes("SE ID"));if(e){let n=e.closest(".data-pair")||e.parentElement,i=n.querySelector(".data-pair-content")||n.nextElementSibling;if(i&&i.textContent.trim())return i.textContent.trim()}let o=/Speakeasy.*?(P\d{15,25})/i,a=Array.from(document.querySelectorAll("textarea, .preview, .message-body, .notes-content"));for(let n=a.length-1;n>=0;n--){let l=(a[n].value||a[n].innerText||"").match(o);if(l&&l[1])return l[1]}}catch(t){console.warn("Erro ao capturar SE ID:",t)}return"N/A"}async function Fe(){await St(),Je||await Ct();let t="Cliente",e="";try{let w=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(w&&w.nextElementSibling){let g=w.nextElementSibling.innerText.trim();g&&(t=g)}}catch(h){console.warn("Falha Nome:",h)}try{let w=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(w&&w.nextElementSibling){let g=w.nextElementSibling.innerText.trim();g&&(e=g)}}catch(h){console.warn("Falha URL:",h)}let o=await Xo(),a=Jo(),n=Ko(),i=Zo(),l=Qo(),s=await ea(),c=ta(),p=oa(),m=aa(),f=fe();if(f&&!wt){let h=f.split("@")[0];try{wt=await at(h)}catch(w){console.warn("Falha ao carregar perfil do usu\xE1rio:",w)}}return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:a,cid:n,amName:i,timezone:l,agentName:Ke(),agentEmail:fe(),caseId:s,userProfile:wt,advName:t,site:e,email:o,salesProgram:c,language:p,seId:m}}var Pe=null,Et=null,Ne=.3;var _e=localStorage.getItem("cw_sounds_muted")==="true";function $e(){if(!Pe){let t=window.AudioContext||window.webkitAudioContext;t&&(Pe=new t)}return Pe&&Pe.state==="suspended"&&Pe.resume(),Pe}function Kt(t){if(Et)return Et;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),a=o.getChannelData(0);for(let n=0;n<e;n++)a[n]=Math.random()*2-1;return Et=o,o}var $={setMuted:t=>{_e=t,localStorage.setItem("cw_sounds_muted",t)},isMuted:()=>_e,playClick:()=>{if(_e)return;let t=$e();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Kt(t);let a=t.createBiquadFilter();a.type="highpass",a.frequency.value=4e3;let n=t.createGain();n.gain.setValueAtTime(Ne*.8,e),n.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{if(_e)return;let t=$e();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let a=t.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Ne*.1,e+.005),a.gain.linearRampToValueAtTime(0,e+.02),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{if(_e)return;let t=$e();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((a,n)=>{let i=t.createOscillator(),l=t.createGain();i.type="sine",i.frequency.value=a,l.gain.setValueAtTime(0,e),l.gain.linearRampToValueAtTime(Ne*.6,e+.05),l.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(l),l.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{if(_e)return;let t=$e();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Kt(t);let a=t.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(100,e),a.frequency.exponentialRampToValueAtTime(800,e+.2);let n=t.createGain();n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(Ne*.5,e+.05),n.gain.linearRampToValueAtTime(0,e+.25),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{if(_e)return;let t=$e();if(!t)return;let e=t.currentTime,o=t.createOscillator(),a=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),a.gain.setValueAtTime(Ne,e),a.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{if(_e)return;let t=$e();if(!t)return;let e=t.currentTime,o=.12,a=t.createOscillator(),n=t.createGain(),i=t.createBiquadFilter();a.type="square",a.frequency.setValueAtTime(400,e),a.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),n.gain.setValueAtTime(Ne*4,e),n.gain.exponentialRampToValueAtTime(.001,e+.1),a.connect(i),i.connect(n),n.connect(t.destination),a.start(e),a.stop(e+.12);let l=t.createOscillator(),s=t.createGain();l.type="sine",l.frequency.setValueAtTime(150,e),l.frequency.exponentialRampToValueAtTime(50,e+.15),s.gain.setValueAtTime(Ne*1.5,e),s.gain.exponentialRampToValueAtTime(.001,e+.15),l.connect(s),s.connect(t.destination),l.start(e),l.stop(e+.15),[55,55.4,110.5].forEach(p=>{let m=t.createOscillator(),f=t.createGain(),h=t.createBiquadFilter();m.type="sawtooth",m.frequency.value=p,h.type="lowpass",h.frequency.setValueAtTime(30,e),h.frequency.linearRampToValueAtTime(900,e+o+.2),h.frequency.exponentialRampToValueAtTime(40,e+3),f.gain.setValueAtTime(0,e),f.gain.linearRampToValueAtTime(Ne*.6,e+o+.1),f.gain.exponentialRampToValueAtTime(.001,e+3.5),m.connect(h),h.connect(f),f.connect(t.destination),m.start(e),m.stop(e+3.6)})},playNotification:()=>{if(_e)return;let t=$e();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(a=>{let n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(a.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Ne*a.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+a.dur),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+a.dur+.1)})},playSwoosh:()=>{$.playGenieOpen()},playReset:()=>{$.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!Pe)return;let a=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!a||a.contains(o.relatedTarget))return;let n=Date.now();n-t<e||($.playHover(),t=n)},{passive:!0})}};var Zt=1e4;function Qt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
        :root {
            --cw-primary: #1a73e8;
            --cw-primary-hover: #1557b0;
            --cw-surface: #ffffff;
            --cw-surface-glass: rgba(255, 255, 255, 0.95);
            --cw-border: #dadce0;
            --cw-text: #202124;
            --cw-text-sub: #5f6368;
            --cw-ease-elastic: cubic-bezier(0.25, 0.8, 0.25, 1);
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
    `,document.head.appendChild(e)}function V(t,e={}){let o=document.createElement("div"),a=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:a,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?$.playError():$.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function eo(t,e=null){let o=0,a=0,n=0,i=0,l=e||t;l.style.cursor="grab",l.onmousedown=s;function s(m){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(m.target.tagName)||m.target.closest(".no-drag"))return;m=m||window.event,l.style.cursor="grabbing",t.style.transition="none";let f=t.getBoundingClientRect();t.style.transform="none",t.style.left=f.left+"px",t.style.top=f.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",Zt++,t.style.zIndex=Zt,n=m.clientX,i=m.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=p,document.onmousemove=c}function c(m){m=m||window.event,m.preventDefault(),o=n-m.clientX,a=i-m.clientY,n=m.clientX,i=m.clientY;let f=t.offsetTop-a,h=t.offsetLeft-o,w=16,g=window.innerWidth,v=window.innerHeight,E=t.offsetWidth,N=t.offsetHeight;h=Be(h,w,g-E-w),f=Be(f,w,v-N-w),t.style.top=f+"px",t.style.left=h+"px"}function p(){document.onmouseup=null,document.onmousemove=null,l.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var ye={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var At={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},to={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var oo={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};async function na(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await ne(200);for(let a=0;a<e.length;a++){let n=e.charAt(a),i=document.createElement("span");i.textContent=n,o&&o.parentNode===t?o.before(i):t.appendChild(i);let l=Math.floor(Math.random()*60)+30;a===0&&(l=150),a>e.length-3&&(l=30),await ne(l)}await ne(600),o&&(o.style.display="none")}async function kt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap');
            .splash-container { font-family: 'Google Sans', sans-serif; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #202124; z-index: 2147483647; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1); }
            .splash-exit { animation: focus-out 0.9s cubic-bezier(0.4, 0.0, 0.2, 1) forwards; }
            @keyframes focus-out { 0% { opacity: 1; transform: scale(1); filter: blur(0); } 100% { opacity: 0; transform: scale(1.15); filter: blur(15px); } }

            .sentence-wrapper { display: flex; flex-wrap: wrap; justify-content: center; align-items: baseline; gap: 10px; max-width: 80%; position: relative; }
            .text-part { font-size: 32px; color: #E8EAED; opacity: 0; transition: opacity 0.8s ease; }
            .text-name { font-size: 32px; font-weight: 700; background: linear-gradient(90deg, #8AB4F8, #C58AF9, #F28B82); -webkit-background-clip: text; -webkit-text-fill-color: transparent; opacity: 0; }
            .text-footer { font-size: 20px; color: #9AA0A6; font-weight: 400; width: 100%; text-align: center; margin-top: 12px; opacity: 0; transform: translateY(10px); transition: all 1s cubic-bezier(0.0, 0.0, 0.2, 1); }

            .sextou-badge { display: inline-flex; align-items: center; gap: 6px; margin-top: 16px; padding: 6px 16px; border-radius: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #F28B82; font-size: 14px; font-weight: 500; opacity: 0; transform: scale(0.8); transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1); }
            .cursor { color: #8AB4F8; -webkit-text-fill-color: #8AB4F8; font-weight: 100; margin-left: 1px; animation: blink 1s infinite; }

            .brand-logo { position: absolute; top: 40px; font-size: 20px; font-weight: 500; color: #5f6368; letter-spacing: 1px; text-transform: uppercase; opacity: 0; animation: fade-in-down 0.8s ease forwards; }
            .weather-icon { width: 42px; height: 42px; margin-bottom: 24px; opacity: 0; transform: scale(0.8); transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
            .credit-pro { position: absolute; bottom: 30px; font-size: 11px; color: #5f6368; letter-spacing: 0.5px; opacity: 0; animation: fade-in-simple 1.5s ease 1s forwards; }
            .credit-pro span { color: #8AB4F8; font-weight: 500; opacity: 0.9; }

            .loader-line { position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853); transform: scaleX(0); transform-origin: left; animation: load-line 4s linear forwards; }

            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            @keyframes fade-in-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes load-line { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
            @keyframes fade-in-simple { to { opacity: 1; } }
        `,document.head.appendChild(e)}let t=document.createElement("div");t.className="splash-container",t.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await ne(200);let e=await Ct(),o=Jt(e),a=t.querySelector("#w-icon"),n=t.querySelector("#p1"),i=t.querySelector("#p2"),l=t.querySelector("#p3"),s=t.querySelector("#p-sextou");a&&(a.innerHTML=o.icon),n&&(n.textContent=o.prefix),l&&(l.textContent=o.suffix),await ne(300);let c=a?a.querySelector("svg"):null;if(c&&(c.style.opacity="1",c.style.transform="scale(1)"),await ne(400),n&&(n.style.opacity="1"),$.playStartup(),i&&await na(i,o.name),l&&(l.style.opacity="1",l.style.transform="translateY(0)"),o.isFriday&&s){await ne(400),s.style.display="block",s.offsetWidth;let p=s.querySelector(".sextou-badge");p&&(p.style.opacity="1",p.style.transform="scale(1)")}await ne(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await ne(900),t.parentNode&&t.parentNode.removeChild(t)}}function ao(t){if(!t)return;let e=t.getBoundingClientRect(),o=window.innerWidth,a=window.innerHeight,n=24,i=o-e.width-n,l=a-e.height-n,s=parseFloat(t.style.left)||e.left,c=parseFloat(t.style.top)||e.top,p=Be(s,n,i),m=Be(c,n,l);if(p!==s||m!==c){let f=t.style.transition;t.style.transition="left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",t.style.left=`${p}px`,t.style.top=`${m}px`,setTimeout(()=>{t.style.transition=f},300)}}var qe={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Oe(t,e){e.onmousedown=o;function o(a){a.stopPropagation(),a.preventDefault();let n=t.style.transition;t.style.transition="none";let i=a.clientX,l=a.clientY,s=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),c=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),p=i,m=l,f=!1;function h(v){p=v.clientX,m=v.clientY,f||(window.requestAnimationFrame(()=>{w(),f=!1}),f=!0)}function w(){let v=s+(p-i),E=c+(m-l);v>360&&(t.style.width=v+"px"),E>300&&(t.style.height=E+"px")}function g(){document.removeEventListener("mousemove",h),document.removeEventListener("mouseup",g),setTimeout(()=>{t.style.transition=n},50)}document.addEventListener("mousemove",h),document.addEventListener("mouseup",g)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function it(t){if(!t||t==="N/A"||t==="undefined")return"Data indispon\xEDvel";if(String(t).includes(" | "))return t.split(" | ").map(e=>it(e.trim())).filter(e=>e!=="Data indispon\xEDvel").join(" | ");try{let e=new Date(t);if(isNaN(e.getTime()))return"Data indispon\xEDvel";let o=e.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}),a=e.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});return`${o} \xE0s ${a}`}catch{return"Data indispon\xEDvel"}}function no(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}function io(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),t}function so(){let t=document.createElement("div");return Object.assign(t.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),t}function ve(t,e={}){return new Promise(o=>{let a=io(),n=so(),i=e.danger?"#FF3B30":"#007AFF",l=e.confirmText||(e.danger?"Excluir":"Confirmar");n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${t}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${l}</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)"});let s=m=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(m)},300)},c=n.querySelector("#cw-conf-cancel"),p=n.querySelector("#cw-conf-ok");[c,p].forEach(m=>m.onmouseenter=()=>$.playHover()),c.onclick=()=>{$.playClick(),s(!1)},p.onclick=()=>{$.playClick(),s(!0)}})}function ro(t,e=""){return new Promise(o=>{let a=io(),n=so();n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${t}</div>
            <input type="text" id="cw-prompt-input" value="${e}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a);let i=n.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let l=p=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(p)},300)},s=n.querySelector("#cw-prompt-cancel"),c=n.querySelector("#cw-prompt-ok");[s,c].forEach(p=>p.onmouseenter=()=>$.playHover()),s.onclick=()=>{$.playClick(),l(null)},c.onclick=()=>{$.playClick(),l(i.value)},i.onkeydown=p=>{p.key==="Enter"&&c.click(),p.key==="Escape"&&s.click()}})}var Tt=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.activeFields=[];let e=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(e||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(e){this.currentCaseType!==e&&(this.currentCaseType=e,this.isDirty=!0,this.notify())}setLanguage(e){this.currentLang!==e&&(this.currentLang=e,this.notify())}setPortugalCase(e){this.isPortugalCase!==e&&(this.isPortugalCase=e,this.isDirty=!0,this.notify())}setConsent(e){this.consent!==e&&(this.consent=e,this.isDirty=!0,this.notify())}setTagSupportUsed(e){this.tagSupportUsed=e,e||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(e){this.activeFields=[...e],this.isDirty=!0,this.notify()}removeField(e){this.activeFields=this.activeFields.filter(o=>o!==e),this.isDirty=!0,this.notify()}addFieldAt(e,o){this.activeFields.includes(e)||(this.activeFields.splice(o,0,e),this.isDirty=!0,this.notify())}setForcedScreenshots(e){this.forcedScreenshots=new Set(e),this.isDirty=!0,this.notify()}toggleForcedScreenshot(e,o){o?this.forcedScreenshots.add(e):this.forcedScreenshots.delete(e),this.isDirty=!0,this.notify()}setStatus(e){this.currentStatus!==e&&(this.currentStatus=e,this.isDirty=!0,this.notify())}setSubStatus(e){this.currentSubStatus!==e&&(this.currentSubStatus=e,this.isDirty=!0,this.notify())}setScreenshotMode(e){this.screenshotMode=e,this.notify()}setActiveTasks(e){this.activeTasks=e,this.isDirty=!0,this.notify()}toggleFavorite(e){this.favorites.has(e)?this.favorites.delete(e):this.favorites.add(e),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(e,o){this.formData[e]!==o&&(this.formData[e]=o,this.isDirty=!0,this.notify())}listeners=[];subscribe(e){return this.listeners.push(e),()=>this.listeners=this.listeners.filter(o=>o!==e)}notify(){this.listeners.forEach(e=>e(this))}},G=new Tt;var ia={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},lo={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function ge(t,e,o,a,n,i){let l=document.createElement("div");Object.assign(l.style,ia),eo(t,l);let s=document.createElement("div");if(Object.assign(s.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let N=document.createElement("style");N.id="cw-header-anim",N.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(N)}s.style.animation="cw-header-flow 6s linear infinite",l.appendChild(s),n&&(n.googleLine=s);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"12px"});let p=document.createElement("img");p.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(p.style,{width:"20px",height:"20px",pointerEvents:"none"});let m=document.createElement("span");m.textContent=e,c.appendChild(p),c.appendChild(m);let f=document.createElement("div");Object.assign(f.style,{display:"flex",alignItems:"center",gap:"4px"});let h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',w='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',g=document.createElement("div");g.innerHTML=h,Object.assign(g.style,lo),g.title="Sobre & Feedback",g.classList.add("no-drag"),g.onmouseenter=()=>{g.style.background="rgba(255,255,255,0.1)",g.style.color="#FFF"},g.onmouseleave=()=>{g.style.color!=="rgb(138, 180, 248)"&&(g.style.background="transparent",g.style.color="#9AA0A6")};let v=document.createElement("div");v.innerHTML=w,Object.assign(v.style,lo),v.title="Fechar",v.classList.add("no-drag","cw-header-close"),v.onmouseenter=()=>{v.style.background="rgba(242, 139, 130, 0.2)",v.style.color="#F28B82"},v.onmouseleave=()=>{v.style.background="transparent",v.style.color="#9AA0A6"},v.onmousedown=N=>N.stopPropagation(),g.onmousedown=N=>N.stopPropagation(),v.onclick=i;let E=sa(t,e,o,a);return g.onclick=N=>{N.stopPropagation(),E.style.opacity==="1"?(E.style.opacity="0",E.style.pointerEvents="none",g.style.color="#9AA0A6",g.style.background="transparent"):(E.style.opacity="1",E.style.pointerEvents="auto",g.style.color="#8AB4F8",g.style.background="rgba(138, 180, 248, 0.1)")},f.appendChild(g),f.appendChild(v),l.appendChild(c),l.appendChild(f),l}function sa(t,e,o,a){let n=document.createElement("div");return Object.assign(n.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),n.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${e}</div>
        <div style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">Vers\xE3o ${o}</div>
        
        <div style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${a}
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
                <span>\u{1F4AC}</span> Reportar Bug ou Sugest\xE3o
            </a>
        </div>

        <div style="font-size: 12px; color: #9aa0a6;">
            created by <span style="color: #1a73e8; font-weight: 500;">@lucaste</span>
        </div>
        
        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #5f6368; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            Voltar
        </button>
    `,setTimeout(()=>{let i=n.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let l=n.querySelector("#close-help-internal");l&&(l.onmouseover=()=>l.style.backgroundColor="#f8f9fa",l.onmouseout=()=>l.style.backgroundColor="white",l.onclick=()=>{n.style.opacity="0",n.style.pointerEvents="none"})},0),t.appendChild(n),n}var B={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},ue={small:"8px",medium:"12px",large:"20px",pill:"100px"},De={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},ce="cubic-bezier(0.34, 1.56, 0.64, 1)",ra={width:"100%",padding:"14px 16px",borderRadius:ue.medium,border:`1.5px solid ${B.border}`,backgroundColor:B.bgInput,fontSize:"14px",color:B.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${ce}`,outline:"none"},Ua={...ra,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},Va={fontSize:"12px",fontWeight:"700",color:B.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},Ya={display:"block",fontSize:"14px",fontWeight:"600",color:B.text,marginBottom:"10px",marginTop:"20px"},Wa={fontSize:"12px",color:B.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},Ft={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:B.primary},Xa={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:B.text,cursor:"pointer",padding:"16px 20px",backgroundColor:B.surface,border:`1px solid ${B.border}`,borderRadius:ue.large,transition:`all 0.4s ${ce}`,userSelect:"none",boxShadow:De.subtle},Ja={padding:"14px 28px",color:"#fff",backgroundColor:B.primary,border:"none",borderRadius:ue.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${ce}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},Ka={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${B.primary}`,color:B.primary,borderRadius:ue.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${ce}`},Za={background:"transparent",border:`1px solid ${B.border}`,borderRadius:ue.pill,color:B.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${ce}`};function co(t,e){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,ye,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${ce}, height 0.4s ${ce}, transform 0.4s ${ce}, opacity 0.3s ease`,borderRadius:ue.large,boxShadow:De.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let a={popup:o,googleLine:null},n=ge(o,"Case Notes",t,"Gera notas padronizadas com excel\xEAncia visual.",a,e);o.appendChild(n);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:B.surface}),o.appendChild(i);let l=document.createElement("div");l.textContent="created by lucaste@",Object.assign(l.style,oo,{padding:"16px 24px",borderTop:`1px solid ${B.bgInput}`,color:B.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),o.appendChild(l);let s=document.createElement("div");return Object.assign(s.style,qe),s.className="no-drag",o.appendChild(s),Oe(o,s),la(),{popup:o,content:i,header:n,animRefs:a,credit:l}}function la(){if(document.getElementById("cw-notes-refactor-styles"))return;let t=document.createElement("style");t.id="cw-notes-refactor-styles",t.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${ue.medium} !important;
            border: 1.5px solid ${B.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: all 0.2s ${ce} !important;
            box-sizing: border-box !important;
            background: ${B.bgInput} !important;
            color: ${B.text} !important;
            outline: none !important;
            box-shadow: ${De.subtle} !important;
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
            transition: border-color 0.2s ${ce}, background-color 0.2s ${ce}, box-shadow 0.2s ${ce} !important;
        }

        .cw-input:hover, .cw-textarea:hover, #notes-assistant-popup .cw-select:hover {
            border-color: #bdc1c6 !important;
            background-color: #f1f3f4 !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }

        .cw-input:focus, .cw-textarea:focus, #notes-assistant-popup .cw-select:focus {
            border-color: ${B.primary} !important;
            background-color: #fff !important;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15), 0 2px 8px rgba(0,0,0,0.05) !important;
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${B.textSub};
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
            background: ${B.bgInput};
        }

        .cw-btn-primary {
            background: ${B.primary};
            color: #fff;
            border: none;
            border-radius: ${ue.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${ce};
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
            color: ${B.textSub};
            border: 1px solid ${B.border};
            border-radius: ${ue.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${ce};
        }
        .cw-btn-secondary:hover {
            background: ${B.bgInput};
            border-color: #bdc1c6;
            color: ${B.text};
        }
    `,document.head.appendChild(t)}var Ce={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} O que foi feito:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evid\xEAncias de Contato",ligacao_1:"Liga\xE7\xE3o 1",ligacao_2:"Liga\xE7\xE3o 2",mensagem_am:"Mensagem para AM"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Qu\xE9 se hizo:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evidencias de Contacto",ligacao_1:"Llamada 1",ligacao_2:"Llamada 2",mensagem_am:"Mensaje para AM"}},Le={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},ca=["GTM_GA4_VERIFICADO","MULTIPLE_CIDS"],da=["REASON_COMMENTS"];function Ze(t){let e=[...da];return t?.requiresTasks&&e.push("GTM_GA4_VERIFICADO"),e}function st(t){let e=[...ca,...t?.extraOptionalFields||[]],o=Ze(t);return e.filter(a=>!o.includes(a))}var Ie={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Ye={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},We=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],rt=["CONSIDERACOES","COMENTARIOS"],lt={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
\u2022 Configura\xE7\xE3o de Convers\xF5es`,"field-CONTEXTO_CALL":`\u2022 Percebi que o(a) anunciante n\xE3o tinha GTM Instalado.
\u2022 Seguimos com a cria\xE7\xE3o de conta no GTM.
\u2022 Entretanto, a conta de acesso ao painel do site (ex: WordPress) n\xE3o tinha permiss\xE3o para instalar plugins ou editar o c\xF3digo.`,"field-IMPEDIMENTO_CLIENTE":`\u2022 Anunciante precisa conseguir acesso de administrador ao painel do site.
\u2022 OU
\u2022 Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.`,"field-MINHA_ACAO":`\u2022 Coloco o caso em 2/6.
\u2022 Assim que o anunciante tiver o acesso ou a instala\xE7\xE3o for feita, abrirei um caso em BAU para dar continuidade.`,"field-SCREENSHOTS":"\u2022 Print do painel do CMS mostrando a falta de permiss\xE3o (opcional)."},"quickfill-ni-awaiting-ecw4":{type:"all","field-REASON_COMMENTS":"Aguardando valida\xE7\xE3o de dados (ECW4 - 7 Dias)","field-TASKS_SOLICITADAS":"\u2022 Implementa\xE7\xE3o de Convers\xF5es Otimizadas (ECW4)","field-CONTEXTO_CALL":`\u2022 Criamos a convers\xE3o no Google Ads.
\u2022 Configuramos o disparo das tags via GTM.
\u2022 Adicionamos a tag de UPD (User Provided Data).
\u2022 Testamos juntos e validamos o bom funcionamento.`,"field-MINHA_ACAO":"\u2022 Coloco o caso em status de Awaiting Validation para acompanhamento de 7 dias.",linkedTask:"ads_enhanced_conversions"},"quickfill-ni-awaiting-ga4":{type:"all","field-REASON_COMMENTS":"Aguardando valida\xE7\xE3o de dados (GA4 Event - 48h)","field-TASKS_SOLICITADAS":"\u2022 Implementa\xE7\xE3o de Eventos GA4","field-CONTEXTO_CALL":`\u2022 Criamos o evento no GA4.
\u2022 Configuramos o disparo das tags via GTM.
\u2022 Testamos juntos e validamos o bom funcionamento.`,"field-MINHA_ACAO":"\u2022 Coloco o caso em status de Awaiting Validation para acompanhamento de 48h.",linkedTask:"ga4_event_tracking"},"quickfill-ni-followup-bau":{type:"bau","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (Follow-up BAU 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas n\xE3o obtive resposta. Envio na sequ\xEAncia o email referente ao dia respectivo.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":`\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`},"quickfill-ni-followup-lm":{type:"lm","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (Follow-up LM 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 enviei e-mail de follow-up (caso LM, sem tentativas de liga\xE7\xE3o), mas n\xE3o obtive resposta.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":"\u2022 E-mail de follow-up enviado (LM) -"},"quickfill-gtm-install":{type:"all","field-REASON_COMMENTS":"Instala\xE7\xE3o do GTM finalizada.","field-TASKS_SOLICITADAS":"\u2022 Instala\xE7\xE3o do GTM","field-PASSOS_EXECUTADOS":`\u2022 Criamos a conta dentro do GTM
\u2022 Instalamos dentro do CMS/Hospedagem.
\u2022 Criamos o Vinculador de Convers\xF5es.`,"field-RESULTADO":"\u2022 Validei a instala\xE7\xE3o.",linkedTask:"gtm_installation"},"quickfill-whatsapp":{type:"all","field-REASON_COMMENTS":"Instala\xE7\xE3o do Ads Conversion tracking para Whatsapp finalizada.","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para WHATSAPP","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM para os bot\xF5es de WhatsApp.
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-form":{type:"all","field-REASON_COMMENTS":"Instala\xE7\xE3o do Ads Conversion tracking para Form finalizada.","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para FORMUL\xC1RIO (padr\xE3o, n\xE3o-otimizada).","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM.
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-ecw4-close":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o do acompanhamento de EC.","field-TASKS_SOLICITADAS":"\u2022 Acompanhamento da convers\xE3o otimizada (ECW4).","field-PASSOS_EXECUTADOS":`\u2022 Ap\xF3s o per\xEDodo de acompanhamento, verifiquei o painel do Ads.
\u2022 A convers\xE3o est\xE1 sendo registrada corretamente.`,"field-RESULTADO":`\u2022 Valido o bom funcionamento da convers\xE3o otimizada.
\u2022 Assim, fecho o caso.`,linkedTask:"ads_enhanced_conversions"},"quickfill-ga4-event-close":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o do Acompanhamento de GA4.","field-TASKS_SOLICITADAS":"\u2022 Acompanhamento de Eventos GA4 ap\xF3s 48h.","field-PASSOS_EXECUTADOS":`\u2022 Ap\xF3s o per\xEDodo de 48h de acompanhamento, verifiquei o painel.
\u2022 O evento est\xE1 sendo registrado corretamente.`,"field-RESULTADO":`\u2022 Valido o bom funcionamento do rastreamento de eventos.
\u2022 Assim, fecho o caso.`,linkedTask:"ga4_event_tracking"},"quickfill-as-no-show":{type:"all","field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o compareceu na meet, por\xE9m respondeu o e-mail pedindo o reagendamento"},"quickfill-as-insufficient-time":{type:"all","field-MOTIVO_REAGENDAMENTO":`\u2022 Precisamos reagendar o caso, j\xE1 que o tempo foi insuficiente para terminar as Tasks
\u2022 Implementamos [descrever o que foi feito]`},"quickfill-as-no-access":{type:"all","field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o tinha os acessos necess\xE1rios para podermos implementar as tasks"},"quickfill-in-nrp-bau":{type:"bau","field-REASON_COMMENTS":"NRP (BAU - 3 tentativas)","field-COMENTARIOS":`\u2022 Duas liga\xE7\xF5es seguidas, e e-mail "Antes dos 10 minutos" e uma terceira e ultima tentativa de liga\xE7\xE3o.
\u2022 N\xE3o houve resposta \xE0s tentativas de liga\xE7\xE3o ou e-mail, por isso o caso ser\xE1 inativado.`,"field-SCREENSHOTS":`\u2022 Tentativa 1 -
\u2022 Tentativa 2 -
\u2022 Tentativa 3 -`,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-no-show-bau":{type:"bau","field-REASON_COMMENTS":"Sem resposta ao 2 Day Rule.","field-ON_CALL":"N/A","field-COMENTARIOS":`\u2022 O caso foi gerado e entrei na chamada no hor\xE1rio agendado.
\u2022 O anunciante n\xE3o compareceu \xE0 reuni\xE3o.
\u2022 Segui o protocolo de espera (BAU): realizei duas tentativas de liga\xE7\xE3o, sem sucesso.
\u2022 Nenhuma das liga\xE7\xF5es foi atendida (ex: Caixa Postal).
\u2022 Caso inativado ap\xF3s 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 Tentativa 1 - 
\u2022 Tentativa 2  - 
\u2022 Tentativa 3 - `,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-manual":{type:"all","field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-ni-attempted-2day":{type:"bau","field-REASON_COMMENTS":"Attempted Contact (In\xEDcio 2 Day Rule)","field-CONTEXTO_CALL":`\u2022 Fiz a primeira tentativa de liga\xE7\xE3o, sem sucesso.
\u2022 Enviei uma message no chat para o AM.
\u2022 Aguardei 5 minutos e fiz a segunda tentativa de liga\xE7\xE3o, novamente sem sucesso.
\u2022 Aguardei mais 5 minutos e agora farei o acompanhamento 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 MSG AM -
\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`},"quickfill-dc-lm-no-access":{type:"all","field-REASON_COMMENTS":"Discard - Falta de acessos (Reagendamento solicitado)","field-COMENTARIOS":`N\xE3o conseguimos implementar nada durante a consultoria, j\xE1 que o adv n\xE3o tinha os acessos.

Irei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`},"quickfill-dc-lm-incomplete":{type:"all","field-REASON_COMMENTS":"Discard - Nada foi implementado durante a consultoria","field-COMENTARIOS":`N\xE3o conseguimos implementar nada durante a consultoria, pois n\xE3o houve tempo o suficiente para terminar a task relacionada.

Irei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`},"quickfill-dc-lm-no-show":{type:"all","field-REASON_COMMENTS":"Discard - Sem contato com o Adv","field-COMENTARIOS":`O adv n\xE3o compareceu na consultoria. Fiz as tentativas de liga\xE7\xE3o, mas n\xE3o obtive retorno.

Irei solicitar descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var po="cw-automation-styles";if(!document.getElementById(po)){let t=document.createElement("style");t.id=po,t.innerHTML=`
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
    `,document.head.appendChild(t)}function uo(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function ct(t){await St();let e=document.getElementById(t),o="";uo(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let a=document.querySelector('material-button[debug-id="dock-item-case-log"]');a&&!a.classList.contains("selected")&&(Ve(a),await ne(1200));let n=document.querySelector("search-filter dropdown-button .button");if(n&&!(n.innerText||"").includes("All")){Ve(n),await ne(600);let h=document.querySelector('material-checkbox[debug-id="check-all-box"]');h&&h.getAttribute("aria-checked")!=="true"&&(Ve(h),await ne(300));let w=document.querySelector('material-button[debug-id="apply-filter"]');w&&(Ve(w),await ne(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await ne(500));let l=Array.from(document.querySelectorAll(".message-header"));for(let f=l.length-1;f>=0;f--){let h=l[f],w=h.querySelector("i.material-icons-extended"),g=w&&w.innerText.trim()==="phone_in_talk",v=h.innerText||"",E=v.includes("Agent joined")||v.includes("outbound-call")||v.includes("Speakeasy");if(g||E){h.getAttribute("aria-expanded")==="true"||(e&&(e.placeholder="Lendo mensagem..."),Ve(h),await ne(1e3));break}}let c=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),p=/Speakeasy.*?(P\d{15,25})/i,m=null;for(let f=c.length-1;f>=0;f--){let h=c[f];if(h.offsetParent===null)continue;let w=(h.innerText||"").match(p);if(w&&w[1]){m=w[1];break}}if(e)if(m){try{await navigator.clipboard.writeText(m)}catch{}e.tagName==="INPUT"||e.tagName==="TEXTAREA"?e.value=m:e.textContent=m,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),$.playSuccess(),V(`ID Localizado: ${m}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else $.playError(),V("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(a){console.error("Erro na automa\xE7\xE3o:",a),V("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),uo(!1)}}function mo(t){t.dataset.bulletEnabled!=="true"&&(t.dataset.bulletEnabled="true",(t.value.trim()===""||t.value.trim()==="\u2022")&&(t.value="\u2022 "),t.addEventListener("keydown",function(e){let o=this.selectionStart,a=this.selectionEnd,n=this.value,i=n.lastIndexOf(`
`,o-1)+1,l=n.substring(i,o);if(e.key==="Enter"){e.preventDefault();let s=l.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(l.trim()==="\u2022"){this.value=n.substring(0,i)+`
`+n.substring(a),this.selectionStart=this.selectionEnd=i+1;return}let c=`
`+s;this.value=n.substring(0,o)+c+n.substring(a),this.selectionStart=this.selectionEnd=o+c.length}else if(e.key==="Tab")e.preventDefault(),e.shiftKey?l.startsWith("  ")&&(this.value=n.substring(0,i)+l.substring(2)+n.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=n.substring(0,i)+"  "+l+n.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(e.key==="Backspace"&&o===a&&o>0){let s=n.substring(0,o);s.endsWith("\u2022 ")?(e.preventDefault(),this.value=s.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2):s.endsWith("  ")&&l.trim().startsWith("\u2022")&&(e.preventDefault(),this.value=s.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2)}}))}function dt(t,e,o){e.innerHTML="";let a=Ie[t];if(!a)return;let n=Ze(a);if(o.activeFields.forEach(s=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(s))return;let c=`field-${s}`,p=document.createElement("label"),m=g=>Ce[o.currentLang]?.[g]||Ce.pt?.[g]||g;p.textContent=m(s.toLowerCase())!==s.toLowerCase()?m(s.toLowerCase()):s.replace(/_/g," ").replace(/\b\w/g,g=>g.toUpperCase())+":",Object.assign(p.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:B.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let f=n.includes(s),h=document.createElement("span");if(h.textContent=p.textContent,f){let g=document.createElement("span");g.textContent=" *",g.style.color=B.error,h.appendChild(g)}if(p.innerHTML="",p.appendChild(h),s==="SPEAKEASY_ID"){let g=document.createElement("button");g.innerHTML="\u2728 Auto Busca",g.style.cssText=`font-size: 11px; font-weight: 700; color: ${B.primary}; background-color: ${B.primaryBg}; border: none; border-radius: ${ue.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${ce};`,g.onmouseenter=()=>g.style.backgroundColor="#d2e3fc",g.onmouseleave=()=>g.style.backgroundColor=B.primaryBg,g.onclick=v=>{v.preventDefault(),ct(c)},p.appendChild(g)}if(!f){let g=document.createElement("button");g.innerHTML="\u2715",g.style.cssText=`font-size: 14px; background: ${B.bgInput}; border: none; color: ${B.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${ce};`,g.onmouseenter=()=>{g.style.background=B.error,g.style.color=B.surface},g.onmouseleave=()=>{g.style.background=B.bgInput,g.style.color=B.textSub},g.onclick=async v=>{v.preventDefault(),await ve(`Tem certeza que deseja remover o campo "${h.textContent.replace(":","")}"?`)&&(o.removeField(s),dt(t,e,o))},p.appendChild(g)}let w;We.includes(s)?(w=document.createElement("textarea"),w.classList.add("bullet-textarea","cw-textarea"),w.placeholder="Utilize marcadores para detalhar...",mo(w)):rt.includes(s)?(w=document.createElement("textarea"),w.classList.add("cw-textarea"),w.placeholder="Descreva as considera\xE7\xF5es..."):(w=document.createElement("input"),w.type="text",w.classList.add("cw-input")),w.id=c,w.value=o.formData[c]||"",w.addEventListener("input",g=>o.updateField(c,g.target.value)),e.appendChild(p),e.appendChild(w)}),o.activeFields.includes("CONSENTIU_GRAVACAO")){let s=m=>Ce[o.currentLang]?.[m]||Ce.pt?.[m]||m,c=document.createElement("label");c.textContent=s("consentiu_gravacao"),Object.assign(c.style,{display:"block",fontSize:"13px",fontWeight:"700",color:B.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let p=document.createElement("select");p.className="cw-select",p.innerHTML=`
            <option value="false">${s("nao")}</option>
            <option value="true">${s("sim")}</option>
        `,p.value=o.consent?"true":"false",p.onchange=()=>o.setConsent(p.value==="true"),e.appendChild(c),e.appendChild(p)}let i=st(a),l=(a.templateFields||[]).filter(s=>i.includes(s)&&!o.activeFields.includes(s));if(l.length>0){let s=p=>Ce[o.currentLang]?.[p]||Ce.pt?.[p]||p,c=document.createElement("div");Object.assign(c.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"24px"}),l.forEach(p=>{let m=s(p.toLowerCase())!==p.toLowerCase()?s(p.toLowerCase()):p.replace(/_/g," ").replace(/\b\w/g,h=>h.toUpperCase())+":",f=document.createElement("button");f.type="button",f.textContent=`+ ${m.replace(/:$/,"")}`,f.style.cssText=`font-size: 12px; font-weight: 600; color: ${B.primary}; background-color: ${B.primaryBg}; border: none; border-radius: ${ue.pill}; padding: 6px 14px; cursor: pointer; transition: all 0.2s ${ce};`,f.onmouseenter=()=>f.style.backgroundColor="#d2e3fc",f.onmouseleave=()=>f.style.backgroundColor=B.primaryBg,f.onclick=h=>{h.preventDefault(),o.addFieldAt(p,o.activeFields.length),dt(t,e,o)},c.appendChild(f)}),e.appendChild(c)}}function Lt(t,e,o,a=null){let n=t.currentSubStatus;if(!n)return null;let i=Ie[n],l=Ce[t.currentLang]||Ce.pt,s=m=>l[m]||Ce.pt?.[m]||m,c='style="margin-bottom: 12px; padding-left: 30px;"',p="";if(t.activeFields.forEach(m=>{let f=s(m.toLowerCase()),h="N/A";if(m==="label_substatus")f=s("label_substatus"),h=i.name;else if(m==="TAGS_IMPLEMENTED"){f=s("tags_implemented");let w=[];e.getCheckedElements().forEach(v=>{let E=v.value,N=Le[E],F=v.count||1,q=E==="ads_conversion_tracking"||E==="ads_enhanced_conversions";t.tagSupportUsed&&q&&!t.forcedScreenshots.has(E)?w.push(`${N.name} - ${s("ts_output_disclaimer")}`):w.push(F>1?`${N.name} (x${F})`:N.name)}),h=w.join(", ")||"N/A"}else if(m==="SCREENSHOTS_LIST"){f=s("screenshots_list");let w="",g=e.screenshotsElement;g&&Array.from(g.querySelectorAll('input[id^="name-"]')).forEach(E=>{let N=E.value,F=E.closest(".cw-screen-card");if(F){let q=F.querySelectorAll('input[id^="screen-"]'),z=!1,W="";q.forEach(J=>{let I=J.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",R=J.value.trim();R&&(W+=`<li>${I} - ${R}</li>`,z=!0)}),z&&(w+=`<div style="margin-bottom: 8px;"><b>${N}</b><ul ${c}>${W}</ul></div>`)}}),h=w||"N/A"}else if(m==="CASO_PORTUGAL")f=s("caso_portugal"),h=s("sim");else if(m==="CONSENTIU_GRAVACAO")f=s("consentiu_gravacao"),h=t.consent?s("sim"):s("nao");else{let w=`field-${m}`,g=t.formData[w],v="";if(i.fieldPrefixes&&i.fieldPrefixes[m]&&(v=i.fieldPrefixes[m]+" "),g&&g.trim()!==""&&g.trim()!=="\u2022"){let E=g.trim();if(We.includes(m)){let N=E.split(`
`).map(F=>F.trim()).filter(F=>F!==""&&F!=="\u2022").map(F=>F.startsWith("\u2022 ")?F.substring(2):F).map(F=>`<li>${F}</li>`).join("");h=N?`${v}<ul ${c}>${N}</ul>`:"N/A"}else rt.includes(m)?h=v+E.split(`
`).filter(N=>N.trim()!=="").map(N=>`<p style="margin: 0 0 8px 0;">${N}</p>`).join(""):h=v+E}else v&&(h=v.trim())}p+=`<b>${f}</b><br>${h}<br><br>`}),a){let m="";a.l1&&(m+=`<li>${s("ligacao_1")}: ${a.l1}</li>`),a.l2&&(m+=`<li>${s("ligacao_2")}: ${a.l2}</li>`),a.msg&&(m+=`<li>${s("mensagem_am")}: ${a.msg}</li>`),m&&(p+=`<b>${s("evidencias_contato")}</b><br><ul ${c}>${m}</ul><br>`)}if(i.customFooter&&(p+=`${i.customFooter}<br><br>`),o?.getOutput){let m=o.getOutput();m&&(p+=`${m}<br><br>`)}return p+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",p.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}function go(t){let e=document.createElement("div");e.className="cw-step-scenarios";let o="Passe o mouse sobre um cen\xE1rio para visualizar o texto...",a=document.createElement("div");Object.assign(a.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let i=document.createElement("span");i.style.transition="opacity 0.2s ease, transform 0.2s ease",i.textContent=o,n.appendChild(i);let l=new Set,s=null;return e.render=(c,p)=>{l.clear();let m=Object.entries(lt).filter(([f,h])=>{let w=!h.type||h.type==="all"||h.type===p,g=!1;return c.startsWith("NI_")?g=f.includes("-ni-")||f.includes("attempted"):c.startsWith("SO_")?g=f.includes("gtm")||f.includes("whatsapp")||f.includes("form")||f.includes("ecw4")||f.includes("ga4")||f.includes("-so-"):c.startsWith("AS_")?g=f.includes("-as-"):c.startsWith("IN_")?g=f.includes("-in-"):c.startsWith("DC_")&&(g=f.includes("-dc-")),w&&g});a.innerHTML="",m.forEach(([f,h])=>{let w=document.createElement("div"),g=f.replace("quickfill-","").replace(/-/g," ");w.textContent=g,w.dataset.id=f,Object.assign(w.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let v=h["field-REASON_COMMENTS"]||h["field-CONTEXTO_CALL"]||f;w.onmouseenter=()=>{s&&clearTimeout(s),l.has(f)||(w.style.background="#f1f3f4"),i.style.opacity="0",i.style.transform="translateY(5px)",s=setTimeout(()=>{i.textContent=v.substring(0,120)+(v.length>120?"...":""),i.style.opacity="1",i.style.transform="translateY(0)"},50)},w.onmouseleave=()=>{s&&clearTimeout(s),l.has(f)||(w.style.background="#ffffff"),s=setTimeout(()=>{l.size===0&&(i.style.opacity="0",setTimeout(()=>{i.textContent=o,i.style.opacity="1"},50))},100)},w.onclick=()=>{$.playClick();let E=!l.has(f);E?(l.add(f),w.style.background="#e8f0fe",w.style.borderColor="#1a73e8",w.style.color="#1967d2"):(l.delete(f),w.style.background="#ffffff",w.style.borderColor="#dadce0",w.style.color="#3c4043"),t(f,E)},a.appendChild(w)}),m.length===0?e.style.display="none":e.style.display="block"},e.appendChild(a),e.appendChild(n),e}function pa(t){return t==="ads_conversion_tracking"||t==="ads_enhanced_conversions"}function It(t,e){return e.tagSupportUsed&&pa(t)&&!e.forcedScreenshots.has(t)}var re={bg:B.bgInput,white:B.surface,border:B.border,textMain:B.text,textSub:B.textSub,blue:B.blue,blueLight:B.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:B.blue,bg:B.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:B.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:B.primary,bg:B.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:B.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},He={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function bo(t,e,o){let a={};o&&o.subscribe(()=>{W(),J()});function n(L){let I=L.toLowerCase();return I.includes("ads")||I.includes("conversion")||I.includes("remarketing")?re.brands.ads:I.includes("ga4")||I.includes("analytics")?re.brands.ga4:I.includes("gtm")||I.includes("tag manager")||I.includes("container")?re.brands.gtm:I.includes("merchant")||I.includes("shopping")||I.includes("feed")?re.brands.gmc:re.brands.default}let i=Object.entries(Le).filter(([L,I])=>I.popular),l={};Object.entries(Le).forEach(([L,I])=>{if(I.popular)return;let R=n(I.name);l[R.label]||(l[R.label]={brand:R,tasks:[]}),l[R.label].tasks.push({key:L,...I})});let s="cw-zen-tasks";if(!document.getElementById(s)){let L=document.createElement("style");L.id=s,L.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${re.font}; background: ${re.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${re.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${re.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${re.white}; 
                border: 1.5px solid #f1f3f4;
                border-radius: 20px;
                padding: 16px;
                cursor: pointer; 
                position: relative; 
                height: 90px;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                transition: all 0.4s cubic-bezier(0.25, 1, 0.3, 1);
                box-shadow: 0 2px 6px rgba(0,0,0,0.02);
                overflow: hidden;
            }
            
            /* Corre\xE7\xE3o do Grid \xCDmpar */
            .cw-hero-card:last-child:nth-child(odd) { grid-column: span 2; }

            /* Intera\xE7\xE3o */
            .cw-hero-card:hover { border-color: var(--hero-color); box-shadow: 0 8px 20px rgba(0,0,0,0.06); transform: translateY(-3px); }
            .cw-hero-card:active { transform: scale(0.96) translateY(0); }

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
                font-size: 12px; font-weight: 500; color: ${re.textMain}; line-height: 1.2; 
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
                color: ${re.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn-hero:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${re.border}; border-radius: 10px; background: ${re.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${re.blue}; box-shadow: 0 0 0 3px ${re.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${re.border}; border-radius: 10px; background: ${re.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${re.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${re.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${re.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${re.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${re.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${re.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${re.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS (Lista: quadrado) */
            .cw-step-btn-list {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${re.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn-list:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${re.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${re.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                visibility: hidden;
                box-shadow: ${re.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            /* .cw-zen-container usa overflow:visible (pros cards do hero n\xE3o
               cortarem sombra/hover), ent\xE3o sem visibility a barra "escondida"
               via transform continua sendo pintada logo abaixo do card,
               encostando/sobrepondo o que vem depois no layout. */
            .cw-status-bar.visible { transform: translateY(0); visibility: visible; }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${re.textMain}; }
            
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
                transition: all 0.4s cubic-bezier(0.25, 1, 0.3, 1);
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
                font-family: ${re.font}; font-size: 15px; font-weight: 600; color: ${re.textMain};
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
                border-color: ${re.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${re.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${re.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${re.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 11px; font-weight: 700; color: ${re.textSub};
                margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.8px;
            }

            .cw-input-field {
                width: 100%; box-sizing: border-box;
                padding: 12px 14px;
                border-radius: 12px;
                border: 1.5px solid #f1f3f4;
                background: #f8f9fa;
                font-size: 14px; color: #374151;
                transition: all 0.25s cubic-bezier(0.25, 1, 0.3, 1); outline: none;
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
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: none;
            }
            .cw-input-field.filled + .cw-input-check { opacity: 1; transform: scale(1); }
        `,document.head.appendChild(L)}let c=document.createElement("div");c.className="cw-zen-container";let p=document.createElement("div");Object.assign(p.style,{display:"none"});let m=document.createElement("div");m.className="cw-screens-container",p.appendChild(m),c.innerHTML=`
        <div class="cw-zen-content">
            <div class="cw-hero-section">
                <div class="cw-section-subtitle js-hero-title" style="font-size:11px; font-weight:700; color:#6B7280; text-transform:uppercase; letter-spacing:0.8px;">${e("acesso_rapido")}</div>
                <div class="cw-hero-grid"></div>
                <div class="cw-helper-text">Atalhos para as implementa\xE7\xF5es mais frequentes.<br>Use a busca abaixo para o cat\xE1logo completo.</div>
            </div>

            <div class="cw-list-section">
                <div class="cw-search-wrapper">
                    <input class="cw-search-input" placeholder="${e("buscar_catalogo")}">
                </div>
                <div class="cw-acc-container"></div>
                <div class="cw-results-container" style="display:none"></div>
            </div>
        </div>

        <div class="cw-status-bar">
            <div class="cw-status-text">0 a\xE7\xF5es definidas</div>
            <div class="cw-footer-icons"></div>
        </div>
    `;let f=c.querySelector(".cw-hero-grid"),h=c.querySelector(".cw-acc-container"),w=c.querySelector(".cw-results-container"),g=c.querySelector(".cw-search-input"),v=c.querySelector(".cw-status-bar"),E=c.querySelector(".cw-status-text"),N=c.querySelector(".cw-footer-icons");function F(L,I){return R=>{if(R.target.closest(".cw-step-btn-hero, .cw-step-btn-list"))return;let H=a[L]?a[L].count:0;z(L,H>0?-H:1,I)}}i.forEach(([L,I])=>{let R=n(I.name),H=document.createElement("div");H.className="cw-hero-card",H.id=`hero-${L}`,H.style.setProperty("--hero-color",R.color),H.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${He[R.icon]}</div>
                <div class="cw-hero-label">${I.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn-hero minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-hero plus">+</div>
            </div>
        `,H.onclick=F(L,I),H.querySelector(".minus").onclick=()=>z(L,-1,I),H.querySelector(".plus").onclick=()=>z(L,1,I),H.dataset.color=R.color,f.appendChild(H)});function q(L,I){let R=n(I.name),H=document.createElement("div");return H.className="cw-task-item",H.dataset.id=L,H.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${R.bg}; color:${R.color}">
                    ${He[R.icon]||He.default}
                </div>
                <div class="cw-task-label">${I.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn-list minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-list plus">+</div>
            </div>
        `,H.onclick=F(L,I),H.querySelector(".minus").onclick=()=>z(L,-1,I),H.querySelector(".plus").onclick=()=>z(L,1,I),H}Object.entries(l).forEach(([L,I])=>{let R=document.createElement("div");R.className="cw-acc-group";let H=document.createElement("div");H.className="cw-acc-header",H.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${I.brand.color}"></div>
                ${L}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,H.onclick=()=>{h.querySelectorAll(".cw-acc-group.open").forEach(D=>{D!==R&&D.classList.remove("open")}),R.classList.toggle("open")};let _=document.createElement("div");_.className="cw-acc-body",I.tasks.forEach(D=>{let j=q(D.key,D);_.appendChild(j)}),R.appendChild(H),R.appendChild(_),h.appendChild(R)});function z(L,I,R){a[L]||(a[L]={count:0,data:R,brand:n(R.name)}),a[L].count+=I,a[L].count<=0&&delete a[L],W(),J(),t&&t()}function W(){i.forEach(([_])=>{let D=f.querySelector(`#hero-${_}`);if(!D)return;let j=a[_];j?(D.classList.add("active"),D.querySelector(".cw-step-val").textContent=j.count,D.querySelector(".cw-step-val").style.color=D.dataset.color,D.classList.toggle("ts-success",It(_,o))):(D.classList.remove("active"),D.classList.remove("ts-success"))}),c.querySelectorAll(".cw-task-item").forEach(_=>{let D=_.dataset.id,j=a[D];j?(_.classList.add("selected"),_.querySelector(".cw-step-val").textContent=j.count,_.classList.toggle("ts-success",It(D,o))):(_.classList.remove("selected"),_.classList.remove("ts-success"))});let I=Object.keys(a),R=0,H=[];if(I.forEach(_=>{let D=a[_];R+=D.count;for(let j=0;j<D.count;j++)H.length<6&&H.push(D.brand)}),R>0){v.classList.add("visible");let _=R>1?"A\xE7\xF5es":"A\xE7\xE3o",D=R>1?"definidas":"definida";E.textContent=`${R} ${_} ${D}`,N.innerHTML="",H.forEach(j=>{let te=document.createElement("div");te.className="cw-mini-icon-status",te.innerHTML=He[j.icon]||He.default;let X=te.querySelector("svg");X&&(X.style.width="14px",X.style.height="14px"),N.appendChild(te)})}else v.classList.remove("visible"),E.textContent="",N.innerHTML=""}g.addEventListener("input",L=>{let I=L.target.value.toLowerCase();if(I.length>0){h.style.display="none",w.style.display="block",w.innerHTML="";let R=!1;Object.entries(Le).forEach(([H,_])=>{if(_.name.toLowerCase().includes(I)){R=!0;let D=q(H,_);a[H]&&(D.classList.add("selected"),D.querySelector(".cw-step-val").textContent=a[H].count),w.appendChild(D)}}),R||(w.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else h.style.display="block",w.style.display="none"});function J(){let L={};m.querySelectorAll(".cw-input-field").forEach(_=>{L[_.id]=_.value}),m.innerHTML="";let I=Object.keys(a),R=!1;if(I.length===0){m.innerHTML=`<div class="cw-empty-state">${e("selecione_tarefas")}</div>`,p.style.display="none";return}let H=document.createElement("div");H.className="cw-info-banner",H.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,m.appendChild(H),I.forEach(_=>{let D=a[_].data,j=a[_].count,te=a[_].brand,X=It(_,o),Z=o.screenshotMode||"implementation",ee=D.screenshots?.[Z]||[];if(ee.length>0||X){R=!0;for(let Q=1;Q<=j;Q++){let ae=document.createElement("div");ae.className="cw-screen-card",X&&ae.classList.add("ts-success"),ae.style.setProperty("--brand-color",te.color),ae.style.setProperty("--brand-bg",te.bg),ae.style.setProperty("--brand-shadow",te.color+"40");let K=document.createElement("div");K.className="cw-card-header";let oe=document.createElement("div");oe.className="cw-card-icon",oe.innerHTML=He[te.icon]||He.default;let k=document.createElement("div");k.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let P=document.createElement("input");P.className="cw-card-title-input",P.id=`name-${_}-${Q}`,P.value=`${D.name}${j>1?" #"+Q:""}`,P.title="Clique para renomear esta task";let r=document.createElement("span");if(r.className="cw-edit-hint",r.innerHTML="\u270E Renomear",k.appendChild(P),k.appendChild(r),K.appendChild(oe),K.appendChild(k),ae.appendChild(K),X){let u=document.createElement("div");u.className="cw-ts-disclaimer-box",u.innerHTML=`
                <span>${e("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${e("incluir_mesmo_assim")}</button>
            `,u.querySelector("button").onclick=()=>{o.toggleForcedScreenshot(_,!0)},ae.appendChild(u)}else ee.forEach((u,x)=>{let b=document.createElement("div");b.className="cw-input-group";let y=document.createElement("label");y.className="cw-input-label",y.textContent=u;let S=document.createElement("input");S.className="cw-input-field",S.id=`screen-${_}-${Q}-${x}`,S.placeholder="Cole o link aqui...",S.setAttribute("autocomplete","off"),L[S.id]&&(S.value=L[S.id],S.value.trim().length>5&&S.classList.add("filled")),S.addEventListener("input",()=>{S.value.trim().length>5?S.classList.add("filled"):S.classList.remove("filled")});let C=document.createElement("div");C.className="cw-input-check",C.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',b.appendChild(y),b.appendChild(S),b.appendChild(C),ae.appendChild(b)});m.appendChild(ae)}}}),p.style.display=R?"block":"none"}return{selectionElement:c,screenshotsElement:p,updateSubStatus:()=>J(),getCheckedElements:()=>Object.keys(a).map(L=>({value:L,count:a[L].count})),setTaskCount:(L,I)=>{a[L]&&delete a[L],I>0&&Le[L]&&z(L,I,Le[L])},toggleTask:(L,I=!0)=>{let R=a[L];I&&!R?z(L,1,Le[L]):!I&&R&&z(L,-R.count,Le[L])},setLanguage:L=>{e=L;let I=c.querySelector(".js-hero-title");I&&(I.textContent=e("acesso_rapido"));let R=c.querySelector(".cw-search-input");R&&(R.placeholder=e("buscar_catalogo")),J()},reset:()=>{for(let L in a)delete a[L];g.value="",h.style.display="block",w.style.display="none",W(),J()}}}var ua={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},ma={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},ga={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},ba={display:"flex",gap:"20px",marginBottom:"12px"};function fo(t){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,ua);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=t("utilizou_tag_support"),Object.assign(o.style,At,{marginTop:"0"});let a=document.createElement("div");Object.assign(a.style,ba);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,Ft);let i=document.createElement("label");i.textContent="Sim";let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center"}),l.appendChild(n),l.appendChild(i);let s=document.createElement("input");s.type="radio",s.name="ts_usage_mod",s.value="N\xE3o",s.checked=!0,Object.assign(s.style,Ft);let c=document.createElement("label");c.textContent="N\xE3o";let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center"}),p.appendChild(s),p.appendChild(c),a.appendChild(l),a.appendChild(p);let m=document.createElement("div");m.style.display="block";let f=document.createElement("label");f.className="js-ts-reason-label",f.textContent=t("motivo_ts"),Object.assign(f.style,At,{fontSize:"12px"});let h=document.createElement("input");h.type="text",Object.assign(h.style,ga);let w=document.createElement("div");w.className="js-ts-warning",w.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(w.style,ma),m.appendChild(f),m.appendChild(h),m.appendChild(w),e.appendChild(o),e.appendChild(a),e.appendChild(m),n.onchange=()=>{m.style.display="none",G.setTagSupportUsed(!0)},s.onchange=()=>{m.style.display="block",G.setTagSupportUsed(!1)};function g(F,q){if(e.style.display="none",!F||!q||q.length===0)return;q.some(W=>W==="ads_conversion_tracking"||W==="ads_enhanced_conversions")?e.style.display="block":(N(),G.setTagSupportUsed(!1))}function v(){if(e.style.display==="none")return"";let F=`<br><b>Utilizou Tag Support?</b> ${n.checked?"\u2705 Sim":"\u274C N\xE3o"}`;return s.checked&&h.value.trim()!==""&&(F+=`<br><b>Motivo:</b> ${h.value}`),F+="<br>",F}function E(F){t=F,o.textContent=t("utilizou_tag_support"),f.textContent=t("motivo_ts"),w.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`}function N(){e.style.display="none",s.checked=!0,n.checked=!1,m.style.display="block",h.value=""}return{element:e,updateVisibility:g,getOutput:v,setLanguage:E,reset:N}}var qt="cw_notes_parking_lot",pt="cw_notes_emergency_save";var we={getAll:()=>{try{return JSON.parse(localStorage.getItem(qt)||"[]")}catch{return[]}},save:t=>{let e=we.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...t};return e.unshift(o),e.length>5&&e.pop(),localStorage.setItem(qt,JSON.stringify(e)),o},delete:t=>{let e=we.getAll();return e=e.filter(o=>o.id!==t),localStorage.setItem(qt,JSON.stringify(e)),e},getCount:()=>we.getAll().length,saveEmergency:t=>{let e={timestamp:Date.now(),data:t};localStorage.setItem(pt,JSON.stringify(e))},getEmergency:()=>{try{let t=localStorage.getItem(pt);if(!t)return null;let e=JSON.parse(t);return Date.now()-e.timestamp>432e5?(localStorage.removeItem(pt),null):!e.data||!e.data.subStatus?null:e.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(pt)}};var ut=["lucaste","ricardogi"];var le={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"};function mt(t){let e=document.getElementById("cw-btn-notes");if(!e)return;let o=e.querySelector(".cw-dot-dirty");t?o||(o=document.createElement("div"),o.className="cw-dot-dirty",e.appendChild(o)):o&&o.remove()}function ho(t){let e="cw-command-center-style";if(!document.getElementById(e)){let v=document.createElement("style");v.id=e,v.innerHTML=`
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

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
                
                background: ${le.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${le.glassBorder}; border-radius: 50px;
                box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 2147483647;
                
                opacity: 0; 
                width: 56px;
                
                
                overflow: visible;

                /* ABRIR: A p\xEDlula expande PRIMEIRO */
                transition: 
                    width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    padding 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.2s ease,
                    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill { transition: opacity 0.2s ease !important; transform: none !important; }
            }

            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            /* --- ESTADO COLAPSADO (FECHANDO) --- */
            .cw-pill.collapsed {
                width: 50px !important; 
                max-height: 50px !important;
                padding: 0 !important;
                gap: 0 !important;
                border-radius: 50% !important;
                cursor: pointer;
                
                overflow: hidden !important; 

                /* FECHAR: A p\xEDlula colapsa DEPOIS dos \xEDcones (delay 0.15s) */
                transition: 
                    width 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.15s,
                    max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.15s,
                    padding 0.3s ease 0.15s,
                    border-radius 0.3s ease 0.15s,
                    opacity 0.2s ease 0s,
                    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.15s !important;
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
            .cw-main-logo svg { fill: #fff; width: 24px; height: 24px; transition: fill 0.3s; }
            
            .cw-pill:not(.collapsed) .cw-main-logo {
                transform: rotate(360deg) scale(0);
                opacity: 0;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .cw-pill.collapsed .cw-main-logo { 
                opacity: 1; 
                transform: rotate(0) scale(1);
                /* Aparece depois que a p\xEDlula colapsou */
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
            }
            .cw-pill.collapsed:hover .cw-main-logo {
                background-image: linear-gradient(135deg, #4285F4 0%, #EA4335 33%, #FBBC05 66%, #34A853 100%);
                -webkit-mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/%3E%3C/svg%3E") center/24px no-repeat;
                mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/%3E%3C/svg%3E") center/24px no-repeat;
                transform: scale(1.15) rotate(0deg);
                transition-delay: 0s;
            }
            .cw-pill.collapsed:hover .cw-main-logo svg { fill: transparent; }

            /* --- CONTE\xDADO INTERNO --- */
            .cw-pill > *:not(.cw-main-logo) {
                opacity: 1; transform: scale(1) translateY(0); visibility: visible;
                /* Aparece depois que a p\xEDlula expandiu (delay 0.15s para ser produtivo) */
                transition:
                    opacity 0.2s ease 0.15s,
                    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0.15s,
                    visibility 0s linear 0.15s,
                    filter 0.15s ease 0.15s;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill > *:not(.cw-main-logo) { transition: opacity 0.2s ease 0.1s !important; transform: none !important; }
            }

            .cw-pill.collapsed > *:not(.cw-main-logo) {
                opacity: 0; pointer-events: none; visibility: hidden;
                transform: scale(0.5); filter: blur(8px);
                /* Desaparece imediatamente */
                transition:
                    opacity 0.15s ease 0s,
                    transform 0.15s ease 0s,
                    filter 0.15s ease 0s,
                    visibility 0s linear 0.15s;
            }

            /* --- CASCATAS DE ENTRADA --- */
            .cw-pill:not(.collapsed) > *:nth-child(2) { transition-delay: 0.15s; } /* Grip */
            .cw-pill:not(.collapsed) > *:nth-child(3) { transition-delay: 0.18s; } /* Notes */
            .cw-pill:not(.collapsed) > *:nth-child(4) { transition-delay: 0.21s; } /* Email */
            .cw-pill:not(.collapsed) > *:nth-child(5) { transition-delay: 0.24s; } /* Script */
            .cw-pill:not(.collapsed) > *:nth-child(6) { transition-delay: 0.27s; } /* Links */
            .cw-pill:not(.collapsed) > *:nth-child(7) { transition-delay: 0.30s; } /* Library */
            .cw-pill:not(.collapsed) > *:nth-child(8) { transition-delay: 0.33s; } /* Timezone */
            .cw-pill:not(.collapsed) > *:nth-child(9) { transition-delay: 0.36s; } /* Configs */
            .cw-pill:not(.collapsed) > *:nth-child(10) { transition-delay: 0.39s; } /* Sep */
            .cw-pill:not(.collapsed) > *:nth-child(11) { transition-delay: 0.42s; } /* Broadcast */

            /* --- ESTILOS DOS BOT\xD5ES --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${le.iconIdle};
                flex-shrink: 0;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn { transition: background 0.2s ease, color 0.2s ease !important; }
            }
            .cw-btn:hover {
                background: ${le.glassHighlight};
                color: ${le.iconActive};
                transform: scale(1.18) translateY(-2px) !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn:hover { transform: none !important; }
            }

            .cw-btn.notes.active { color: ${le.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${le.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${le.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${le.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${le.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${le.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${le.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${le.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${le.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${le.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${le.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${le.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${le.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${le.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${le.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${le.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${le.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${le.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            @media (prefers-reduced-motion: reduce) {
                .cw-grip:hover .cw-grip-bar { transform: none !important; }
            }
            .cw-pill.dragging .cw-grip-bar { background-color: ${le.blue}; width: 16px; opacity: 1; }

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
               PROCESSING CENTER
               ============================================================ */
            .cw-pill.processing-center {
                top: 50% !important; left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 340px !important; 
                height: auto !important; 
                min-height: 160px !important; 
                border-radius: 24px !important; 
                background: #202124 !important; 
                padding: 32px 24px !important; 
                box-shadow: 0 24px 64px rgba(0,0,0,0.6) !important; 
                display: flex !important; flex-direction: column !important; 
                justify-content: center !important; align-items: center !important;
                gap: 0 !important;
                z-index: 2147483647 !important;
            }
            .cw-pill.processing-center.collapsed { background: #202124 !important; overflow: visible !important; }
            .cw-pill.processing-center .cw-main-logo { display: none !important; }
            .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }
            
            .cw-center-stage { 
                display: flex; flex-direction: column; align-items: center; 
                gap: 20px;
                width: 100%; opacity: 0; 
                animation: fadeIn 0.3s ease forwards 0.1s;
                position: relative; 
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-center-stage { animation: fadeIn 0.3s ease forwards; }
            }
            
            .cw-center-dots { display: flex; gap: 8px; margin-bottom: 4px; }
            .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
            .cw-center-dots span:nth-child(1) { background-color: ${le.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${le.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${le.green}; }
            
            .cw-center-text { 
                font-family: 'Google Sans', Roboto, sans-serif;
                font-size: 15px;
                color: #E8EAED;
                text-align: center; 
                max-width: 100%; 
                font-weight: 500; 
                line-height: 1.5; 
                letter-spacing: 0.2px;
                opacity: 0; 
                transform: translateY(10px); 
                animation: textSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                animation-delay: 0.1s;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-center-text { animation: fadeIn 0.3s ease forwards; transform: none !important; }
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
            
            .cw-center-success { display: none; color: ${le.green}; margin-bottom: 10px; }
            .cw-center-success svg { width: 48px; height: 48px; }
            .cw-center-success.show { display: block; animation: popIn 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            @media (prefers-reduced-motion: reduce) {
                .cw-center-success.show { animation: fadeIn 0.3s ease forwards; }
            }
            
            .cw-abort-btn { 
                position: relative; 
                bottom: auto; margin-top: 8px; 
                font-size: 12px; color: #9AA0A6; 
                cursor: pointer; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700; 
                padding: 8px 16px; border-radius: 20px; 
                background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                transition: all 0.2s ease; user-select: none; 
                display: flex; align-items: center; gap: 6px;
            }
            .cw-abort-btn:hover { 
                color: #F28B82; background: rgba(242, 139, 130, 0.1); border-color: rgba(242, 139, 130, 0.3);
                transform: translateY(-1px);
            }
            .cw-abort-btn:active { transform: scale(0.95); }

            @keyframes fadeIn { to { opacity: 1; } }
            @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes googleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
            @keyframes textSlideUp { to { opacity: 1; transform: translateY(0); } }

            @keyframes cw-system-ready {
                0% { transform: scale(1); box-shadow: 0 12px 32px rgba(0,0,0,0.25); }
                50% { transform: scale(1.02); box-shadow: 0 0 20px ${le.blue}; }
                100% { transform: scale(1); box-shadow: 0 12px 32px rgba(0,0,0,0.25); }
            }
            .cw-pill.system-ready {
                animation: cw-system-ready 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.system-ready { animation: fadeIn 0.3s ease; }
            }
        `,document.head.appendChild(v)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>'},a=document.createElement("div");a.id="cw-floating-trigger",a.className="cw-pill side-right collapsed",a.innerHTML=`
        <div id="cw-command-center" style="display:none;"></div>
        <div class="cw-main-logo">${o.main}</div>
        <div id="cw-admin-tag" class="cw-admin-badge">Admin</div>

        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${o.notes}</button>
        <button class="cw-btn bauform" id="cw-btn-bauform" data-label="BAU Form">${o.bauform}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Email Assistant">${o.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${o.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${o.links}</button>
        <button class="cw-btn library" id="cw-btn-library" data-label="My Library">${o.library}</button>
        <button class="cw-btn timezone" id="cw-btn-timezone" data-label="Time Zones">${o.timezone}</button>
        <button class="cw-btn configs" id="cw-btn-configs" data-label="Configura\xE7\xF5es">${o.configs}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${o.broadcast}</button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${o.check}</div>
        </div>
    `;let n=document.createElement("div");n.className="cw-focus-backdrop",document.body.appendChild(n),document.body.appendChild(a);let i=(v,E)=>{$.playClick(),a.querySelector(`.${v}`).classList.toggle("active"),E()};if(a.querySelector(".notes").onclick=v=>{v.stopPropagation(),i("notes",t.toggleNotes)},a.querySelector(".bauform").onclick=v=>{v.stopPropagation(),i("bauform",t.toggleBAUForm)},a.querySelector(".email").onclick=v=>{v.stopPropagation(),i("email",t.toggleEmail)},a.querySelector(".script").onclick=v=>{v.stopPropagation(),i("script",t.toggleScript)},a.querySelector(".links").onclick=v=>{v.stopPropagation(),i("links",t.toggleLinks)},a.querySelector(".library").onclick=v=>{v.stopPropagation(),i("library",t.toggleLibrary)},a.querySelector(".timezone").onclick=v=>{v.stopPropagation(),i("timezone",t.toggleTimezone)},a.querySelector(".configs").onclick=v=>{v.stopPropagation(),i("configs",t.toggleConfigs)},a.querySelector(".broadcast").onclick=v=>{v.stopPropagation(),i("broadcast",()=>{let E=v.currentTarget.querySelector(".cw-badge");E&&E.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},a.querySelectorAll(".cw-btn").forEach(v=>{v.addEventListener("mouseenter",()=>$.playHover())}),t.broadcastControl&&t.broadcastControl.hasUnread){let v=document.createElement("div");v.className="cw-badge",a.querySelector(".broadcast").appendChild(v)}let l=null;a.onmouseleave=()=>{a.querySelector(".cw-btn.active")||a.classList.contains("processing-center")||(l=setTimeout(()=>{a.classList.add("collapsed")},3e3))},a.onmouseenter=()=>{l&&clearTimeout(l)},(async function(){let E=()=>{let F=fe();if(F){let q=F.split("@")[0].toLowerCase();if(ut.includes(q)){let z=a.querySelector("#cw-admin-tag");z&&z.classList.add("visible")}}else setTimeout(E,2e3)};E(),await ne(2800),a.classList.add("docked"),await ne(300);let N=a.querySelectorAll(".cw-btn");a.querySelectorAll(".cw-sep").forEach(F=>F.classList.add("visible"));for(let F=0;F<N.length;F++)N[F].classList.add("popped"),await ne(40);await ne(100),a.classList.add("system-check"),await ne(100),a.classList.add("system-ready"),setTimeout(()=>a.classList.remove("system-ready"),400)})();let s=!1,c,p,m,f,h=3;a.onmousedown=v=>{if(v.target.closest("button"))return;v.preventDefault(),c=v.clientX,p=v.clientY;let E=a.getBoundingClientRect();m=E.left,f=E.top,document.addEventListener("mousemove",w),document.addEventListener("mouseup",g)};function w(v){let E=v.clientX-c,N=v.clientY-p;!s&&Math.sqrt(E*E+N*N)>h&&(s=!0,a.classList.add("dragging"),a.style.transition="none",l&&clearTimeout(l)),s&&(a.style.left=`${m+E}px`,a.style.top=`${f+N}px`,a.style.right="auto",a.style.bottom="auto",a.style.transform="none")}function g(v){if(document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",g),s){s=!1,a.classList.remove("dragging");let E=window.innerWidth,N=window.innerHeight,F=a.getBoundingClientRect(),q=F.left+F.width/2,z;q<E/2?(z=24,a.classList.remove("side-right"),a.classList.add("side-left")):(z=E-F.width-24,a.classList.remove("side-left"),a.classList.add("side-right"));let W=Be(F.top,24,N-F.height-24);setTimeout(()=>{a.style.setProperty("transition","left 0.3s cubic-bezier(0.4, 0, 0.2, 1), top 0.3s cubic-bezier(0.4, 0, 0.2, 1)","important"),a.style.left=`${z}px`,a.style.top=`${W}px`,a.style.bottom="auto",a.style.transform=""},10),setTimeout(()=>{a.style.transition="",a.style.removeProperty("transition")},700)}else{let E=a.querySelector(".cw-btn.active"),N=v.target.closest("button");if(a.classList.contains("collapsed")){let F=a.getBoundingClientRect(),q=window.innerHeight,z=F.top>q/2;if(a.style.setProperty("transition","none","important"),z){let W=q-F.bottom;a.style.top="auto",a.style.bottom=`${W}px`}else a.style.bottom="auto",a.style.top=`${F.top}px`;a.offsetWidth,a.style.removeProperty("transition"),a.classList.remove("collapsed"),$.playGenieOpen()}else!E&&!N&&(a.classList.add("collapsed"),$.playGenieOpen());N&&(N.style.transform="scale(0.9)",setTimeout(()=>N.style.transform="",150))}}}function Qe(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${de.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let a=document.createElement("div");a.className="cw-abort-btn",a.textContent="Cancelar",a.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,V("Cancelado!",{duration:3e3}),o.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},o.appendChild(a),t.appendChild(o);let n=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(o))return;let l=Date.now()-n,s=Math.max(0,2e3-l);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(o))return;let c=o.querySelector(".cw-center-dots"),p=o.querySelector(".cw-center-text"),m=o.querySelector(".cw-center-success"),f=o.querySelector(".cw-abort-btn");c&&(c.style.display="none"),p&&(p.style.display="none"),f&&(f.style.display="none"),m&&m.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{o.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},s)}}function xo(t){let{onSaveCurrent:e,onLoadDraft:o,t:a}=t,n=document.createElement("button");n.className="js-btn-park",n.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${a("guardar")}</span>
    `,n.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${ue.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${B.surface};
        color: ${B.textSub};
        border: 1px solid ${B.border};
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ${ce};
        box-shadow: ${De.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,n.onmouseenter=()=>{n.style.backgroundColor="#F8F9FA",n.style.borderColor="#202124",n.style.color="#202124",n.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",n.style.transform="translateY(-1px)"},n.onmouseleave=()=>{n.style.backgroundColor="#FFFFFF",n.style.borderColor="#DADCE0",n.style.color="#5F6368",n.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",n.style.transform="translateY(0)"},n.onmousedown=()=>n.style.transform="scale(0.96)",n.onmouseup=()=>n.style.transform="scale(1) translateY(-1px)",n.onclick=async()=>{if(await ve("Deseja guardar o rascunho atual e limpar os campos?"))try{let E=await e();E?(we.save(E),g(),c(),$.playSuccess(),V("Rascunho salvo com sucesso!")):V("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(E){console.error("Erro ao salvar rascunho:",E),V("Erro ao salvar.",{error:!0})}};let i=document.createElement("div");i.title="Meus Rascunhos",i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#9AA0A6"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let l=i.querySelector("svg"),s=document.createElement("div");s.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(s),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=v=>{v.stopPropagation(),w()};function c(){let v=we.getCount();mt(v>0),l.style.color=v>0?B.primary:"#9AA0A6",v>0?(s.style.display="block",s.textContent=v,s.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):s.style.display="none"}let p=document.createElement("div");p.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${B.surface}; z-index: 100;
        border-radius: ${ue.large} ${ue.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${ce};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let m=document.createElement("div");m.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",m.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${a("rascunhos_salvos")}</span>`;let f=document.createElement("button");f.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',f.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",f.onmouseenter=()=>f.style.background="#F1F3F4",f.onmouseleave=()=>f.style.background="transparent",f.onclick=()=>w(!1),m.appendChild(f);let h=document.createElement("div");h.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",p.appendChild(m),p.appendChild(h);function w(v){let E=p.style.transform==="translateY(0%)";(v!==void 0?v:!E)?(g(),p.style.transform="translateY(0%)"):p.style.transform="translateY(110%)"}function g(){let v=we.getAll();if(h.innerHTML="",v.length===0){h.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${B.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${a("nenhum_rascunho")}</div>
                </div>`;return}v.forEach(E=>{let N=document.createElement("div");N.style.cssText=`
                background: ${B.surface}; padding: 20px; border-radius: ${ue.large};
                border: 1.5px solid ${B.bgInput}; box-shadow: ${De.subtle};
                position: relative; transition: all 0.3s ${ce};
            `;let q=new Date(E.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),z="";E.summaryTags&&E.summaryTags.length>0&&(z=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${E.summaryTags.slice(0,3).join(", ")+(E.summaryTags.length>3?"...":"")}</div>`),N.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${E.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${q}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${E.cid||"---"}</span>
                    <span style="display:block; color:${E.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${E.subStatus||E.status||"Sem Status"}</span>
                    ${z}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let W=N.querySelector(".cw-resume-btn");W.onclick=async()=>{await ve("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(E),we.delete(E.id),g(),c(),w(!1),$.playSwoosh(),V("Rascunho carregado."))};let J=N.querySelector(".cw-del-btn");J.onclick=async()=>{await ve("Excluir este rascunho?",{danger:!0})&&(we.delete(E.id),g(),c())},h.appendChild(N)})}return c(),{parkButton:n,historyBtnWrapper:i,drawer:p}}function et(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let a=window.getSelection();a.removeAllRanges(),a.addRange(o);try{document.execCommand("copy")}catch{V("Falha ao copiar",{error:!0})}a.removeAllRanges(),document.body.removeChild(e)}function gt(t){["input","change","keydown","keyup"].forEach(o=>{let a=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(a)})}function yo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function bt(){let t=yo(),e=t.length,a=Array.from(document.querySelectorAll("i.material-icons-extended")).find(l=>l.innerText.trim()==="description");if(a){let l=a.closest("material-fab")||a.closest("material-button");l?(l.style&&(l.style.display="block",l.style.visibility="visible"),xe(l)):xe(a)}else{let l=document.querySelector("material-fab-speed-dial");if(l){let s=l.querySelector(".trigger");s?(s.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),xe(s)):l.click(),await ne(800);let p=Array.from(document.querySelectorAll("i.material-icons-extended")).find(m=>m.innerText.trim()==="description");p&&xe(p)}}let n=null,i=0;for(;!n&&i<20;){await ne(300);let l=yo();if(l.length>e)n=l.find(s=>!t.includes(s)),n||(n=l[l.length-1]);else if(i>10){let s=l.filter(c=>c.offsetParent!==null);s.length>0&&(n=s[s.length-1])}i++}return n}function vo(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let a=document.createElement("div");a.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(a),e.appendChild(o),o.addEventListener("scroll",()=>{a.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let n={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function l({id:q,label:z,type:W="text",placeholder:J="",required:L=!1,parent:I=o}){let R=document.createElement("div");R.style.cssText=n.inputWrapper;let H=document.createElement("label");H.style.cssText=n.label,H.innerHTML=`${z} ${L?'<span style="color:#D93025">*</span>':""}`;let _;return W==="textarea"?(_=document.createElement("textarea"),_.style.cssText=n.input+n.textarea):(_=document.createElement("input"),_.type=W,_.style.cssText=n.input),_.id=q,_.placeholder=J,_.addEventListener("focus",()=>{_.style.borderColor="#1a73e8",_.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),_.addEventListener("blur",()=>{_.style.borderColor="#DADCE0",_.style.boxShadow="none",L&&_.value.trim()!==""&&(_.style.backgroundColor="#FFF")}),i[q]={input:_,wrapper:R,required:L},R.appendChild(H),R.appendChild(_),I.appendChild(R),R}function s({id:q,label:z,options:W=["Yes","No"],defaultValue:J="No",onChange:L=null}){let I=document.createElement("div");I.style.cssText=n.inputWrapper;let R=document.createElement("label");R.style.cssText=n.label,R.textContent=z,I.appendChild(R);let H=document.createElement("div");H.style.cssText=n.radioGroup;let _=document.createElement("input");return _.type="hidden",_.id=q,_.value=J,I.appendChild(_),W.forEach(D=>{let j=document.createElement("div");j.textContent=D,j.style.cssText=n.radioLabel,D===J&&(j.style.cssText+=n.radioActive),j.onclick=()=>{Array.from(H.children).forEach(X=>X.style.cssText=n.radioLabel),j.style.cssText+=n.radioActive,_.value=D,L&&L(D)},H.appendChild(j)}),i[q]={input:_,wrapper:I,required:!1},I.appendChild(H),o.appendChild(I),I}let c=document.createElement("div");c.style.cssText=n.banner,c.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(c);let p=document.createElement("div");p.style.marginBottom="24px";let m=document.createElement("button");m.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",m.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",m.onmouseover=()=>m.style.background="#E1EFFF",m.onmouseout=()=>m.style.background="#F0F7FF",p.appendChild(m),o.appendChild(p);let f=document.createElement("div");f.style.cssText=n.section,f.innerHTML=`<div style="${n.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(f),l({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:f}),l({id:"ga4",label:"GA4 Property ID",parent:f}),l({id:"gtm",label:"GTM Container ID",parent:f});let h=document.createElement("div");h.style.cssText=n.hiddenField,f.appendChild(h),s({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:q=>{q==="Yes"?h.style.cssText=n.visibleField+"margin-bottom:14px;":(h.style.cssText=n.hiddenField,i.accessEmail.input.value="")}}),l({id:"accessEmail",label:"User Access Email",parent:h}),s({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let w=document.createElement("div");w.style.cssText=n.section,w.innerHTML=`<div style="${n.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(w),l({id:"name",label:"Advertiser Name",required:!0,parent:w}),l({id:"url",label:"Website URL",parent:w}),l({id:"phone",label:"Phone Number",parent:w}),l({id:"email",label:"Contact Email",parent:w}),l({id:"callback",label:"Preferred Callback Time (Timezone)",parent:w}),l({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:w}),l({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:w}),l({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:w});let g=document.createElement("div");g.style.cssText=n.section,g.innerHTML=`<div style="${n.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(g),l({id:"cc_adv",label:"Advertiser Contact",parent:g}),l({id:"cc_am",label:"Account Manager",parent:g});let v=document.createElement("div");v.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let E=document.createElement("button");E.innerHTML="Voltar",E.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",E.onclick=t;let N=document.createElement("button");N.textContent="Gerar Nota",N.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",v.appendChild(E),v.appendChild(N),e.appendChild(v),m.onclick=async()=>{let q=m.innerHTML;m.innerHTML="\u23F3 Buscando dados...";try{let z=await Fe(),W=0,J=(R,H)=>{let _=i[R];H&&_&&_.input.value===""&&(_.input.value=H,_.input.style.backgroundColor="#E6F4EA",_.input.style.borderColor="#34A853",setTimeout(()=>{_.input.style.backgroundColor="#FFF",_.input.style.borderColor="#DADCE0"},1e3),W++)};J("name",z.advertiserName),J("url",z.websiteUrl),z.clientEmail&&(J("email",z.clientEmail),J("cc_adv",z.clientEmail));let I=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);I&&J("cid",I[0]),W>0?V(`${W} campos preenchidos!`):V("Nenhum dado novo encontrado.")}catch(z){console.error(z),V("Erro ao ler p\xE1gina.")}finally{m.innerHTML=q}};let F=()=>{let q=!0,z=null;return Object.values(i).forEach(W=>{W.required&&!W.input.value.trim()&&(q=!1,W.input.style.cssText+=n.inputError,W.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),z||(z=W.input))}),z&&z.scrollIntoView({behavior:"smooth",block:"center"}),q};return N.onclick=async()=>{if(!F()){V("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let q=R=>i[R].input.value||"N/A",z=q("hasAccess"),W=z==="Yes"?q("accessEmail"):"N/A",L=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${q("cid")}
<b>GA4 ID:</b> ${q("ga4")}
<b>GTM ID:</b> ${q("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${z==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${W}
<b>Ghosting Access Available (Y/N):</b> ${q("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${q("name")}
<b>Website:</b> ${q("url")}
<b>Phone Number:</b> ${q("phone")}
<b>Preferred Callback:</b> ${q("callback")}
<b>Email Address:</b> ${q("email")}

<b>Detailed Issue Description:</b>
${q("desc")}

<b>Uncropped screenshots:</b>
${q("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${q("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${q("cc_adv")}
<b>Account Manager:</b> ${q("cc_am")}
`.replace(/\n/g,"<br>");et(L);let I=await bt();I?(I.innerText.trim()===""&&(I.innerHTML=""),document.execCommand("insertHTML",!1,L),gt(I),V("Nota gerada e inserida!")):V("Copiado! Abra uma nota para colar.")},e}function ke(t,e="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,o[e]||o.info)}function ft(t,e){if(!t)return;let o=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,a=document.getElementById(o);a&&a.remove();let n=t.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
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
            <span style="line-height:1.4;">${e}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;let l=i.querySelector(".cw-close-btn");l.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&l.click()},25e3)}async function ht(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await ne(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await ne(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Ot(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let a=o.offsetParent!==null,n=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return a&&!n&&i});return e&&ke("Editor visualmente detectado.","success"),e}async function wo(){ke("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(f=>f.innerText.trim()==="email");if(o&&o.offsetParent!==null){ke("Bot\xE3o de email direto encontrado.");let f=o.closest("material-button")||o.closest("material-fab")||o;xe(f),t=!0}else{ke("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let f=document.querySelector("material-fab-speed-dial");if(f){let h=f.querySelector(".trigger");if(h){xe(h),await ne(800);let g=Array.from(document.querySelectorAll("i.material-icons-extended")).find(v=>v.innerText.trim()==="email");g&&(xe(g),t=!0)}}}if(!t)return V("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ke("\u{1F680} FASE 2: Verificando rascunhos...");let a=null,n=0,i=20;for(;n<i;){await ne(250);let f=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(a=Array.from(f).find(h=>h.offsetParent!==null),a){ke("\u26A0\uFE0F Rascunho detectado!","warn");break}n++}if(a){ke("\u{1F5D1}\uFE0F Descartando..."),xe(a),a.click();let f=null,h=0;for(;h<15;){await ne(300);let w=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(f=Array.from(w).find(g=>g.offsetParent!==null),f)break;h++}f&&(xe(f),V("Limpando rascunho antigo...",{duration:2e3}),await ne(2500))}ke("\u{1F680} FASE 3: Buscando editor final...");let l=0,s=null;for(;l<20&&(s=Ot(),!s);)await ne(250),l++;if(!s)return V("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let c=s.closest('[id="email-body-content-top"]'),m=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(c){if(m){let h=m.closest('[aria-hidden="true"]');h&&h.removeAttribute("aria-hidden"),m.focus(),xe(m)}await ne(300),c.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let f=c.querySelector("#cases-body-field");if(f){let h=document.createRange();h.selectNodeContents(f),h.collapse(!0);let w=window.getSelection();w.removeAllRanges(),w.addRange(h)}return!0}return!1}async function xt(t){if(!t||!await wo())return;let o=await Fe();ke("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let a=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(a&&(a.click(),await ne(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await ht(i,o.clientEmail),ft(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await ht(i,o.internalEmail),ft(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await ne(500);let n=document.querySelector('material-button[debug-id="canned_response_button"]');if(n){xe(n),await ne(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){xe(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),ke("\u23F3 Buscando resultado da Canned Response...","info");let l=null,s=0,c=15e3,p=500;for(;s<c&&(l=document.querySelector("material-select-dropdown-item"),!l);)await ne(p),s+=p;if(l){xe(l),await ne(1500);let m=Ot();if(m){let h=Array.from(m.querySelectorAll("span.field")).filter(g=>g.innerText.includes("{Requested Task Type}"));if(h.length>0){let g=h.map(E=>E.closest("tr")).filter(E=>E!==null),v=[...new Set(g)];if(v.length>0){let N=v[0].querySelector('td[width="100%"]');N&&(N.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let F=1;F<v.length;F++)v[F].remove()}}let w=m.innerHTML;o.advertiserName&&w.includes("{%ADVERTISER_NAME%}")&&(w=w.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),w.includes("{%^79285%}")&&(w=w.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),m.innerHTML=w}V("Canned Response aplicada!")}else ke(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),V(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else V("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function So(t){if(ke(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await wo())return;let o=await Fe(),a=Ke();await ne(600);let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await ne(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await ht(s,o.clientEmail),ft(s,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await ht(s,o.internalEmail),ft(s,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await ne(300));let l=Ot();if(l){let c=(l.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');c&&(c.focus(),xe(c));let p=new Date;p.setDate(p.getDate()+3);let m=p.getDay();m===6?p.setDate(p.getDate()+2):m===0&&p.setDate(p.getDate()+1);let f=p.toLocaleDateString("pt-BR"),h=t.body;h=h.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),h=h.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),h=h.replace(/\[URL\]/g,o.websiteUrl||"seu site"),h=h.replace(/\[Seu Nome\]/g,a),h=h.replace(/\[MM\/DD\/YYYY\]/g,f),document.execCommand("insertHTML",!1,h),c&&(c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0}))),V("Email preenchido com sucesso!",{duration:2e3}),ke("\u2705 Processo finalizado com sucesso.","success")}else V("Erro ao focar no editor.",{error:!0})}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
        /* M\xD3DULO BASE */
        .cw-module-window {
            /* Anima\xE7\xE3o Apple Spring (Ida e Volta) */
            transition: 
                opacity 0.3s ease,
                transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), 
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
    `,document.head.appendChild(t)}function be(t,e,o){let a=document.getElementById(o);if(!e)return;let n=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(a){let m=a.getBoundingClientRect();i.x=m.left+m.width/2,i.y=m.top+m.height/2}let l,s;if(!n)l=window.innerWidth/2,s=window.innerHeight/2;else{let m=e.getBoundingClientRect();l=m.left+m.width/2,s=m.top+m.height/2,l===0&&s===0&&(l=window.innerWidth/2,s=window.innerHeight/2)}let c=i.x-l,p=i.y-s;t?($.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",n?e.style.transform=`translate(${c}px, ${p}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${p}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),a&&a.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",n?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof Co=="function"&&Co(e,o)):($.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",n?e.style.transform=`translate(${c}px, ${p}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${p}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),a&&a.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof Nt=="function"&&Nt(e))}function Co(t,e){Nt(t);let o=a=>{if(!t.classList.contains("open"))return;let n=t.contains(a.target),i=document.querySelector(".cw-pill"),l=i&&i.contains(a.target);n?(t.classList.remove("idle"),t.style.zIndex="2147483648"):l||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function Nt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}function Eo(){let t="v4.0.0",{popup:e,content:o,header:a,animRefs:n,credit:i}=co(t,H),l=fo(b),s=bo(()=>{ee(),G.setActiveTasks(s.getCheckedElements())},b,G),c=document.createElement("div");c.style.display="none";let p=go((d,A)=>{Q(d,A)});c.appendChild(p);let m=document.createElement("div");m.id="evidence-container",Object.assign(m.style,{display:"none",marginTop:"16px",padding:"16px",background:B.bgInput,border:`1px solid ${B.border}`,borderRadius:ue.medium,boxShadow:De.subtle});let f=document.createElement("div");f.className="cw-section-title",f.textContent=b("evidencias_contato"),m.appendChild(f);let h={},w=(d,A)=>{let T=document.createElement("div");T.style.marginBottom="12px";let M=document.createElement("label");M.textContent=A,M.setAttribute("for",d),M.style.cssText=`display: block; font-size: 11px; font-weight: 700; color: ${B.textSub}; margin-bottom: 6px; text-transform: uppercase;`;let O=document.createElement("input");return O.type="text",O.id=d,O.className="cw-input",O.placeholder="https://screenshot.googleplex.com/...",O.style.marginBottom="0",T.appendChild(M),T.appendChild(O),h[d]=O,T};m.appendChild(w("evidence-l1",b("ligacao_1"))),m.appendChild(w("evidence-l2",b("ligacao_2"))),m.appendChild(w("evidence-msg",b("mensagem_am")));let g=xo({onSaveCurrent:async()=>{let d=await r();return P(),d},onLoadDraft:d=>{x(d)},t:d=>b(d)}),v=D(),E=j(),N=document.createElement("div"),F=S(),q=ae(g,b);o.appendChild(v),o.appendChild(E),o.appendChild(F),o.appendChild(c),o.appendChild(N),o.appendChild(m),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none";let z=document.createElement("button");z.id="manual-task-toggle",z.textContent=b("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",z.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${B.primary}; background: ${B.surface}; color: ${B.primary}; border-radius: ${ue.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${ce}; text-transform: uppercase; letter-spacing: 0.5px;`,z.onmouseenter=()=>{z.style.background=B.primaryBg},z.onmouseleave=()=>{z.style.background=B.surface},z.onclick=()=>{s.selectionElement.style.display="block",s.screenshotsElement.style.display="block",z.style.display="none"},o.appendChild(z),o.appendChild(s.selectionElement),o.appendChild(l.element),o.appendChild(s.screenshotsElement),o.appendChild(q);let W=document.createElement("div");W.style.display="none",W.style.flexGrow="1",W.style.minHeight="0",W.style.overflow="hidden";let J=vo(()=>_());J.style.height="100%",W.appendChild(J),e.insertBefore(W,i);let L=a.lastElementChild;L&&(L.insertBefore(g.historyBtnWrapper,L.firstChild),L.insertBefore(y(),L.firstChild)),e.appendChild(g.drawer);let I=null;G.subscribe(d=>{C(d),R(),d.isDirty?(I&&clearTimeout(I),I=setTimeout(async()=>{let A=await r(!0);A.subStatus?we.saveEmergency(A):we.clearEmergency(),d.isDirty=!1},2e3)):I&&(clearTimeout(I),I=null)});function R(){let d=we.getCount()>0,A=!!G.currentSubStatus;mt(d||A)}function H(){G.visible=!G.visible,be(G.visible,e,"cw-btn-notes")}function _(){G.isSplitView=!G.isSplitView,G.isSplitView?(o.style.display="none",W.style.display="flex",W.style.flexDirection="column",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",W.style.display="none",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function D(){let d=document.createElement("div");if(d.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-idioma" style="font-size: 10px; margin-bottom: 6px;">${b("idioma")}</div>
                    <div class="cw-segmented-control" id="lang-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-lang="pt" class="active" style="z-index:2">PT</button>
                        <button data-lang="es" style="z-index:2">ES</button>
                    </div>
                </div>
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
        `,!document.getElementById("cw-segmented-styles")){let T=document.createElement("style");T.id="cw-segmented-styles",T.innerHTML=`
                .cw-segmented-control {
                    display: flex;
                    background: ${B.bgInput};
                    padding: 3px;
                    border-radius: 100px;
                    gap: 2px;
                    border: 1px solid ${B.border};
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
                    transition: all 0.3s ${ce};
                    color: ${B.textSub};
                    position: relative;
                }
                .cw-segmented-control button.active {
                    color: #fff;
                }
                .cw-segmented-control button:hover:not(.active) {
                    background: rgba(0,0,0,0.03);
                    color: ${B.text};
                }
                .cw-segmented-indicator {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    bottom: 3px;
                    width: calc(50% - 4px);
                    background: ${B.primary};
                    border-radius: 100px;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }
            `,document.head.appendChild(T)}let A=(T,M)=>{let Y=d.querySelector(`#${T}`).querySelector(".cw-segmented-indicator");Y&&(Y.style.transform=`translateX(${M*100}%) translateX(${M*2}px)`)};return d.querySelectorAll("#lang-selector button").forEach((T,M)=>{T.onclick=()=>{G.setLanguage(T.dataset.lang),d.querySelectorAll("#lang-selector button").forEach(O=>O.classList.remove("active")),T.classList.add("active"),A("lang-selector",M),$.playHover(),G.currentSubStatus&&Z(G.currentSubStatus)}}),d.querySelectorAll("#type-selector button").forEach((T,M)=>{T.onclick=()=>{G.setCaseType(T.dataset.type),d.querySelectorAll("#type-selector button").forEach(O=>O.classList.remove("active")),T.classList.add("active"),A("type-selector",M),$.playHover(),G.currentSubStatus&&Z(G.currentSubStatus)}}),d.querySelectorAll("#portugal-selector button").forEach((T,M)=>{T.onclick=()=>{G.setPortugalCase(T.dataset.val==="true"),d.querySelectorAll("#portugal-selector button").forEach(O=>O.classList.remove("active")),T.classList.add("active"),A("portugal-selector",M),$.playHover(),G.currentSubStatus&&Z(G.currentSubStatus)}}),d}function j(){let d=document.createElement("div");d.className="cw-status-section",d.style.cssText="display: flex; flex-direction: column; gap: 8px;",d.innerHTML=`
            <div class="cw-section-title js-label-status" style="margin-top: 8px;">${b("status_principal")}</div>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${b("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <div class="cw-section-title js-label-substatus" style="margin-top: 8px;">${b("substatus")}</div>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${b("select_substatus")}</option>
            </select>
        `;let A=d.querySelector("#main-status-select"),T=d.querySelector("#sub-status-select");return A.onchange=()=>{G.setStatus(A.value),X(A.value,T),G.setSubStatus(""),Z("")},T.onchange=()=>{G.setSubStatus(T.value),Z(T.value)},d}function te(){return m.style.display==="none"?null:{l1:h["evidence-l1"]?.value.trim()||"",l2:h["evidence-l2"]?.value.trim()||"",msg:h["evidence-msg"]?.value.trim()||""}}function X(d,A){if(A.innerHTML=`<option value="">${b("select_substatus")}</option>`,!d){A.disabled=!0;return}for(let T in Ie)if(Ie[T].status===d){let M=document.createElement("option");M.value=T,M.textContent=Ie[T].name,A.appendChild(M)}A.disabled=!1}function Z(d){let A=Ie[d],T=d==="NI_Attempted_Contact"||A&&A.name&&A.name.toLowerCase().includes("attempted contact");if(p.render&&p.render(d,G.currentCaseType),!d){m.style.display="none",h["evidence-l1"]&&(h["evidence-l1"].value=""),h["evidence-l2"]&&(h["evidence-l2"].value=""),h["evidence-msg"]&&(h["evidence-msg"].value=""),c.style.display="none",N.style.display="none";let pe=document.getElementById("manual-task-toggle");pe&&(pe.style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",F.style.display="flex",F.style.opacity="1",q.style.display="none";return}if(T?m.style.display="block":(m.style.display="none",h["evidence-l1"]&&(h["evidence-l1"].value=""),h["evidence-l2"]&&(h["evidence-l2"].value=""),h["evidence-msg"]&&(h["evidence-msg"].value="")),F.style.opacity="0",setTimeout(()=>{G.currentSubStatus&&(F.style.display="none")},400),q.style.display="grid",A&&A.templateFields){let pe=st(A);G.setActiveFields(A.templateFields.filter(Ee=>!pe.includes(Ee)))}k(),dt(d,N,G),N.style.display="block",c.style.display="block";let M=d.startsWith("SO_"),O=d==="NI_Awaiting_Validation",Y=document.getElementById("manual-task-toggle");M||O?(s.selectionElement.style.display="block",Y.style.display="none"):(s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",Y.style.display="block");let U=d==="SO_Education_Only"?"education":"implementation";G.setScreenshotMode(U),s.updateSubStatus(d),ee();let se=document.getElementById("email-automation-toggle-row");se&&(se.style.display=Ye[d]?"flex":"none")}function ee(){let d=s.getCheckedElements().map(A=>A.value);l.updateVisibility(G.currentSubStatus,d)}function Q(d,A){let T=lt[d];if(T){for(let M in T)if(M==="linkedTask")s.toggleTask(T.linkedTask,A);else if(M==="activeTasks")T.activeTasks.forEach(O=>{A?s.setTaskCount(O.value,O.count):s.setTaskCount(O.value,0)});else if(M.startsWith("field-")){let O=M,Y=T[M],U=document.getElementById(O);if(U){let se=We.includes(O.replace("field-",""));if(A)if(se){let pe=U.value.trim();pe.includes(Y.trim())||(U.value=pe?pe+`
`+Y.trim():Y.trim())}else U.value=Y;else if(se){let pe=U.value.trim(),Ee=Y.trim();pe.includes(Ee)&&(U.value=pe.replace(Ee,"").trim().replace(/\n{3,}/g,`

`))}else U.value.trim()===Y.trim()&&(U.value="");G.updateField(O,U.value),U.dispatchEvent(new Event("input"))}}}}function ae(d,A){let T=document.createElement("div");if(T.className="cw-actions-section",T.style.cssText=`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${B.bgInput};
            border-radius: 12px;
            border: 1px solid ${B.border};
        `,!document.getElementById("cw-actions-hover-styles")){let pe=document.createElement("style");pe.id="cw-actions-hover-styles",pe.innerHTML=`
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
                    border-color: ${B.primary} !important;
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
                    color: ${B.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.05) !important;
                    transform: translateY(-1px);
                }
            `,document.head.appendChild(pe)}let M=document.createElement("div");M.id="email-automation-toggle-row",M.style.cssText="grid-column: 1 / -1; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",M.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${B.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${B.primary};">
                <span class="js-label-email-toggle">${A("preencher_email_automaticamente")}</span>
            </label>
        `;let O=d.parkButton;O.classList.add("js-btn-park"),O.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let Y=document.createElement("button");Y.className="cw-btn-secondary js-btn-reset",Y.textContent=A("limpar"),Y.style.cssText=`width: 100%; height: 34px; background: ${B.surface}; color: ${B.textSub}; border: 1px solid ${B.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,Y.onclick=()=>P();let U=document.createElement("button");U.className="cw-btn-secondary js-btn-copy",U.textContent=A("copiar"),U.style.cssText=`width: 100%; height: 34px; background: ${B.surface}; color: ${B.primary}; border: 1px solid ${B.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,U.onclick=()=>K();let se=document.createElement("button");return se.className="cw-btn-primary js-btn-generate",se.textContent=A("preencher"),se.style.cssText=`width: 100%; height: 38px; background: ${B.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: 1 / -1; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,se.onclick=()=>oe(),T.appendChild(M),T.appendChild(O),T.appendChild(Y),T.appendChild(U),T.appendChild(se),T}async function K(){if(!G.currentSubStatus){V(b("select_substatus"),{error:!0});return}let d=Lt(G,s,l,te());d?(et(d),V(b("copiado_sucesso")),$.playClick()):V(b("select_substatus"),{error:!0})}async function oe(){if(!G.currentSubStatus){V(b("select_substatus"),{error:!0});return}let d=Ie[G.currentSubStatus],A=Ze(d).filter(Y=>{if(!G.activeFields.includes(Y))return!1;let U=G.formData[`field-${Y}`];return!U||!U.trim()});if(A.length>0){V(`Preencha o campo obrigat\xF3rio antes de gerar: ${b(A[0].toLowerCase())}`,{error:!0});return}if(d?.requiresTasks&&s.getCheckedElements().length===0){V("Selecione ao menos uma tarefa antes de gerar a nota.",{error:!0});return}let T=Lt(G,s,l,te());et(T),H();let M=Qe(),O=await bt();if(O){O.focus(),document.execCommand("insertHTML",!1,T),gt(O);let Y=document.getElementById("email-automation-checkbox");(!Y||Y.checked)&&G.currentSubStatus&&Ye[G.currentSubStatus]&&await xt(Ye[G.currentSubStatus]),V(b("inserido_copiado")),$.playSuccess(),P()}else V("N\xE3o foi poss\xEDvel abrir a nota no CRM. O conte\xFAdo j\xE1 est\xE1 copiado \u2014 cole manualmente.",{error:!0}),H();M()}function k(){if(G.currentSubStatus){if(G.currentCaseType==="lm")G.removeField("ON_CALL");else{let d=Ie[G.currentSubStatus];d&&d.templateFields.includes("ON_CALL")&&G.addFieldAt("ON_CALL",1)}G.isPortugalCase?(G.addFieldAt("CASO_PORTUGAL",1),G.addFieldAt("CONSENTIU_GRAVACAO",2)):(G.removeField("CASO_PORTUGAL"),G.removeField("CONSENTIU_GRAVACAO"))}}function P(){G.reset(),s.reset(),l.reset(),R(),we.clearEmergency(),o.querySelectorAll("select").forEach(A=>A.value=""),o.querySelector("#sub-status-select").disabled=!0;let d=document.getElementById("email-automation-toggle-row");d&&(d.style.display="none"),N.innerHTML="",c.style.display="none",F.style.display="flex",F.style.opacity="1",q.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",m.style.display="none",h["evidence-l1"]&&(h["evidence-l1"].value=""),h["evidence-l2"]&&(h["evidence-l2"].value=""),h["evidence-msg"]&&(h["evidence-msg"].value="")}async function r(d=!1){let A={};N.querySelectorAll("input, textarea, select").forEach(U=>{(U.id.startsWith("field-")||U.id==="consent-select")&&(A[U.id]=U.value)});let T="Cliente",M="---";if(!d)try{let U=await Fe();T=U.advertiserName,M=U.cid}catch(U){console.warn("Erro ao coletar pageData:",U)}let O=s.getCheckedElements().map(U=>({key:U.value,count:U.count})),Y=O.map(U=>{let se=Le[U.key];return se?se.name:U.key});return{currentCaseType:G.currentCaseType,currentLang:G.currentLang,isPortugalCase:G.isPortugalCase,consent:G.consent,tagSupportUsed:G.tagSupportUsed,forcedScreenshots:[...G.forcedScreenshots],activeFields:G.activeFields,status:G.currentStatus,subStatus:G.currentSubStatus,formData:A,activeTasks:O,summaryTags:Y,clientName:T,cid:M,timestamp:new Date().toISOString()}}let u=d=>new Promise(A=>setTimeout(A,d));async function x(d){G.setLanguage(d.currentLang||"pt"),G.setCaseType(d.currentCaseType||"bau"),G.setPortugalCase(d.isPortugalCase||!1),G.setConsent(d.consent||!1),d.activeFields&&G.setActiveFields(d.activeFields);let A=o.querySelector(`#lang-selector button[data-lang="${G.currentLang}"]`);A&&A.classList.add("active"),o.querySelectorAll("#lang-selector button").forEach(O=>{O!==A&&O.classList.remove("active")});let T=o.querySelector(`#type-selector button[data-type="${G.currentCaseType}"]`);T&&T.classList.add("active"),o.querySelectorAll("#type-selector button").forEach(O=>{O!==T&&O.classList.remove("active")});let M=o.querySelector(`#portugal-selector button[data-val="${G.isPortugalCase}"]`);if(M&&M.classList.add("active"),o.querySelectorAll("#portugal-selector button").forEach(O=>{O!==M&&O.classList.remove("active")}),d.status){let O=o.querySelector("#main-status-select");O.value=d.status,G.setStatus(d.status);let Y=o.querySelector("#sub-status-select");if(X(d.status,Y),await u(50),d.subStatus){if(Y.value=d.subStatus,G.setSubStatus(d.subStatus),Z(d.subStatus),await u(100),d.tagSupportUsed!==void 0){G.setTagSupportUsed(d.tagSupportUsed);let U=l.element.querySelector('input[value="Sim"]'),se=l.element.querySelector('input[value="N\xE3o"]');d.tagSupportUsed&&U?U.checked=!0:se&&(se.checked=!0),l.element.querySelector("div:last-child").style.display=d.tagSupportUsed?"none":"block"}d.forcedScreenshots&&G.setForcedScreenshots(d.forcedScreenshots);for(let U in d.formData){let se=document.getElementById(U);se&&(se.value=d.formData[U],G.updateField(U,se.value))}d.activeTasks&&(d.activeTasks.forEach(U=>s.setTaskCount(U.key,U.count)),G.setActiveTasks(s.getCheckedElements()))}}G.isDirty=!1}function b(d){return Ce[G.currentLang]?.[d]||Ce.pt?.[d]||d}function y(){let d=document.createElement("div");return d.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',d.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",d.onclick=A=>{A.stopPropagation(),_()},d.title="Alternar para Split & Transfer",d}function S(){let d=document.createElement("div");return d.id="notes-empty-state",d.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${ce};
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
                <div style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${B.text}; margin-bottom: 4px;">
                    ${b("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${B.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${b("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,d}function C(d){let A=o.querySelector(".js-label-idioma");A&&(A.textContent=b("idioma"));let T=o.querySelector(".js-label-fluxo");T&&(T.textContent=b("fluxo"));let M=o.querySelector(".js-label-portugal");M&&(M.textContent=b("caso_portugal"));let O=o.querySelector(".js-label-status");O&&(O.textContent=b("status_principal"));let Y=o.querySelector(".js-label-substatus");Y&&(Y.textContent=b("substatus"));let U=o.querySelector(".js-btn-copy");U&&(U.textContent=b("copiar"));let se=o.querySelector(".js-btn-generate");se&&(se.textContent=b("preencher"));let pe=o.querySelector(".js-btn-reset");pe&&(pe.textContent=b("limpar"));let Ee=document.getElementById("manual-task-toggle");Ee&&(Ee.textContent=b("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let Ae=o.querySelector(".js-btn-park span");Ae&&(Ae.textContent=b("guardar")),f.textContent=b("evidencias_contato");let ot=m.querySelector('label[for="evidence-l1"]');ot&&(ot.textContent=b("ligacao_1"));let Pt=m.querySelector('label[for="evidence-l2"]');Pt&&(Pt.textContent=b("ligacao_2"));let Ht=m.querySelector('label[for="evidence-msg"]');Ht&&(Ht.textContent=b("mensagem_am"));let Gt=e.querySelector(".js-drawer-title");Gt&&(Gt.textContent=b("rascunhos_salvos"));let jt=o.querySelector(".js-label-email-toggle");jt&&(jt.textContent=b("preencher_email_automaticamente")),l&&l.setLanguage&&l.setLanguage(b),s&&s.setLanguage&&s.setLanguage(b)}return F.style.display="flex",q.style.display="none",G.setLanguage("pt"),G.setCaseType("bau"),R(),setTimeout(async()=>{let d=we.getEmergency();d&&(await ve("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?")?(x(d),V("Sess\xE3o restaurada!")):we.clearEmergency())},3e3),document.body.appendChild(e),H}var Ao=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule2",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email nas pr\xF3ximas 48 horas o caso ser\xE1 encerrado.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}];var ko={_templates:null,async getTemplates(){return this._templates?this._templates:(this._templates=Ao,this._templates)}};var To="cw_personal_library_v1",Xe=!1,Se={getSnippets:(t="all")=>{let e=Se._loadFromLocal(),o=fe();return o&&o.includes("@")&&!Xe&&Se._syncWithServer(o),t==="all"?e:e.filter(a=>a.type===t)},save:async t=>{let e=fe();if(!e)return V("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;Xe=!0;let o=Se._loadFromLocal(),a=new Date().toISOString(),n={id:t.id||"local_"+Date.now(),type:t.type||"general",title:t.title||"Sem t\xEDtulo",content:t.content||"",subject:t.subject||"",isCode:t.isCode||!1,isRich:t.isRich||!1,updated:a,_pendingSync:!0},i=o.filter(c=>c.id!==n.id);i.unshift(n),Se._saveToLocal(i);let l=!1;try{l=await de.saveSnippet(n,e),l?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}catch(c){console.error("Erro na nuvem:",c)}finally{setTimeout(()=>{Xe=!1},2e3)}n._pendingSync=!l;let s=Se._loadFromLocal().filter(c=>c.id!==n.id);return s.unshift(n),Se._saveToLocal(s),{...n,synced:l}},delete:async t=>{let e=fe();Xe=!0;let a=Se._loadFromLocal().filter(n=>n.id!==t);return Se._saveToLocal(a),e?de.deleteSnippet(t,e).then(()=>{setTimeout(()=>{Xe=!1},2e3)}):Xe=!1,!0},_syncWithServer:async t=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let e=await de.getUserSnippets(t);if(e&&e.status==="success"&&Array.isArray(e.snippets)){let o=e.snippets,a=Se._loadFromLocal(),i=[...a.filter(c=>c._pendingSync),...o],l=JSON.stringify(i),s=JSON.stringify(a);l!==s&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),Se._saveToLocal(i))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(To)||"[]")}catch{return[]}},_saveToLocal:t=>{localStorage.setItem(To,JSON.stringify(t))}};function Fo(){let t="v6.0.0",e=!1,o=[],a=null,n="",i="Todos",l=new Set,s={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"},c=document.createElement("div");c.id="email-assistant-popup",c.classList.add("cw-module-window");let p=document.createElement("style");p.textContent=`
        #email-template-list::-webkit-scrollbar {
            width: 4px;
        }
        #email-template-list::-webkit-scrollbar-track {
            background: transparent;
        }
        #email-template-list::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        #email-template-list::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.2);
        }
        @keyframes cw-floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .cw-animate-float {
            animation: cw-floating 3s ease-in-out infinite;
        }
    `,document.head.appendChild(p),Object.assign(c.style,ye,{width:"850px",height:"650px",display:"none",flexDirection:"column",fontFamily:"'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",borderRadius:"12px",overflow:"hidden"});let m=ge(c,"Email Assistant",t,"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",{popup:c},()=>j()),f=document.createElement("div");Object.assign(f.style,{display:"flex",flex:"1",overflow:"hidden",backgroundColor:s.bgApp});let h=document.createElement("div");Object.assign(h.style,{width:"320px",backgroundColor:"#EFEFF0",borderRight:`1px solid ${s.borderSubtle}`,display:"flex",flexDirection:"column",flexShrink:"0"});let w=document.createElement("div");Object.assign(w.style,{padding:"16px",borderBottom:`1px solid ${s.borderSubtle}`,position:"relative"});let g=document.createElement("input");g.placeholder="Buscar templates...",Object.assign(g.style,{width:"100%",padding:"10px 14px 10px 36px",borderRadius:"10px",border:"1.5px solid transparent",backgroundColor:"#E3E3E8",fontSize:"15px",outline:"none",boxSizing:"border-box",color:s.textPrimary,backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",transition:"all 0.2s ease-in-out"}),g.onfocus=()=>{g.style.backgroundColor="#FFFFFF",g.style.borderColor=s.primary,g.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)",g.style.transform="scale(1.02)"},g.onblur=()=>{g.style.backgroundColor="#E3E3E8",g.style.borderColor="transparent",g.style.boxShadow="none",g.style.transform="scale(1)"};let v=document.createElement("div");v.id="email-template-list",Object.assign(v.style,{flex:"1",overflowY:"auto",padding:"8px",scrollBehavior:"smooth"});let E=document.createElement("div");E.innerHTML="\u2715",Object.assign(E.style,{position:"absolute",right:"26px",top:"50%",transform:"translateY(-50%)",fontSize:"10px",color:"#fff",cursor:"pointer",display:"none",backgroundColor:"#C7C7CC",width:"16px",height:"16px",borderRadius:"50%",textAlign:"center",lineHeight:"16px",fontWeight:"bold"}),E.onclick=()=>{g.value="",n="",E.style.display="none",X(),g.focus()},w.appendChild(g),w.appendChild(E),h.appendChild(w),h.appendChild(v);let N=document.createElement("div");Object.assign(N.style,{flex:"1",display:"flex",flexDirection:"column",overflow:"hidden",backgroundColor:s.bgApp,transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"});let F=document.createElement("div");Object.assign(F.style,{padding:"20px",borderBottom:`1px solid ${s.borderSubtle}`,backgroundColor:s.bgSurface,maxHeight:"250px",overflowY:"auto",display:"none"});let q=document.createElement("div");Object.assign(q.style,{flex:"1",display:"flex",flexDirection:"column",padding:"20px",backgroundColor:s.bgApp,overflow:"hidden"});let z=document.createElement("div");Object.assign(z.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"});let W=document.createElement("span");W.textContent="Preview do E-mail",Object.assign(W.style,{fontSize:"12px",fontWeight:"600",color:s.textSecondary,textTransform:"uppercase",letterSpacing:"0.5px"});let J=document.createElement("div");Object.assign(J.style,{display:"flex",gap:"8px"});let L=(K,oe=!1)=>{let k=document.createElement("button");return k.textContent=K,Object.assign(k.style,{padding:"8px 14px",borderRadius:"10px",border:oe?"none":`1.5px solid ${s.primary}`,background:oe?s.primary:"transparent",color:oe?"#fff":s.primary,fontSize:"13px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 1, 0.5, 1)",boxShadow:oe?"0 4px 12px rgba(0, 122, 255, 0.3)":"none"}),k.onmouseenter=()=>{oe?(k.style.backgroundColor="#0062CC",k.style.transform="translateY(-1px)",k.style.boxShadow="0 6px 16px rgba(0, 122, 255, 0.4)"):k.style.backgroundColor="rgba(0, 122, 255, 0.05)"},k.onmouseleave=()=>{oe?(k.style.backgroundColor=s.primary,k.style.transform="translateY(0)",k.style.boxShadow="0 4px 12px rgba(0, 122, 255, 0.3)"):(k.style.backgroundColor="transparent",k.style.transform="translateY(0)")},k.onmousedown=()=>k.style.transform="scale(0.94)",k.onmouseup=()=>k.style.transform="scale(1)",k},I=L("Copiar HTML"),R=L("Preencher no CRM",!0),H=L("Smart CR");H.style.borderColor="#E67E22",H.style.color="#E67E22",H.style.display="none",J.appendChild(H),J.appendChild(I),J.appendChild(R),z.appendChild(W),z.appendChild(J);let _=document.createElement("div");_.contentEditable="true",Object.assign(_.style,{flex:"1",backgroundColor:s.bgSurface,border:`1px solid ${s.borderSubtle}`,borderRadius:"8px",padding:"20px",fontSize:"15px",lineHeight:"1.6",color:s.textPrimary,overflowY:"auto",outline:"none",boxShadow:"inset 0 1px 2px rgba(0,0,0,0.02)"}),q.appendChild(z),q.appendChild(_),ae(),N.appendChild(F),N.appendChild(q),f.appendChild(h),f.appendChild(N),c.appendChild(m),c.appendChild(f);let D=document.createElement("div");Object.assign(D.style,qe),c.appendChild(D),Oe(c,D),document.body.appendChild(c);function j(){e=!e,e?(c.style.display="flex",ao(c),o.length===0&&te()):c.style.display="none",be(e,c,"cw-btn-email")}async function te(){v.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',o=await ko.getTemplates(),X()}function X(){v.innerHTML="";let K=o.filter(u=>u.name.toLowerCase().includes(n.toLowerCase())||u.category.toLowerCase().includes(n.toLowerCase())),oe=Object.entries(Ye).filter(([u,x])=>x&&(u.toLowerCase().includes(n.toLowerCase())||x.toLowerCase().includes(n.toLowerCase()))).map(([u,x])=>({id:u,name:u.replace(/_/g," "),category:"\u26A1 Smart CRs",code:x,isSmartCR:!0})),k=Se.getSnippets("email").filter(u=>u.title.toLowerCase().includes(n.toLowerCase())||u.subject&&u.subject.toLowerCase().includes(n.toLowerCase())).map(u=>{let x=[],b=u.content.match(/\[([^\]]+)\]/g);return b&&[...new Set(b)].forEach(y=>{x.push({key:y,label:y.replace("[","").replace("]",""),type:y.toLowerCase().includes("data")?"date":"text",auto:y.toLowerCase().includes("nome")&&y.toLowerCase().includes("seu")?"agentName":null})}),{id:u.id||`snippet-${Math.random()}`,name:u.title,category:"\u{1F464} Pessoal",subject:u.subject||"Sem Assunto",template:u.content,placeholders:x}}),P=[...K,...oe,...k];if(P.length===0){v.innerHTML=`
                <div style="padding: 40px 20px; text-align: center; color: ${s.textSecondary}; opacity: 0.6;">
                    <div style="font-size: 32px; margin-bottom: 12px;">\u{1F50D}</div>
                    <div style="font-size: 14px; font-weight: 500;">Nenhum resultado para "${n}"</div>
                </div>`;return}[...new Set(P.map(u=>u.category))].sort((u,x)=>u.localeCompare(x)).forEach(u=>{let x=l.has(u)||n.length>0,b=P.filter(T=>T.category===u),y=document.createElement("div");Object.assign(y.style,{padding:"12px 16px 12px 24px",fontSize:"11px",fontWeight:"700",color:s.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",position:"sticky",top:"-8px",backgroundColor:"rgba(239, 239, 240, 0.9)",zIndex:"10",backdropFilter:"blur(20px)",margin:"0 -8px 8px -8px",borderBottom:`0.5px solid ${s.borderSubtle}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none",transition:"background-color 0.2s ease"}),y.onmouseenter=()=>y.style.backgroundColor="rgba(230, 230, 232, 0.9)",y.onmouseleave=()=>y.style.backgroundColor="rgba(239, 239, 240, 0.9)";let S=document.createElement("span");S.textContent=u,y.appendChild(S);let C=document.createElement("span");C.textContent=b.length,Object.assign(C.style,{backgroundColor:"rgba(0, 0, 0, 0.05)",padding:"2px 8px",borderRadius:"10px",fontSize:"10px",color:s.textSecondary});let d=document.createElement("span");d.innerHTML=x?"\u{10012A}":"\u{10012B}",d.innerHTML=x?"\u25BE":"\u25B8",d.style.marginLeft="8px",d.style.transition="transform 0.3s ease";let A=document.createElement("div");A.style.display="flex",A.style.alignItems="center",A.appendChild(C),A.appendChild(d),y.appendChild(A),y.onclick=()=>{l.has(u)?l.delete(u):l.add(u),X()},v.appendChild(y),x&&b.forEach(T=>{let M=a&&a.id===T.id,O=document.createElement("div");if(Object.assign(O.style,{padding:"12px 14px",fontSize:"14px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",borderRadius:"10px",color:s.textPrimary,margin:"4px 6px",display:"flex",alignItems:"center",gap:"12px",backgroundColor:M?s.primary:s.bgSurface,boxShadow:M?"0 4px 12px rgba(0, 122, 255, 0.3)":"0 1px 2px rgba(0,0,0,0.05)",border:M?"none":`1px solid ${s.borderSubtle}`,position:"relative",overflow:"hidden"}),M){let se=document.createElement("div");Object.assign(se.style,{position:"absolute",left:"0",top:"0",bottom:"0",width:"4px",backgroundColor:"#fff",borderRadius:"0 4px 4px 0"}),O.appendChild(se)}let Y=document.createElement("span");Y.innerHTML=T.isSmartCR?"\u26A1":T.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}",Y.style.fontSize="12px",Y.style.opacity="0.7",Y.style.flexShrink="0",O.appendChild(Y);let U=document.createElement("span");U.textContent=T.name,U.style.overflow="hidden",U.style.textOverflow="ellipsis",U.style.whiteSpace="nowrap",U.style.flex="1",O.appendChild(U),M&&(O.style.color="#fff",O.style.fontWeight="600",Y.style.opacity="1"),O.onmouseenter=()=>{M||(O.style.backgroundColor="#f8f8f9",O.style.transform="translateY(-1px) scale(1.01)",O.style.boxShadow="0 4px 8px rgba(0,0,0,0.08)",O.style.borderColor="rgba(0, 122, 255, 0.2)")},O.onmouseleave=()=>{M||(O.style.backgroundColor=s.bgSurface,O.style.transform="translateY(0) scale(1)",O.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",O.style.borderColor=s.borderSubtle)},O.onmousedown=()=>{O.style.transform=M?"scale(0.97)":"scale(0.98)"},O.onmouseup=()=>{O.style.transform=M?"scale(1)":"translateY(-1px) scale(1.01)"},O.onclick=()=>{ee(T)},v.appendChild(O)})})}let Z=null;async function ee(K){a?.id!==K.id&&(a=K,Z&&clearTimeout(Z),N.style.opacity="0",N.style.transform="translateY(5px)",Z=setTimeout(()=>{H.style.display=K.isSmartCR?"block":"none",R.style.display=K.isSmartCR?"none":"block",I.style.display=K.isSmartCR?"none":"block",X(),Q(),ae(),N.style.opacity="1",N.style.transform="translateY(0)",Z=null},150))}function Q(){if(F.innerHTML="",!a||a.isSmartCR){a?.isSmartCR?(F.style.display="block",F.innerHTML=`<div style="padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):F.style.display="none";return}let K=a.placeholders&&a.placeholders.length>0;if(F.style.display=K?"block":"none",!K)return;let oe=document.createElement("div");Object.assign(oe.style,{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}),(a.placeholders||[]).forEach(k=>{let P=document.createElement("div"),r=document.createElement("label");r.textContent=k.label,Object.assign(r.style,{display:"block",fontSize:"11px",fontWeight:"700",color:s.textSecondary,marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.5px"});let u=document.createElement("input");u.type=k.type||"text",u.dataset.key=k.key,Object.assign(u.style,{width:"100%",padding:"10px 12px",borderRadius:"8px",border:`1.5px solid ${s.borderSubtle}`,backgroundColor:"#FBFBFD",fontSize:"14px",boxSizing:"border-box",transition:"all 0.2s ease",outline:"none"}),u.onfocus=()=>{u.style.borderColor=s.primary,u.style.backgroundColor="#FFFFFF",u.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)"},u.onblur=()=>{u.style.borderColor=s.borderSubtle,u.style.backgroundColor="#FBFBFD",u.style.boxShadow="none"},k.auto==="agentName"&&(u.value=Ke().split(" ")[0]),u.addEventListener("input",ae),P.appendChild(r),P.appendChild(u),oe.appendChild(P)}),F.appendChild(oe)}function ae(){if(!a){_.innerHTML=`
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center;">
                    <div class="cw-animate-float" style="width: 140px; height: 140px; margin-bottom: 24px;">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="55" fill="#f8f9fa"/>
                            <!-- Envelope Base -->
                            <path d="M30 40C30 37.7909 31.7909 36 34 36H86C88.2091 36 90 37.7909 90 40V80C90 82.2091 88.2091 84 86 84H34C31.7909 84 30 82.2091 30 80V40Z" fill="white" stroke="#e8eaed" stroke-width="2"/>
                            <!-- Google Colors Stripes on the envelope flap -->
                            <path d="M30 40L60 60L90 40" stroke="#4285F4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M30 80L50 65" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <path d="M90 80L70 65" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <!-- Small Floating icons -->
                            <circle cx="95" cy="30" r="8" fill="#34A853"/>
                            <path d="M92 30H98M95 27V33" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <rect x="20" y="70" width="12" height="12" rx="3" fill="#4285F4" opacity="0.8"/>
                        </svg>
                    </div>
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: ${s.textPrimary}; margin-bottom: 8px;">
                        Pronto para come\xE7ar?
                    </div>
                    <div style="font-size: 14px; color: ${s.textSecondary}; line-height: 1.6; max-width: 280px; margin: 0 auto;">
                        Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.
                    </div>
                </div>`;return}if(a.isSmartCR){_.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${a.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let K=a.template;(F.querySelectorAll("input")||[]).forEach(k=>{let P=k.dataset.key,r=k.value;if(k.type==="date"&&r){let[x,b,y]=r.split("-");r=`${b}/${y}/${x}`}r=r||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${P}</span>`;let u=P.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");K=K.replace(new RegExp(u,"g"),r)}),_.innerHTML=K}return g.addEventListener("input",K=>{n=K.target.value,E.style.display=n?"block":"none",X()}),I.onclick=()=>{let K=_.innerHTML,oe=new Blob([K],{type:"text/html"}),k=_.innerText,P=[new ClipboardItem({"text/html":oe,"text/plain":new Blob([k],{type:"text/plain"})})];navigator.clipboard.write(P).then(()=>V("E-mail copiado com sucesso!"),()=>V("Erro ao copiar e-mail",{error:!0}))},R.onclick=async()=>{if(!a)return;let K=Qe(),oe={...a,body:_.innerHTML};try{await So(oe),j()}catch{V("Erro ao preencher e-mail",{error:!0})}finally{K()}},H.onclick=async()=>{if(!a||!a.isSmartCR)return;let K=Qe();try{await xt(a.code),j()}catch{V("Erro ao aplicar Smart CR",{error:!0})}finally{K()}},j}var Lo=["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],_t={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:Lo,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:Lo,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]}};var ie={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",danger:"#D93025",dangerBg:"#FCE8E6",success:"#34A853",successBg:"#E6F4EA"},fa={inicio:{PT:"Abertura",ES:"Apertura"},meio:{PT:"Implementa\xE7\xE3o (Tag Support)",ES:"Implementaci\xF3n"},fim:{PT:"Fechamento",ES:"Cierre"}};function ha(){if(document.getElementById("csa-styles-v2"))return;let t=document.createElement("style");t.id="csa-styles-v2",t.textContent=`
        #call-script-popup { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        /* --- BANNER DE CONTEXTO --- */
        .csa-context-banner {
            padding: 20px 20px 16px 20px;
            background: ${ie.bgSurface};
            border-bottom: 1px solid #F1F3F4;
            display: flex; flex-direction: column; gap: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            position: relative; z-index: 5;
        }
        .csa-ctx-top { display: flex; justify-content: space-between; align-items: center; }
        .csa-ctx-name-wrap { display: flex; align-items: center; gap: 10px; }
        .csa-ctx-name { font-size: 16px; font-weight: 500; color: ${ie.textPrimary}; }
        .csa-live-badge {
            font-size: 10px; font-weight: 700; color: ${ie.primary}; background: ${ie.primaryBg};
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
        .csa-data-pill:hover { background: ${ie.bgSurface}; border-color: #DADCE0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transform: translateY(-1px); }
        .csa-data-pill:active { transform: scale(0.98); }
        .csa-data-pill.copied { background: ${ie.successBg} !important; border-color: ${ie.success} !important; }
        .csa-pill-label { font-size: 9px; font-weight: 700; color: ${ie.textSecondary}; text-transform: uppercase; margin-bottom: 2px; letter-spacing: 0.5px; }
        .csa-data-value { font-size: 13px; color: ${ie.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .csa-data-value.mono { font-family: 'SF Mono', 'Roboto Mono', monospace; font-weight: 500; color: ${ie.primary}; }
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
            width: 100%; background: ${ie.bgSurface}; border: 1px solid #DADCE0; border-radius: 10px; padding: 10px;
            display: flex; align-items: center; gap: 12px; cursor: pointer; box-sizing: border-box;
            transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }
        .csa-am-btn:hover { border-color: ${ie.primary}; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .csa-am-icon { background: ${ie.primaryBg}; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .csa-am-btn-text { text-align: left; }
        .csa-am-btn-title { font-size: 11px; font-weight: 700; color: #3C4043; }
        .csa-am-btn-sub { font-size: 10px; color: ${ie.textSecondary}; }

        .csa-am-review-container { display: none; max-height: 0; opacity: 0; overflow: hidden; margin-top: 0; transition: all 0.3s ease; }
        .csa-am-review-container.visible { display: block; max-height: 300px; opacity: 1; margin-top: 12px; }
        .csa-am-message-area {
            width: 100%; height: 120px; border: 1px solid #DADCE0; border-radius: 8px; padding: 10px;
            font-family: inherit; font-size: 13px; color: #3C4043; outline: none; resize: none;
            box-sizing: border-box; background: ${ie.bgSurface}; line-height: 1.4;
        }
        .csa-am-copy-final {
            width: 100%; margin-top: 8px; padding: 10px; background: ${ie.primary}; color: white; border: none;
            border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;
        }
        .csa-am-copy-final.copied-flash { background: ${ie.success}; }

        /* --- BARRA DE PROGRESSO --- */
        .csa-progress-container { height: 6px; background: ${ie.borderSubtle}; width: 100%; position: relative; overflow: hidden; }
        .csa-progress-fill {
            height: 100%; width: 0%; border-radius: 0 3px 3px 0;
            transition: width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            background: linear-gradient(90deg, ${ie.primary}, #00C6FF, ${ie.primary});
            background-size: 200% 100%;
            animation: csaShimmer 2s infinite linear;
        }
        .csa-progress-fill.complete { background: ${ie.success}; animation: none; }
        @keyframes csaShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        /* --- SEGMENTED CONTROL (Tipo / Idioma) --- */
        .csa-content-area { padding: 16px; overflow-y: auto; flex-grow: 1; background: ${ie.bgApp}; scroll-behavior: smooth; }
        .csa-controls { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .csa-segmented-control { display: flex; background: #E3E3E8; padding: 2px; border-radius: 10px; gap: 2px; position: relative; margin-bottom: 16px; }
        .csa-segmented-control button {
            flex: 1; border: none; background: transparent; padding: 8px 4px; font-size: 12px; font-weight: 600;
            border-radius: 8px; cursor: pointer; transition: color 0.3s ease; color: ${ie.textSecondary};
            position: relative; z-index: 2;
        }
        .csa-segmented-control button.active { color: ${ie.textPrimary}; }
        .csa-segmented-indicator {
            position: absolute; top: 2px; left: 2px; bottom: 2px; background: ${ie.bgSurface};
            border-radius: 8px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* --- CARDS DO CHECKLIST --- */
        .csa-card { background: ${ie.bgSurface}; border: 1px solid ${ie.borderSubtle}; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02); }
        .csa-card.done { box-shadow: inset 4px 0 0 ${ie.success}, 0 1px 3px rgba(0,0,0,0.05); }
        .csa-card-title { font-size: 11px; font-weight: 700; color: ${ie.textSecondary}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; user-select: none; }
        .csa-card-counter { font-size: 11px; opacity: 0.7; font-weight: 500; background: #f1f3f4; padding: 2px 8px; border-radius: 10px; }
        .csa-card-counter.done { opacity: 1; color: #1e8e3e; background: ${ie.successBg}; }

        .csa-item-row { display: flex; align-items: flex-start; padding: 10px 8px; cursor: pointer; border-radius: 10px; transition: background 0.2s ease; color: ${ie.textPrimary}; font-size: 14px; line-height: 1.5; margin-bottom: 2px; }
        .csa-item-row:not(.completed):hover { background: rgba(0, 0, 0, 0.03); }
        .csa-item-row:not(.completed):hover .csa-checkbox { border-color: ${ie.primary}; }
        .csa-item-row.completed { background: rgba(0, 0, 0, 0.02); }

        .csa-checkbox {
            min-width: 20px; height: 20px; border-radius: 50%; border: 2px solid ${ie.borderSubtle};
            margin-right: 12px; margin-top: 1px; display: flex; align-items: center; justify-content: center;
            transition: border-color 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.15s ease;
            background: #fff;
        }
        .csa-checkbox.checked { background: ${ie.primary}; border-color: ${ie.primary}; }
        .csa-checkbox.pulse { transform: scale(1.15); }

        .csa-item-text { position: relative; display: inline-block; flex: 1; transition: color 0.3s ease; }
        .csa-item-text.completed { color: ${ie.textSecondary}; }
        .csa-item-text::after { content: ''; position: absolute; left: 0; top: 50%; width: 0; height: 1.5px; background: ${ie.textSecondary}; transition: width 0.3s ease; }
        .csa-item-text.completed::after { width: 100%; }

        .csa-empty-state { padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .csa-empty-state-icon { font-size: 24px; }

        /* --- FOOTER --- */
        .csa-footer { padding: 12px 16px; border-top: 1px solid #F1F3F4; background: ${ie.bgSurface}; display: flex; justify-content: space-between; align-items: center; }
        .csa-credit { font-size: 10px; color: #bdc1c6; }
        .csa-reset-btn {
            background: transparent; border: none; color: ${ie.danger}; font-size: 12px; font-weight: 600;
            cursor: pointer; padding: 6px 12px; border-radius: 20px; transition: background 0.2s ease, transform 0.15s ease;
            display: flex; align-items: center; gap: 4px;
        }
        .csa-reset-btn:hover { background: ${ie.dangerBg}; }
        .csa-reset-btn:active { transform: scale(0.9); }
    `,document.head.appendChild(t)}function Io(){let t="v3.1.0";ha();let e={},o="PT",a="BAU",n=!1,i=document.createElement("div");i.id="call-script-popup",i.classList.add("cw-module-window"),Object.assign(i.style,ye,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let l={popup:i,googleLine:null},s=null;function c(){n&&Fe().then(x=>{let b=i.querySelector("#cw-ctx-name"),y=i.querySelector("#cw-ctx-cid"),S=i.querySelector("#cw-ctx-email");if(b&&(b.textContent=x.advertiserName||"Cliente Desconhecido"),y){let C=x.cid||"---";y.textContent!==C&&(y.textContent=C)}if(S){let C=x.clientEmail||"N\xE3o encontrado";S.textContent!==C&&(S.textContent=C,S.title=C)}})}function p(){Fe().then(x=>{let b=new Date().toLocaleDateString("pt-BR"),y=i.querySelector("#cw-am-message-area"),S=i.querySelector("#cw-am-review-container"),C=`Ol\xE1. Bom dia!

Estou com um caso do seu cliente (${x.advertiserName||"Cliente"}) em andamento hoje (${b}). Fiz a primeira tentativa de contato agora h\xE1 pouco, mas n\xE3o tive sucesso.

Farei uma nova tentativa em alguns minutos. Caso ele n\xE3o atenda novamente, seguirei com o e-mail padr\xE3o de reagendamento/no-show e te mantenho no radar.

Dados do caso para seu controle:

Cliente: ${x.advertiserName||"---"}
CID: ${x.cid||"---"}
Case ID: ${x.caseId||"---"}
E-mail: ${x.clientEmail||"---"}`;y&&(y.value=C),S&&(S.classList.add("visible"),S.scrollIntoView({behavior:"smooth",block:"end"}))})}function m(){n=!n,be(n,i,"cw-btn-script"),n?(c(),s||(s=setInterval(c,2e3))):s&&(clearInterval(s),s=null)}let f=ge(i,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",l,()=>{m()});i.appendChild(f);let h=document.createElement("div");h.className="csa-context-banner",h.innerHTML=`
      <div class="csa-ctx-top">
          <div class="csa-ctx-name-wrap">
              <div class="csa-live-dot" title="Monitoramento Ativo"></div>
              <span id="cw-ctx-name" class="csa-ctx-name">Carregando...</span>
          </div>
          <div class="csa-live-badge">Live</div>
      </div>

      <div class="csa-ctx-grid">
          <div class="csa-data-pill" id="cw-pill-cid">
              <div class="csa-pill-label">CID (Conta)</div>
              <div id="cw-ctx-cid" class="csa-data-value mono">---</div>
              <div class="csa-copy-hint">Copiado!</div>
          </div>

          <div class="csa-data-pill" id="cw-pill-email">
              <div class="csa-pill-label">Email de Contato</div>
              <div id="cw-ctx-email" class="csa-data-value">---</div>
              <div class="csa-copy-hint">Copiado!</div>
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
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${ie.primary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <div class="csa-am-btn-text">
                          <div class="csa-am-btn-title">Mensagem AM</div>
                          <div class="csa-am-btn-sub">Gerar aviso de insucesso</div>
                      </div>
                  </button>

                  <div id="cw-am-review-container" class="csa-am-review-container">
                      <textarea id="cw-am-message-area" class="csa-am-message-area"></textarea>
                      <button id="cw-am-copy-final" class="csa-am-copy-final">Copiar Mensagem Final</button>
                  </div>
              </div>
          </div>
      </div>
  `;let w=h.querySelector("#csa-toggle-options"),g=h.querySelector("#csa-options-content"),v=h.querySelector("#csa-options-arrow"),E=!1;w.onclick=()=>{E=!E,v.classList.toggle("expanded",E),g.classList.toggle("expanded",E),$.playClick()};let N=h.querySelector("#cw-pill-message"),F=h.querySelector("#cw-am-copy-final"),q=h.querySelector("#cw-am-message-area");N.addEventListener("click",()=>{p()}),F.addEventListener("click",()=>{q.value&&(navigator.clipboard.writeText(q.value),V("Mensagem copiada!"),$.playSuccess(),F.classList.add("copied-flash"),F.textContent="Copiado!",setTimeout(()=>{F.classList.remove("copied-flash"),F.textContent="Copiar Mensagem Final"},2e3))});let z=(x,b)=>{let y=h.querySelector(x),S=h.querySelector(b);y.onclick=()=>{let C=S.textContent;!C||C.includes("---")||C.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(C),$.playSuccess(),y.classList.add("copied"),setTimeout(()=>y.classList.remove("copied"),1500))}};i.appendChild(h);let W=document.createElement("div");W.className="csa-progress-container";let J=document.createElement("div");J.className="csa-progress-fill",W.appendChild(J),i.appendChild(W);let L=document.createElement("div");L.id="csa-content",L.className="csa-content-area",i.appendChild(L);let I=document.createElement("div");I.className="csa-footer";let R=document.createElement("span");R.className="csa-credit",R.textContent="by lucaste@";let H=document.createElement("button");H.className="csa-reset-btn",H.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',H.onclick=()=>{for(let x in e)delete e[x];P()},I.appendChild(R),I.appendChild(H),i.appendChild(I);let _=document.createElement("div");_.className="csa-controls";let D=document.createElement("div");D.className="csa-segmented-control",D.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `;let j=document.createElement("div");j.className="csa-segmented-control",j.innerHTML=`
      <div class="csa-segmented-indicator" id="lang-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-lang="PT">PT</button>
      <button data-lang="ES">ES</button>
  `,_.appendChild(D),_.appendChild(j),L.appendChild(_);let te=D.querySelectorAll("button"),X=D.querySelector("#type-indicator");te.forEach((x,b)=>{x.onclick=()=>{te.forEach(y=>y.classList.remove("active")),x.classList.add("active"),X.style.transform=`translateX(${b*(D.offsetWidth/2-2)}px)`,a=x.dataset.type,$.playClick(),P()}});let Z=j.querySelectorAll("button"),ee=j.querySelector("#lang-indicator");Z.forEach((x,b)=>{x.onclick=()=>{Z.forEach(y=>y.classList.remove("active")),x.classList.add("active"),ee.style.transform=`translateX(${b*(j.offsetWidth/2-2)}px)`,o=x.dataset.lang,$.playClick(),P()}});let Q=document.createElement("div");Q.id="csa-checklist-area",L.appendChild(Q);let ae=document.createElement("div");Object.assign(ae.style,qe),ae.className="no-drag",ae.title="Redimensionar",i.appendChild(ae),Oe(i,ae),document.body.appendChild(i),z("#cw-pill-cid","#cw-ctx-cid"),z("#cw-pill-email","#cw-ctx-email");function K(x){return x.replace(/\n/g,"<br>")}function oe(x,b,y,S){let C=`${x}-${b}-${S}`,d=!!e[C],A=document.createElement("div");A.className="csa-item-row"+(d?" completed":"");let T=document.createElement("div");T.className="csa-checkbox"+(d?" checked":""),T.innerHTML=d?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"";let M=document.createElement("span");return M.className="csa-item-text"+(d?" completed":""),M.innerHTML=K(y),A.onclick=()=>{let O=!e[C];e[C]=O,$.playClick(),A.classList.toggle("completed",O),M.classList.toggle("completed",O),T.classList.toggle("checked",O),T.innerHTML=O?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"",O&&(T.classList.add("pulse"),setTimeout(()=>T.classList.remove("pulse"),150)),r(x,_t[x])},A.appendChild(T),A.appendChild(M),{row:A,isDone:d}}function k(x,b,y){let S=document.createElement("div");S.className="csa-card";let C=document.createElement("div");C.className="csa-card-title",C.textContent=fa[b][o]||"";let d=document.createElement("span");d.className="csa-card-counter",C.appendChild(d),S.appendChild(C);let A=0;y.forEach((M,O)=>{let{row:Y,isDone:U}=oe(x,b,M,O);U&&A++,S.appendChild(Y)});let T=A===y.length&&y.length>0;return S.classList.toggle("done",T),d.classList.toggle("done",T),d.textContent=`${A}/${y.length}`,S}function P(){Q.innerHTML="";let x=`${o} ${a}`,b=_t[x];if(!b){Q.innerHTML='<div class="csa-empty-state"><div class="csa-empty-state-icon">\u2615</div><div>Script n\xE3o configurado.</div></div>',J.style.width="0%";return}let y=0,S=0;["inicio","meio","fim"].forEach(C=>{b[C]&&(y+=b[C].length)}),["inicio","meio","fim"].forEach(C=>{let d=b[C];!d||d.length===0||(d.forEach((A,T)=>{let M=`${x}-${C}-${T}`;e[M]&&S++}),Q.appendChild(k(x,C,d)))}),u(y,S)}function r(x,b){let y=0,S=0;["inicio","meio","fim"].forEach(C=>{let d=b[C]||[];y+=d.length,d.forEach((A,T)=>{e[`${x}-${C}-${T}`]&&S++})}),u(y,S),setTimeout(()=>P(),200)}function u(x,b){let y=x===0?0:b/x*100;J.style.width=`${y}%`,J.classList.toggle("complete",y===100)}return P(),m}var tt={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Ge={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},Me={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},yt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}};function xa(){if(document.getElementById("cw-links-styles"))return;let t=document.createElement("style");t.id="cw-links-styles",t.textContent=`
        .cw-links-layout { display: flex; height: calc(100% - 56px); width: 100%; position: relative; }

        /* --- SIDEBAR --- */
        .cw-links-sidebar {
            width: 80px; flex-shrink: 0; background: ${Me.bgSidebar};
            border-right: 1px solid ${Me.borderSubtle};
            display: flex; flex-direction: column; align-items: center;
            padding: 16px 0; overflow-y: auto; gap: 8px;
            scrollbar-width: none; z-index: 2;
        }
        .cw-links-nav-btn {
            width: 56px; height: 56px; border-radius: 16px;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            cursor: pointer; color: ${Me.textSecondary};
            transition: background 0.2s cubic-bezier(0.2, 0.0, 0.2, 1), color 0.2s ease;
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
        .cw-links-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: ${Me.bgApp}; position: relative; z-index: 1; }

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
            padding: 0 12px; font-size: 14px; color: ${Me.textPrimary};
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
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.2s ease;
            position: relative; overflow: hidden; box-sizing: border-box;
        }
        .cw-links-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
            border-color: rgba(0,0,0,0.05);
            border-left-color: var(--cat-color);
        }
        .cw-links-card:hover .cw-links-copy-btn { opacity: 1; background: #F1F3F4; }

        .cw-links-icon-box {
            width: 40px; height: 40px; border-radius: 12px;
            background: var(--cat-bg); color: var(--cat-color);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .cw-links-icon-box svg { width: 22px; height: 22px; }

        .cw-links-card-meta { flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
        .cw-links-card-title { font-size: 14px; font-weight: 600; color: ${Me.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-card-desc { font-size: 12px; color: ${Me.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

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
            transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
        }
        .cw-links-history-head { padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4; }
        .cw-links-history-title { font-size: 16px; font-weight: 700; color: #202124; }
        .cw-links-history-close { background: none; border: none; cursor: pointer; color: #5f6368; padding: 4px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; }
        .cw-links-history-close:hover { background: #F1F3F4; }
        .cw-links-history-list { flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA; }
        .cw-links-history-empty { text-align: center; color: #999; margin-top: 60px; font-size: 13px; }
    `,document.head.appendChild(t)}var Dt="cw_link_history_v4";function qo(t,e){try{let o=JSON.parse(localStorage.getItem(Dt)||"[]");o=o.filter(a=>a.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(Dt,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function ya(){try{return JSON.parse(localStorage.getItem(Dt)||"[]")}catch{return[]}}function Oo(){let t="v4.6",e="",o=!1,a=null,n=!1;xa();let i=document.createElement("div");i.id="links-popup",i.classList.add("cw-module-window"),Object.assign(i.style,ye,{right:"100px",width:"600px",height:"650px",background:Me.bgApp,overflow:"hidden"});let s=ge(i,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:i,googleLine:null},()=>_());i.appendChild(s);let c=document.createElement("div");c.className="cw-links-layout",i.appendChild(c);let p=document.createElement("div");p.className="cw-links-sidebar",c.appendChild(p);let m=document.createElement("div");m.className="cw-links-content",c.appendChild(m);let f=document.createElement("div");f.className="cw-links-search-bar";let h=document.createElement("div");h.className="cw-links-search-wrap";let w=document.createElement("div");w.className="cw-links-search-icon",w.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let g=document.createElement("input");g.className="cw-links-search-input",g.type="text",g.placeholder="Buscar ferramenta ou SOP...",h.appendChild(w),h.appendChild(g),f.appendChild(h),m.appendChild(f);let v=document.createElement("div");v.className="cw-links-scroll",m.appendChild(v);let E=null;function N(){if(E)return;E=document.createElement("div"),E.className="cw-links-history-overlay";let D=document.createElement("div");D.className="cw-links-history-head",D.innerHTML='<span class="cw-links-history-title">\u{1F552} Recentes</span>';let j=document.createElement("button");j.className="cw-links-history-close",j.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',j.onclick=()=>F(),D.appendChild(j),E.appendChild(D);let te=document.createElement("div");te.id="cw-history-list",te.className="cw-links-history-list",E.appendChild(te),m.appendChild(E)}function F(){n&&(n=!1,z(),I())}function q(){E||N();let D=E.querySelector("#cw-history-list");D.innerHTML="";let j=ya();j.length===0?D.innerHTML='<div class="cw-links-history-empty">Nada por aqui ainda.</div>':j.forEach(te=>{let X=H(te,Ge[te._originalCat],!0,te._originalCat);D.appendChild(X)}),requestAnimationFrame(()=>E.style.transform="translateY(0)")}function z(){E&&(E.style.transform="translateY(100%)")}document.addEventListener("mousedown",D=>{!n||!E||!E.contains(D.target)&&!p.contains(D.target)&&F()}),document.addEventListener("keydown",D=>{D.key==="Escape"&&n&&F()});function W(){p.innerHTML="";let D=J("history","Recentes",Ge.history);D.id="cw-sidebar-btn-history",D.onclick=()=>{$.playClick(),n=!n,n?q():z(),I()},p.appendChild(D);let j=document.createElement("div");j.className="cw-links-nav-sep",p.appendChild(j),Object.keys(tt).forEach(te=>{let X=tt[te],Z=J(te,X.label,Ge[te]);Z.id=`cw-sidebar-btn-${te}`,Z.onclick=()=>{$.playClick(),n&&F(),L(te)},p.appendChild(Z)})}function J(D,j,te){let X=document.createElement("div");X.className="cw-links-nav-btn",X.title=j,X.dataset.key=D;let Z=yt[D];Z&&(X.style.setProperty("--cat-color",Z.color),X.style.setProperty("--cat-bg",Z.bg));let ee=document.createElement("div");ee.className="cw-links-nav-icon",ee.innerHTML=te||Ge.tasks;let Q=document.createElement("div");return Q.className="cw-links-nav-label",Q.textContent=j,X.appendChild(ee),X.appendChild(Q),X}function L(D){let j=document.getElementById(`cat-anchor-${D}`);j&&(j.scrollIntoView({behavior:"smooth",block:"start"}),a=D,I())}function I(){Object.keys(tt).forEach(j=>{let te=p.querySelector(`#cw-sidebar-btn-${j}`);te&&te.classList.toggle("active",a===j&&!n)});let D=p.querySelector("#cw-sidebar-btn-history");D&&D.classList.toggle("history-open",n)}function R(){if(v.innerHTML="",e.trim()!==""){let j=[];if(Object.entries(tt).forEach(([X,Z])=>{let ee=Z.links.filter(Q=>Q.name.toLowerCase().includes(e.toLowerCase())||Q.desc.toLowerCase().includes(e.toLowerCase()));j.push(...ee.map(Q=>({...Q,_cat:X})))}),j.length===0){v.innerHTML='<div class="cw-links-empty">Nada encontrado.</div>';return}let te=document.createElement("div");te.className="cw-links-search-results-label",te.textContent="Resultados da busca",v.appendChild(te),j.forEach(X=>{let Z=H(X,Ge[X._cat],!1,X._cat);v.appendChild(Z)});return}Object.entries(tt).forEach(([j,te])=>{let X=yt[j],Z=document.createElement("div"),ee=document.createElement("div");ee.id=`cat-anchor-${j}`,ee.className="cw-links-cat-header",ee.style.setProperty("--cat-color",X.color),ee.innerHTML=`<div class="cw-links-cat-dot"></div>${te.label}`,Z.appendChild(ee);let Q=document.createElement("div");Q.className="cw-links-cat-grid",te.links.forEach(ae=>{let K=H(ae,Ge[j],!1,j);Q.appendChild(K)}),Z.appendChild(Q),v.appendChild(Z)});let D=document.createElement("div");D.className="cw-links-spacer",v.appendChild(D)}function H(D,j,te,X){let Z=document.createElement("div");Z.className="cw-links-card";let ee=yt[X]||yt.history;Z.style.setProperty("--cat-color",ee.color),Z.style.setProperty("--cat-bg",ee.bg);let Q=document.createElement("div");Q.className="cw-links-icon-box",Q.innerHTML=j||Ge.tasks;let ae=document.createElement("div");ae.className="cw-links-card-meta";let K=document.createElement("div");K.className="cw-links-card-title",K.textContent=D.name;let oe=document.createElement("div");oe.className="cw-links-card-desc",oe.textContent=D.desc,ae.appendChild(K),ae.appendChild(oe);let k=document.createElement("div");return k.className="cw-links-copy-btn",k.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',k.title="Copiar URL",Z.onclick=()=>{!te&&X&&qo(D,X),window.open(D.url,"_blank")},k.onclick=P=>{P.stopPropagation(),navigator.clipboard.writeText(D.url).then(()=>{$.playClick(),!te&&X&&qo(D,X),V("Link copiado!")}).catch(()=>{V("N\xE3o foi poss\xEDvel copiar o link.",{error:!0})})},Z.appendChild(Q),Z.appendChild(ae),Z.appendChild(k),Z}g.addEventListener("input",D=>{e=D.target.value,R()});function _(){o=!o,be(o,i,"cw-btn-links")}return document.body.appendChild(i),W(),R(),_}var ze=[];function Mt(t){ze=t}var va=60*1e3,zt={critical:{icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function wa(){if(document.getElementById("cw-broadcast-styles"))return;let t=document.createElement("style");t.id="cw-broadcast-styles",t.textContent=`
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
            overflow: hidden; transition: all 0.3s ease; position: relative; width: 100%; box-sizing: border-box; flex-shrink: 0;
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
            transition: all 0.2s ease; margin-left: 12px;
        }
        .cw-bc-dismiss-btn:hover { color: #1e8e3e; background: #e6f4ea; border-color: #1e8e3e; }

        .cw-card-actions { display: flex; justify-content: flex-end; gap: 12px; padding: 12px 20px; background: #F8F9FA; border-top: 1px solid #F1F3F4; }
        .cw-action-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1px solid transparent; background: transparent; transition: all 0.2s; }
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
            transform: translateY(100%); transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
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
            font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; position: relative; color: #5F6368;
        }
        .cw-radio-option:hover { background: #F8F9FA; }
        .cw-radio-option input { position: absolute; opacity: 0; }
        .cw-radio-option.info.checked { background: #E8F0FE; color: #1967D2; border-color: #1967D2; }
        .cw-radio-option.critical.checked { background: #FEE2E2; color: #B91C1C; border-color: #EF4444; }
        .cw-radio-option.success.checked { background: #DCFCE7; color: #15803D; border-color: #22C55E; }

        .cw-bc-btn-secondary { padding: 10px 20px; background: white; border: 1px solid #dadce0; color: #5f6368; border-radius: 24px; font-weight: 600; font-size: 13px; }
        .cw-bc-btn-primary { padding: 10px 24px; background: #1a73e8; color: white; border: none; border-radius: 24px; font-weight: 600; box-shadow: 0 4px 12px rgba(26,115,232,0.3); font-size: 13px; }
        .cw-bc-editor-close { background: none; border: none; color: #5f6368; padding: 8px; }
    `,document.head.appendChild(t)}function Rt(t){if(!t)return"";try{let e=new Date(t);return isNaN(e.getTime())?String(t):e.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(t)}}function Bt(t){if(!t||typeof t!="string")return"";let e=t;return e=e.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" class="cw-bc-link">$1</a>'),e=e.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),e=e.replace(/_(.*?)_/g,"<i>$1</i>"),e=e.replace(/\n/g,"<br>"),e=no(e),e}function Sa(t){let e=[],o=(t||"").split(`
`),a=/\d{1,2}\/\d{1,2}/,n="\u{1F4C5}";if(o.forEach(i=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(i)?n="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(i)&&(n="\u{1F1EA}\u{1F1F8}");let l=i.match(a);if(l){let s=l[0],c=n;/🇧🇷|🇵🇹|PT|BR/i.test(i)?c="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(i)&&(c="\u{1F1EA}\u{1F1F8}"),e.some(m=>m.flag===c&&m.date===s)||e.push({flag:c,date:s})}}),e.length===0){let i=(t||"").match(/\d{1,2}\/\d{1,2}/g);i&&[...new Set(i)].forEach(l=>e.push({flag:"\u{1F4C5}",date:l}))}return e}function No(){let t="v4.9",e=!1,o=null,a=null,n="",i=!1,l=!1,s=null,c=0;wa();let p=document.createElement("div");p.id="broadcast-popup",p.classList.add("cw-module-window"),Object.assign(p.style,ye,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let m={popup:p,googleLine:null};function f(){if(e=!e,be(e,p,"cw-btn-broadcast"),e){let k=document.getElementById("cw-btn-broadcast");k&&k.classList.remove("has-new"),_()}}let h=ge(p,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",m,()=>f()),w=h.querySelector(".cw-header-actions")||h.lastElementChild,g=null;function v(){let k=null;try{k=fe()}catch{console.warn("TechSol: Auth Pending")}if(k){if(s=k.split("@")[0].toLowerCase(),l=ut.includes(s),l&&w&&!w.querySelector("#cw-admin-btn")){let P=document.createElement("div");P.id="cw-admin-btn",P.className="cw-btn-interactive",P.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(P.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),P.title="Novo Aviso",P.onclick=r=>{r.stopPropagation(),J()},w.insertBefore(P,w.firstChild),g||W(),Z()}}else c<5&&(c++,setTimeout(v,2e3))}if(w){let k=document.createElement("button");k.textContent="Limpar",k.className="cw-btn-interactive",Object.assign(k.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),k.onclick=P=>{P.stopPropagation(),$.playSuccess();let r=ze.map(u=>u.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(r)),Z(),D()},w.insertBefore(k,w.firstChild)}p.appendChild(h);let E=document.createElement("div");E.className="cw-bc-search-wrap";let N=document.createElement("div");N.className="cw-bc-search-icon",N.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';let F=document.createElement("input");F.className="cw-bc-search-input no-drag",F.type="text",F.placeholder="Buscar avisos...";let q=document.createElement("div");q.className="cw-bc-search-clear cw-btn-interactive",q.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',E.append(N,F,q),p.appendChild(E),F.addEventListener("input",k=>{n=k.target.value,q.classList.toggle("visible",n.length>0),Z()}),q.onclick=()=>{F.value="",n="",q.classList.remove("visible"),Z(),F.focus()};let z=document.createElement("div");z.id="cw-update-status",z.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",p.appendChild(z);function W(){g=document.createElement("div"),g.className="cw-editor-overlay",g.innerHTML=`
        <div class="cw-bc-editor-body">
            <div class="cw-bc-editor-head">
                <span id="cw-editor-title-label" class="cw-bc-editor-title">Novo Aviso</span>
                <button id="cw-bc-close-x" class="cw-btn-interactive cw-bc-editor-close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>

            <div class="cw-bc-editor-field">
                <label class="cw-bc-field-label">TIPO DO COMUNICADO</label>
                <div class="cw-radio-group">
                    <div class="cw-radio-option info" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="info" checked> \u2139\uFE0F Info
                    </div>
                    <div class="cw-radio-option critical" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="critical"> \u{1F6A8} Alerta
                    </div>
                    <div class="cw-radio-option success" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="success"> \u2705 Sucesso
                    </div>
                </div>
            </div>

            <div class="cw-bc-editor-field">
                 <label class="cw-bc-field-label">T\xCDTULO</label>
                 <input id="cw-bc-title" class="cw-hd-input" placeholder="Resumo do assunto">
            </div>

            <div class="cw-bc-editor-field">
                 <label class="cw-bc-field-label">MENSAGEM</label>
                 <textarea id="cw-bc-text" class="cw-hd-input" placeholder="Escreva os detalhes aqui... Suporta HTML e Emojis :)" style="height:160px; resize:none; line-height:1.6;"></textarea>
            </div>
        </div>

        <div class="cw-bc-editor-foot">
            <button id="cw-bc-cancel" class="cw-btn-interactive cw-bc-btn-secondary">Cancelar</button>
            <button id="cw-bc-send" class="cw-btn-interactive cw-bc-btn-primary">Publicar</button>
        </div>
      `,g.querySelectorAll('input[name="cw-bc-type"]').forEach(u=>{u.addEventListener("change",()=>{g.querySelectorAll(".cw-radio-option").forEach(x=>x.classList.remove("checked")),u.parentElement.classList.add("checked")})}),setTimeout(()=>{let u=g.querySelector(".cw-radio-option.info");u&&u.classList.add("checked")},100);let k=g.querySelector("#cw-bc-cancel"),P=g.querySelector("#cw-bc-close-x"),r=g.querySelector("#cw-bc-send");k.onclick=L,P.onclick=L,r.onclick=I,p.appendChild(g)}function J(k=null){if(!g)return;let P=g.querySelector("#cw-editor-title-label"),r=g.querySelector("#cw-bc-title"),u=g.querySelector("#cw-bc-text"),x=g.querySelector("#cw-bc-send");if(k){a=k.id,P.textContent="Editar Aviso",r.value=k.title||"",u.value=k.text||"",x.textContent="Salvar Altera\xE7\xF5es";let b=k.type||"info",y=g.querySelector(`input[name="cw-bc-type"][value="${b}"]`);y&&y.click()}else{a=null,P.textContent="Novo Aviso",r.value="",u.value="",x.textContent="Publicar";let b=g.querySelector('input[name="cw-bc-type"][value="info"]');b&&b.click()}g.classList.add("active"),setTimeout(()=>r.focus(),300)}function L(){g&&g.classList.remove("active"),a=null}async function I(){let k=g.querySelector("#cw-bc-send"),P=g.querySelector("#cw-bc-title"),r=g.querySelector("#cw-bc-text"),u=g.querySelector('input[name="cw-bc-type"]:checked'),x=u?u.value:"info";if(!P.value.trim()||!r.value.trim()){V("Preencha todos os campos!",{error:!0});return}k.textContent="Salvando...",k.style.opacity="0.7";let b=!1;a?b=await de.updateBroadcast(a,{title:P.value,text:r.value,type:x}):b=await de.sendBroadcast({title:P.value,text:r.value,type:x,author:s||"admin"}),b?(V(a?"Atualizado!":"Publicado!"),$.playSuccess(),L(),setTimeout(()=>_(),1500)):(V("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),k.textContent=a?"Salvar Altera\xE7\xF5es":"Publicar",k.style.opacity="1")}async function R(k){if(await ve("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await de.deleteBroadcast(k)){V("Aviso removido."),$.playClick();let u=ze.findIndex(x=>x.id===k);u>-1&&ze.splice(u,1),Z(),setTimeout(()=>_(),1500)}else V("Erro ao excluir.",{error:!0})}let H=document.createElement("div");H.className="cw-nice-scroll cw-bc-feed",p.appendChild(H);async function _(){e&&(z.style.display="block",z.innerHTML="\u{1F504} Sincronizando...");try{let k=await de.fetchData();k&&k.broadcast&&(Mt(k.broadcast),D(),e&&(Z(),z.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{z.style.display="none"},1500)))}catch{e&&(z.innerHTML="\u26A0\uFE0F Offline")}}function D(){let k=document.getElementById("cw-btn-broadcast");if(!k)return;let P=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(ze.some(u=>!P.includes(u.id))){if(k.classList.add("has-new"),!k.querySelector(".cw-badge")){let u=document.createElement("div");u.className="cw-badge",Object.assign(u.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),k.appendChild(u)}}else{k.classList.remove("has-new");let u=k.querySelector(".cw-badge");u&&u.remove()}}function j(k,P){return P?`${k.title||""} ${k.text||""}`.toLowerCase().includes(P):!0}function te(k){let P=p.querySelector("#cw-bau-widget");P&&P.remove();let r=document.createElement("div");r.id="cw-bau-widget",r.className="cw-bc-bau";let u=Sa(k.text),x="",b='<button id="cw-bau-toggle-btn" class="cw-btn-interactive cw-bc-bau-toggle-btn">Detalhes</button>';l&&(b=`
            <button class="cw-bau-edit cw-btn-interactive cw-bc-bau-edit-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            ${b}
          `),u.length>0?x=`
              <div class="cw-bc-bau-slots">
                  <div class="cw-bc-bau-slots-row">${u.map(M=>`
              <div class="cw-bc-bau-slot">
                  <span class="cw-bc-bau-flag">${M.flag}</span>
                  <span class="cw-bc-bau-date">${M.date}</span>
              </div>
          `).join("")}</div>
                  <div class="cw-bc-bau-actions">${b}</div>
              </div>
              <div id="cw-bau-full" class="cw-bc-bau-full">${Bt(k.text)}</div>
          `:x=`
            <div class="cw-bc-bau-plain">
                <div class="cw-bc-bau-plain-text">${Bt(k.text)}</div>
                ${l?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive cw-bc-bau-edit-btn compact">\u270F\uFE0F</button></div>':""}
            </div>
          `;let y=[...new Set(u.map(T=>T.flag))].join(""),S=u.length>0?`${y} \xB7 ${u.length} ${u.length>1?"datas":"data"}`:"Ver detalhes";r.className="cw-bc-bau"+(i?" expanded":""),r.innerHTML=`
          <div class="cw-bc-bau-header cw-btn-interactive">
              <div class="cw-bc-live-indicator">
                  <div class="cw-bc-pulse-dot"></div>
                  <span class="cw-bc-bau-label">Disponibilidade BAU</span>
              </div>
              <div class="cw-bc-bau-right">
                  <span class="cw-bc-bau-hint">${S}</span>
                  <span class="cw-bc-bau-timestamp">${Rt(k.date)}</span>
                  <svg class="cw-bc-bau-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
          </div>
          <div class="cw-bc-bau-detail">${x}</div>
      `,z.after(r);let C=r.querySelector(".cw-bc-bau-header");C.onclick=()=>{i=!i,r.classList.toggle("expanded",i),$.playClick()};let d=r.querySelector("#cw-bau-toggle-btn"),A=r.querySelector("#cw-bau-full");if(d&&A&&(d.onclick=T=>{T.stopPropagation();let M=A.style.display==="none"||!A.style.display;A.style.display=M?"block":"none",d.textContent=M?"Ocultar":"Detalhes"}),l){let T=r.querySelector(".cw-bau-edit");T&&(T.onclick=M=>{M.stopPropagation(),J(k)})}}function X(k,P,r){let u=k.sort((S,C)=>{let d=P.includes(S.id),A=P.includes(C.id);return d===A?0:d?1:-1}),x=n.trim().length>0;if(u.length===0&&!r){let S=document.createElement("div");S.className="cw-bc-empty",S.innerHTML=x?'<div style="font-weight:500;">Nada encontrado.</div>':`
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                <div style="font-weight:500;">Tudo lido!</div>
               `,H.appendChild(S);return}let b=u.filter(S=>!P.includes(S.id)),y=u.filter(S=>P.includes(S.id));if(b.forEach(S=>H.appendChild(ee(S,!1))),y.length>0){let S=document.createElement("div");S.className="cw-bc-history-divider",S.innerHTML=`<span>Hist\xF3rico (${y.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let C=document.createElement("div");C.className="cw-bc-history-container",y.forEach(A=>C.appendChild(ee(A,!0)));let d=!1;S.onclick=()=>{$.playClick(),d=!d,C.style.display=d?"flex":"none",S.querySelector("svg").style.transform=d?"rotate(180deg)":"rotate(0deg)"},H.appendChild(S),H.appendChild(C)}}function Z(){H.innerHTML="";let k=p.querySelector("#cw-bau-widget");k&&k.remove();let P=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),r=[...ze].sort((S,C)=>{let d=new Date(S.date).getTime()||0;return(new Date(C.date).getTime()||0)-d}),u=r.findIndex(S=>S.title&&S.title.toLowerCase().includes("disponibilidade bau")),x=!1;if(u!==-1){let S=r[u];r.splice(u,1),te(S),x=!0}let b=n.trim().toLowerCase(),y=r.filter(S=>j(S,b));X(y,P,x)}function ee(k,P){let r=document.createElement("div");r.className="cw-bc-card"+(P?" history":"");let u=zt[k.type]||zt.info,x=document.createElement("div");x.className="cw-bc-card-head";let b=document.createElement("div");b.className="cw-bc-type-tag "+(zt[k.type]?k.type:"info"),b.innerHTML=`${u.icon} <span>${k.type}</span>`;let y=document.createElement("span");if(y.className="cw-bc-date-tag",y.textContent=Rt(k.date),x.appendChild(b),P)x.appendChild(y);else{let T=document.createElement("button");T.className="cw-btn-interactive cw-bc-dismiss-btn",T.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',T.onclick=M=>{M.stopPropagation(),$.playClick(),r.style.transform="translateX(20px)",r.style.opacity="0",setTimeout(()=>{let O=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");O.push(k.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(O)),Z(),D()},200)},x.appendChild(T)}let S=document.createElement("div");S.className="cw-bc-card-content";let C=document.createElement("div");C.className="cw-bc-msg-title",C.textContent=k.title;let d=document.createElement("div");d.className="cw-bc-msg-body",d.innerHTML=Bt(k.text);let A=document.createElement("div");if(A.className="cw-bc-msg-meta",A.innerHTML=`Publicado por <b>${k.author||"Sistema"}</b>`,P||(A.innerHTML+=` \u2022 ${Rt(k.date)}`),S.appendChild(C),S.appendChild(d),S.appendChild(A),r.appendChild(x),r.appendChild(S),l){let T=document.createElement("div");T.className="cw-card-actions";let M=document.createElement("button");M.className="cw-action-btn edit",M.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',M.onclick=()=>J(k);let O=document.createElement("button");O.className="cw-action-btn delete",O.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',O.onclick=()=>R(k.id),T.appendChild(M),T.appendChild(O),r.appendChild(T)}return r}let Q=de.getCachedBroadcasts();Q.length>0&&(Mt(Q),Z()),setTimeout(v,500),_(),o||(o=setInterval(_,va));let ae=document.createElement("div");Object.assign(ae.style,qe),ae.className="no-drag",p.appendChild(ae),Oe(p,ae),document.body.appendChild(p);let K=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),oe=ze.some(k=>!K.includes(k.id));return{toggle:f,hasUnread:oe}}function _o(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},a=document.createElement("div");Object.assign(a.style,o.overlay);let n=document.createElement("div");Object.assign(n.style,o.card);let i=document.createElement("div");Object.assign(i.style,o.icon);let l=document.createElement("div");Object.assign(l.style,o.title);let s=document.createElement("div");Object.assign(s.style,o.text);let c=document.createElement("div");Object.assign(c.style,o.dotsContainer);let p=document.createElement("div");Object.assign(p.style,o.btnContainer);let m=document.createElement("button");m.textContent="Pular",Object.assign(m.style,o.btn,o.btnSkip),m.onmouseover=()=>m.style.color="#202124",m.onmouseout=()=>m.style.color="#5f6368";let f=document.createElement("button");f.textContent="Pr\xF3ximo",Object.assign(f.style,o.btn,o.btnNext),f.onmouseover=()=>f.style.transform="scale(1.05)",f.onmouseout=()=>f.style.transform="scale(1)",p.appendChild(m),p.appendChild(f),n.appendChild(i),n.appendChild(l),n.appendChild(s),n.appendChild(c),n.appendChild(p),a.appendChild(n),document.body.appendChild(a);function h(g){let v=t[g];i.textContent=v.icon,l.textContent=v.title,s.textContent=v.text,c.innerHTML="",t.forEach((E,N)=>{let F=document.createElement("div");Object.assign(F.style,o.dot),N===g&&Object.assign(F.style,o.dotActive),c.appendChild(F)}),v.isLast?(m.style.display="none",f.textContent="Come\xE7ar \u{1F680}",f.style.width="100%"):(m.style.display="block",f.textContent="Pr\xF3ximo",f.style.width="auto")}function w(){localStorage.setItem("cw_onboarding_seen_v1","true"),a.style.opacity="0",n.style.transform="translateY(20px)",setTimeout(()=>a.remove(),400),$.playSuccess(),V("Tudo pronto! Use o menu flutuante.")}f.onclick=()=>{$.playClick(),e<t.length-1?(e++,h(e)):w()},m.onclick=async()=>{await ve("Pular o tutorial?")&&w()},h(0),requestAnimationFrame(()=>{a.style.opacity="1",n.style.transform="translateY(0)"})}var Do={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function Mo(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&Ca(t)}function Ca(t){let e=Do.slides,o=0,a={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,a.overlay);let i=document.createElement("div");Object.assign(i.style,a.card);let l=document.createElement("div");Object.assign(l.style,a.badge),l.textContent=`Atualiza\xE7\xE3o ${t}`;let s=document.createElement("div");Object.assign(s.style,a.icon);let c=document.createElement("div");Object.assign(c.style,a.title);let p=document.createElement("div");Object.assign(p.style,a.text);let m=document.createElement("div");Object.assign(m.style,a.dotsContainer);let f=document.createElement("button");Object.assign(f.style,a.btn),f.onmouseover=()=>f.style.transform="scale(1.02)",f.onmouseout=()=>f.style.transform="scale(1)",i.appendChild(l),i.appendChild(s),i.appendChild(c),i.appendChild(p),i.appendChild(m),i.appendChild(f),n.appendChild(i),document.body.appendChild(n);function h(g){let v=e[g];s.textContent=v.icon,c.textContent=v.title,p.textContent=v.text,m.innerHTML="",e.forEach((E,N)=>{let F=document.createElement("div");Object.assign(F.style,a.dot),N===g&&Object.assign(F.style,a.dotActive),m.appendChild(F)}),g===e.length-1?f.textContent="Entendi, vamos l\xE1! \u{1F44D}":f.textContent="Pr\xF3ximo"}function w(){localStorage.setItem("cw_last_version",t),n.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>n.remove(),400),$.playSuccess(),V(`TechSol atualizado para ${t}!`)}f.onclick=()=>{$.playClick(),o<e.length-1?(o++,h(o)):w()},h(0),requestAnimationFrame(()=>{n.style.opacity="1",i.style.transform="translateY(0)"})}var zo="cw_timezone_pinned",$t=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],Ea=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function Ro(){let t="v2.2 Pro",e=!1,o=null,a="mx",n=JSON.parse(localStorage.getItem(zo)||"[]"),i="",l="all",s=new Date;s.setHours(14,0,0,0);let c={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},p={container:{display:"flex",flexDirection:"column",height:"100%",background:c.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:c.surface,borderBottom:`1px solid ${c.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:c.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:c.primary,borderBottomColor:c.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:c.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:c.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${c.border}`,background:c.surface,color:c.textSub,transition:"all 0.2s"},chipActive:{background:c.primaryBg,color:c.primary,borderColor:c.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:c.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${c.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:c.surface,border:`1px solid ${c.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:c.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},m=document.createElement("div");m.id="timezone-popup",m.classList.add("cw-module-window"),Object.assign(m.style,ye,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let h=ge(m,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:m},()=>Z());m.appendChild(h);let w=document.createElement("div");Object.assign(w.style,p.container),m.appendChild(w);let g=document.createElement("div");Object.assign(g.style,p.tabHeader);let v=document.createElement("div");v.textContent="Monitoramento",Object.assign(v.style,p.tabBtn,p.tabActive);let E=document.createElement("div");E.textContent="Planejador",Object.assign(E.style,p.tabBtn),g.appendChild(v),g.appendChild(E),w.appendChild(g);let N=document.createElement("div");Object.assign(N.style,p.toolbar);let F=document.createElement("div");Object.assign(F.style,p.searchInputWrapper);let q=document.createElement("div");q.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(q.style,p.searchIcon);let z=document.createElement("input");z.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(z.style,p.searchInput),z.onfocus=()=>{z.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",z.style.borderColor="rgba(26,115,232,0.3)"},z.onblur=()=>{z.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",z.style.borderColor="transparent"},z.oninput=ee=>{i=ee.target.value.toLowerCase(),D()},F.appendChild(q),F.appendChild(z),N.appendChild(F);let W=document.createElement("div");Object.assign(W.style,p.chipsRow),Ea.forEach(ee=>{let Q=document.createElement("div");Q.textContent=ee.label,Q.id=`tz-filter-${ee.id}`,Object.assign(Q.style,p.chip),ee.id===l&&Object.assign(Q.style,p.chipActive),Q.onclick=()=>{$.playClick(),l=ee.id,Array.from(W.children).forEach(ae=>{Object.assign(ae.style,p.chip)}),Object.assign(Q.style,p.chipActive),D()},W.appendChild(Q)}),N.appendChild(W),w.appendChild(N);let J=document.createElement("div");Object.assign(J.style,p.listContainer);let L=document.createElement("style");L.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",w.appendChild(L);let I=document.createElement("div");Object.assign(I.style,p.plannerWrapper,{display:"none"}),w.appendChild(J),w.appendChild(I),v.onclick=()=>R("live"),E.onclick=()=>R("plan");function R(ee){$.playClick(),ee==="live"?(Object.assign(v.style,p.tabActive),Object.assign(E.style,p.tabBtn),E.style.borderBottomColor="transparent",J.style.display="flex",N.style.display="flex",I.style.display="none",te()):(Object.assign(E.style,p.tabActive),Object.assign(v.style,p.tabBtn),v.style.borderBottomColor="transparent",I.style.display="flex",J.style.display="none",N.style.display="none",X(),j())}function H(ee){return ee>=9&&ee<17?{color:c.success,bg:c.successBg,label:"Aberto",icon:"\u{1F7E2}"}:ee>=8&&ee<9?{color:c.warning,bg:c.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:ee>=17&&ee<19?{color:c.warning,bg:c.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:c.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function _(ee){n.includes(ee)?n=n.filter(Q=>Q!==ee):n.push(ee),localStorage.setItem(zo,JSON.stringify(n)),D(),$.playClick()}function D(){J.innerHTML="";let ee=new Date,Q=$t.filter(K=>{let oe=K.name.toLowerCase().includes(i)||K.label.toLowerCase().includes(i),k=l==="all"||K.region===l;return oe&&k});if(Q.sort((K,oe)=>{let k=n.includes(K.id),P=n.includes(oe.id);return k&&!P?-1:!k&&P?1:K.name.localeCompare(oe.name)}),Q.length===0){J.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}Q.forEach(K=>{let oe=n.includes(K.id),k=ee.toLocaleTimeString("pt-BR",{timeZone:K.zone,hour:"2-digit",minute:"2-digit"}),P=parseInt(k.split(":")[0]),r=H(P),u=P<6||P>18,x=document.createElement("div");Object.assign(x.style,p.hubCard),oe&&Object.assign(x.style,p.hubCardPinned);let b=oe?"\u2605":"\u2606",y=oe?"#F9AB00":"#DADCE0";x.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${y}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${b}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${K.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${c.text}; letter-spacing:-0.2px;">${K.name}</div>
                        <div style="font-size:12px; color:${c.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${u?"\u{1F319}":"\u2600\uFE0F"} ${K.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${c.text}; font-family:'Google Sans', sans-serif;">${k}</div>
                    <div style="font-size:11px; font-weight:600; color:${r.color}; background:${r.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${r.label}
                    </div>
                </div>
            `,x.onmouseenter=()=>{x.style.transform="translateY(-2px)",x.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},x.onmouseleave=()=>{x.style.transform="translateY(0)",x.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let S=x.querySelector(".cw-pin-btn");S.onmouseenter=()=>{S.style.backgroundColor="#F1F3F4"},S.onmouseleave=()=>{S.style.backgroundColor="transparent"},S.onclick=C=>{C.stopPropagation(),_(K.id)},x.onclick=()=>{a=K.id,R("plan")},J.appendChild(x)});let ae=document.createElement("div");ae.style.height="20px",ae.style.width="100%",J.appendChild(ae)}function j(){I.innerHTML="";let ee=document.createElement("div"),Q=document.createElement("label");Q.textContent="Onde est\xE1 o cliente?",Q.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let ae=document.createElement("select");Object.assign(ae.style,to),ae.style.padding="14px",[...$t].sort((Y,U)=>Y.name.localeCompare(U.name)).forEach(Y=>{let U=document.createElement("option");U.value=Y.id,U.textContent=`${Y.flag} ${Y.name} (${Y.zone})`,Y.id===a&&(U.selected=!0),ae.appendChild(U)}),ae.onchange=Y=>{a=Y.target.value,O(),$.playClick()},ee.appendChild(Q),ee.appendChild(ae),I.appendChild(ee);let oe=document.createElement("div");Object.assign(oe.style,p.timeComparisonRow);let k=document.createElement("div");Object.assign(k.style,p.timeCard),k.style.backgroundColor="#F8FAFF",k.style.borderColor="#E8F0FE",k.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let P=document.createElement("div");Object.assign(P.style,p.timeCard),P.style.backgroundColor="#FFF8E1",P.style.borderColor="#FEF7E0",P.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,oe.appendChild(k),oe.appendChild(P),I.appendChild(oe);let r=document.createElement("div");r.id="cw-planner-status",Object.assign(r.style,p.statusBadge),I.appendChild(r);let u=document.createElement("div");Object.assign(u.style,{padding:"0 4px",marginTop:"12px"});let x=document.createElement("div");x.textContent="Arraste para simular o hor\xE1rio:",x.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let b=document.createElement("div");Object.assign(b.style,p.timelineContainer);let y=document.createElement("div");Object.assign(y.style,p.timelineTrack);let S=document.createElement("div");Object.assign(S.style,p.dayZone),y.appendChild(S);let C=document.createElement("input");C.type="range",C.min="0",C.max="1439",C.step="15",C.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let d=document.createElement("div");d.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",d.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",b.appendChild(y),b.appendChild(C),b.appendChild(d),u.appendChild(x),u.appendChild(b),I.appendChild(u);let A=k.querySelector("#cw-time-input-br"),T=P.querySelector("#cw-time-display-client"),M=P.querySelector("#cw-client-label");function O(){let Y=$t.find(ot=>ot.id===a);M.textContent=`${Y.flag} ${Y.label} (${Y.zone})`;let U=s.getHours(),se=s.getMinutes(),pe=`${String(U).padStart(2,"0")}:${String(se).padStart(2,"0")}`;A.value=pe,C.value=U*60+se;let Ee=s.toLocaleTimeString("pt-BR",{timeZone:Y.zone,hour:"2-digit",minute:"2-digit"});T.textContent=Ee;let Ae=parseInt(Ee.split(":")[0]);Ae>=9&&Ae<17?(r.style.background=c.successBg,r.style.color=c.success,r.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):Ae>=8&&Ae<9||Ae>=17&&Ae<19?(r.style.background=c.warningBg,r.style.color=c.warning,r.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(r.style.background=c.errorBg,r.style.color=c.error,r.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}C.oninput=Y=>{let U=parseInt(Y.target.value);s.setHours(Math.floor(U/60)),s.setMinutes(U%60),O()},A.oninput=Y=>{let[U,se]=Y.target.value.split(":");U&&se&&(s.setHours(parseInt(U)),s.setMinutes(parseInt(se)),O())},O()}function te(){D(),o||(o=setInterval(D,6e4))}function X(){o&&(clearInterval(o),o=null)}function Z(){e=!e,be(e,m,"cw-btn-timezone"),e?R("live"):X()}return document.body.appendChild(m),Z}var he={tabs:{general:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>',email:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'},search:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',clear:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',copy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',more:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="12" cy="19" r="1.8"></circle></svg>',edit:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',delete:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',add:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',back:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',bold:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',italic:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',code:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',image:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',media:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',empty:'<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>'},Bo=[{id:"general",label:"Geral",icon:he.tabs.general},{id:"note",label:"Notas",icon:he.tabs.note},{id:"email",label:"Emails",icon:he.tabs.email}];function Aa(){if(document.getElementById("cw-lib-styles-v2"))return;let t=document.createElement("style");t.id="cw-lib-styles-v2",t.textContent=`
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
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
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
            transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.35s ease;
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
        .cw-lib-card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(60,64,67,0.14); border-color: rgba(255,255,255,0.9); }
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
            transform: translateY(100%); transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
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
            transition: all 0.15s ease;
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
    `,document.head.appendChild(t)}function $o(){let t="v2.0",e=!1,o="general",a="",n=null,i=null;Aa();let l=document.createElement("div");l.id="library-popup",l.classList.add("cw-module-window"),Object.assign(l.style,ye,{right:"auto",left:"50%",width:"620px",height:"680px",maxHeight:"90vh",transform:"translateX(-50%) scale(0.05)"});let c=ge(l,"Minha Biblioteca",t,"Gerencie seus snippets, textos e templates.",{popup:l},()=>P());l.appendChild(c);let p=document.createElement("div");p.className="cw-lib-container",l.appendChild(p);let m=document.createElement("div");m.className="cw-lib-toolbar";let f=document.createElement("div");f.className="cw-lib-search-wrap";let h=document.createElement("div");h.className="cw-lib-search-icon",h.innerHTML=he.search;let w=document.createElement("input");w.className="cw-lib-search no-drag",w.placeholder="Buscar por t\xEDtulo ou conte\xFAdo...",w.type="text";let g=document.createElement("div");g.className="cw-lib-search-clear cw-tactile",g.innerHTML=he.clear,f.append(h,w,g);let v=document.createElement("div");v.className="cw-lib-tabs",Bo.forEach(r=>{let u=document.createElement("div");u.className="cw-lib-tab"+(r.id===o?" active":""),u.id=`lib-tab-${r.id}`,u.innerHTML=`${r.icon}<span>${r.label}</span>`,u.onmouseenter=()=>$.playHover(),u.onclick=()=>D(r.id),v.appendChild(u)}),m.append(f,v),p.appendChild(m);let E=document.createElement("div");E.className="cw-lib-grid",p.appendChild(E);let N=document.createElement("div");N.className="cw-lib-fab cw-tactile",N.title="Novo item",N.innerHTML=he.add,N.onclick=()=>Q(),p.appendChild(N);let F=document.createElement("div");F.className="cw-lib-sheet";let q=document.createElement("div");q.className="cw-lib-sheet-handle";let z=document.createElement("div");z.className="cw-lib-sheet-head";let W=document.createElement("div");W.className="cw-lib-sheet-back no-drag",W.innerHTML=he.back,W.title="Cancelar",W.onclick=ae;let J=document.createElement("span");J.className="cw-lib-sheet-title",J.textContent="Novo Item",z.append(W,J);let L=document.createElement("div");L.className="cw-lib-sheet-body";let I=document.createElement("div");I.className="cw-lib-sheet-foot";let R=document.createElement("button");R.className="cw-lib-save-btn no-drag",R.textContent="Salvar",R.onclick=K,I.appendChild(R);let H=document.createElement("div");H.className="cw-lib-loading",H.innerHTML='<div class="cw-lib-spinner"></div><div class="cw-lib-loading-text">Salvando...</div>',F.append(q,z,L,I,H),p.appendChild(F);let _=document.createElement("div");Object.assign(_.style,qe),_.className="no-drag",l.appendChild(_),Oe(l,_),document.body.appendChild(l),document.addEventListener("mousedown",r=>{i&&!i.contains(r.target)&&j()});function D(r){$.playClick(),o=r,Bo.forEach(u=>{document.getElementById(`lib-tab-${u.id}`).classList.toggle("active",u.id===r)}),X()}function j(){if(i){let r=i.querySelector(".cw-lib-menu");r&&r.classList.remove("open"),i.classList.remove("menu-open"),i=null}}function te(r,u){return u?`${r.title} ${r.content}`.toLowerCase().includes(u):!0}function X(){j(),E.innerHTML="";let r=a.trim().toLowerCase(),u=Se.getSnippets(o).filter(x=>te(x,r));if(u.length===0){let x=document.createElement("div");x.className="cw-lib-empty";let b=r.length>0;x.innerHTML=`
                <div style="opacity:0.5;">${he.empty}</div>
                <div class="cw-lib-empty-title">${b?"Nada encontrado":"Nada aqui ainda"}</div>
                <div class="cw-lib-empty-sub">${b?`Nenhum item bate com "${a.trim()}" nesta aba.`:"Clique no + para come\xE7ar sua cole\xE7\xE3o."}</div>
            `,E.appendChild(x);return}u.forEach(x=>E.appendChild(Z(x)))}function Z(r){let u=document.createElement("div");u.className="cw-lib-card"+(r.isCode?" is-code":"");let x=r.content,b="";if(r.isRich){let d=document.createElement("div");d.innerHTML=r.content;let A=!!d.querySelector("img");x=d.innerText.substring(0,200),A&&(b=`<span class="cw-lib-media-tag">${he.media} M\xEDdia</span>`)}let y=[r.isCode?'<span class="cw-lib-badge code">CODE</span>':"",o==="email"?'<span class="cw-lib-badge template">TEMPLATE</span>':""].join("");u.innerHTML=`
            <div class="cw-lib-card-head">
                <div class="cw-lib-card-title">${k(r.title)}</div>
                <div class="cw-lib-card-badges">${y}</div>
            </div>
            ${b}
            <div class="cw-lib-card-preview${r.isCode?" code":""}">${k(x)}</div>
            <div class="cw-lib-card-foot">
                <div class="cw-lib-icon-btn cw-act-copy cw-tactile" title="Copiar">${he.copy}</div>
                <div class="cw-lib-icon-btn cw-act-more cw-tactile" title="Mais a\xE7\xF5es">${he.more}</div>
                <div class="cw-lib-menu">
                    <div class="cw-lib-menu-item cw-act-edit">${he.edit} Editar</div>
                    <div class="cw-lib-menu-item danger cw-act-del">${he.delete} Excluir</div>
                </div>
            </div>
        `,u.querySelector(".cw-act-copy").onclick=d=>{d.stopPropagation(),$.playClick(),ee(r)};let S=u.querySelector(".cw-act-more"),C=u.querySelector(".cw-lib-menu");return S.onclick=d=>{d.stopPropagation(),$.playClick();let A=C.classList.contains("open");j(),A||(C.classList.add("open"),u.classList.add("menu-open"),i=u)},u.querySelector(".cw-act-edit").onclick=d=>{d.stopPropagation(),$.playClick(),j(),Q(r)},u.querySelector(".cw-act-del").onclick=async d=>{d.stopPropagation(),$.playClick(),j(),await ve(`Excluir "${r.title}"?`)&&(Se.delete(r.id),X(),V("Item exclu\xEDdo."))},u}function ee(r){if(r.isRich){let u=new Blob([r.content],{type:"text/html"}),x=document.createElement("div");x.innerHTML=r.content;let b=new Blob([x.innerText],{type:"text/plain"});navigator.clipboard.write([new ClipboardItem({"text/html":u,"text/plain":b})])}else navigator.clipboard.writeText(r.content);V("Copiado!")}function Q(r=null){n=r?r.id:null,L.innerHTML="",L.appendChild(oe("title","T\xEDtulo / Nome",r?r.title:"")),o==="email"&&L.appendChild(oe("subject","Assunto do Email",r?r.subject:""));let u="Conte\xFAdo";o==="email"&&(u="Corpo do Email (HTML)"),o==="note"&&(u="Texto da Nota"),L.appendChild(oe("content",u,r?r.content:"",{isRich:!0,isCode:r?r.isCode:!1})),J.textContent=r?"Editar Item":"Novo Item",R.textContent=r?"Salvar Altera\xE7\xF5es":"Salvar",F.classList.add("open"),setTimeout(()=>{let x=L.querySelector("input");x&&x.focus()},350)}function ae(){$.playSwoosh(),F.classList.remove("open"),setTimeout(()=>{n=null},300)}async function K(){H.classList.add("active"),R.disabled=!0;try{let r=L.querySelector("#cw-lib-inp-title"),u=L.querySelector("#cw-lib-inp-content"),x=r.value.trim(),b=u.contentEditable==="true"?u.innerHTML:u.value.trim(),y=u.getAttribute("data-is-code")==="true";if(!x||!b||b==="<br>"){V("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let S={id:n,type:o,title:x,content:b,isCode:y,isRich:u.contentEditable==="true"};if(o==="email"){let d=L.querySelector("#cw-lib-inp-subject").value.trim();if(!d){V("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}S.subject=d}let C=await Se.save(S);if(C===!1){V("N\xE3o foi poss\xEDvel salvar: usu\xE1rio n\xE3o identificado. Recarregue a p\xE1gina e tente de novo.",{error:!0});return}X(),ae(),C.synced===!1?V("Salvo localmente \u2014 sem conex\xE3o com a nuvem no momento.",{error:!0}):(V("Salvo e sincronizado!"),$.playSuccess())}catch(r){console.error("Erro ao salvar item da biblioteca:",r),V("Erro ao salvar item.",{error:!0})}finally{H.classList.remove("active"),R.disabled=!1}}function oe(r,u,x,b={}){let y=document.createElement("div");y.className="cw-lib-field";let S=document.createElement("label");S.className="cw-lib-label",S.textContent=u,y.appendChild(S);let C;if(b.isRich){let d=document.createElement("div");d.className="cw-lib-toolbar-mini",d.innerHTML=`
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-bold" title="Negrito">${he.bold}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-italic" title="It\xE1lico">${he.italic}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-code" title="Formato c\xF3digo">${he.code}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-img" title="Inserir imagem">${he.image}</button>
            `,C=document.createElement("div"),C.className="cw-lib-input cw-lib-editable",C.contentEditable="true",C.innerHTML=x||"",b.isCode&&(C.style.fontFamily="'Roboto Mono', monospace",C.style.background="#F8F9FA",C.setAttribute("data-is-code","true"),d.querySelector(".cw-tb-code").classList.add("active")),d.querySelectorAll(".cw-lib-tb-btn").forEach(A=>{A.onmouseenter=()=>$.playHover(),A.onmousedown=()=>$.playClick()}),d.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),C.focus()},d.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),C.focus()},d.querySelector(".cw-tb-code").onclick=A=>{let M=!(C.getAttribute("data-is-code")==="true");C.setAttribute("data-is-code",String(M)),C.style.fontFamily=M?"'Roboto Mono', monospace":"inherit",C.style.background=M?"#F8F9FA":"#fff",A.currentTarget.classList.toggle("active",M),C.focus()},d.querySelector(".cw-tb-img").onclick=async()=>{let A=await ro("Cole a URL da imagem:");A&&(document.execCommand("insertImage",!1,A),C.querySelectorAll("img").forEach(T=>{T.style.maxWidth="100%",T.style.borderRadius="8px"}))},C.onpaste=A=>{let T=(A.clipboardData||A.originalEvent.clipboardData).items;for(let M of T)if(M.kind==="file"&&M.type.startsWith("image/")){A.preventDefault();let O=new FileReader;O.onload=Y=>{document.execCommand("insertHTML",!1,`<img src="${Y.target.result}" style="max-width:100%;border-radius:8px;margin:8px 0;display:block;">`)},O.readAsDataURL(M.getAsFile())}},y.appendChild(d)}else C=document.createElement("input"),C.className="cw-lib-input",C.type="text",C.value=x||"";return C.id=`cw-lib-inp-${r}`,y.appendChild(C),y}function k(r){let u=document.createElement("div");return u.textContent=r||"",u.innerHTML}w.addEventListener("input",r=>{a=r.target.value,g.classList.toggle("visible",a.length>0),X()}),g.onclick=()=>{w.value="",a="",g.classList.remove("visible"),X(),w.focus()};function P(){e=!e,be(e,l,"cw-btn-library"),e?(document.body.style.overflow="hidden",X()):(document.body.style.overflow="",j())}return P}function Po(){let t="v1.0",e=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},a="cw-configs-styles";if(!document.getElementById(a)){let g=document.createElement("style");g.id=a,g.innerHTML=`
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
        `,document.head.appendChild(g)}let n=document.createElement("div");n.id="configs-popup",n.classList.add("cw-module-window"),Object.assign(n.style,ye,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let l=ge(n,"Configura\xE7\xF5es",t,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:n},()=>w());n.appendChild(l);let s=document.createElement("div");s.className="cw-configs-container",n.appendChild(s);let c=document.createElement("div");c.className="cw-profile-card",c.id="cw-user-profile-section",c.style.display="none",s.appendChild(c);async function p(){c.style.display="flex",c.innerHTML=`
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
        `,setTimeout(async()=>{try{let g=fe(),v=g?g.split("@")[0]:"user",E=await at(v);if(!E){c.innerHTML=`
                <div class="cw-profile-avatar" style="background: #e8eaed; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5f6368; font-weight: bold;">
                    ${v.charAt(0).toUpperCase()}
                </div>
                <div class="cw-profile-info">
                    <h2 class="cw-profile-ldap">@${v}</h2>
                    <div class="cw-profile-badges">
                        <span class="cw-profile-badge">Consultor</span>
                    </div>
                    <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                        Perfil n\xE3o localizado na base de dados.
                    </div>
                </div>
            `;return}c.innerHTML=`
        <img src="https://moma-teams-photos.corp.google.com/photos/${v}?sz=600&type=PLUS"
             class="cw-profile-avatar" alt="User Photo"
             onerror="this.style.display='none'">
        <div class="cw-profile-info">
            <h2 class="cw-profile-ldap">@${E.ldap}</h2>
            <div class="cw-profile-badges">
                <span class="cw-profile-badge">${E.roleCategory||"N/A"}</span>
                <span class="cw-profile-badge">${E.segment||"N/A"}</span>
                <span class="cw-profile-badge">${E.defaultLanguage||"N/A"}</span>
                ${E.isOverhead?'<span class="cw-profile-badge overhead">Gest\xE3o / Overhead</span>':""}
            </div>
            <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                ${E.role||""}
            </div>
        </div>
    `}catch(g){console.warn("Erro ao renderizar perfil:",g),c.style.display="none"}},3e3)}p();let m=document.createElement("div");m.className="cw-configs-section",m.innerHTML=`
        <div class="cw-configs-section-title">Prefer\xEAncias de Som</div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label">Efeitos Sonoros</div>
                    <div class="cw-configs-desc">Ativar ou desativar sons de interface.</div>
                </div>
                <input type="checkbox" id="cw-config-sound-toggle" ${$.isMuted()?"":"checked"} style="cursor:pointer; width:20px; height:20px;">
            </div>
        </div>
    `;let f=m.querySelector("#cw-config-sound-toggle");f.onchange=g=>{$.setMuted(!g.target.checked),g.target.checked&&$.playClick()},s.appendChild(m);let h=document.createElement("div");h.className="cw-configs-section",h.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank">Reportar Bug/Sugest\xF5es</a>
            </div>
        </div>
    `,s.appendChild(h);function w(){e=!e,be(e,n,"cw-btn-configs"),e&&$.playClick()}return document.body.appendChild(n),w}var Re={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"};var je="cubic-bezier(0.4, 0, 0.2, 1)",Ws=`all 0.3s ${je}`,Ho=()=>{if(document.getElementById("bau-form-global-styles"))return;let t=document.createElement("style");t.id="bau-form-global-styles",t.textContent=`
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
      animation: cw-genie-effect-in 0.4s ${je};
      transition: all 0.3s ease;
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
        transition: all 0.2s ease;
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
      transition: all 0.2s ease;
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
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: default;
      position: relative;
      overflow: hidden;
    }

    .bau-case-card:hover {
      transform: translateY(-2px);
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
      transition: all 0.2s ease;
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
        animation: bauAuraCombined 5s ${je} 0.2s infinite;
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
        color: ${Re.green};
        animation: bau-success-pop 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
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
        animation: bauCheckDraw 0.55s ${je} 0.75s forwards;
    }

    .bau-success-view.active .bau-success-title {
        font-size: 24px;
        font-weight: 700;
        color: #202124;
        margin: 0 0 8px 0;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${je} 0.85s forwards;
    }

    .bau-success-view.active .bau-success-subtitle {
        font-size: 15px;
        color: #5F6368;
        margin-bottom: 36px;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${je} 0.95s forwards;
    }

    .bau-success-view.active #bau-success-back-btn {
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${je} 1.05s forwards;
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
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 10;
    }
    .bau-dashboard-fab:hover {
      background: #1557b0;
      transform: translateY(-4px);
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
    .bau-progress-step { width: 28px; height: 28px; border-radius: 50%; background: #FFFFFF; border: 2px solid #DADCE0; color: #5F6368; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; position: relative; z-index: 2; transition: all 0.3s ease; }
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
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
      transform: translateY(-8px) scale(1.02);
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
      transition: all 0.3s ease;
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
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: default;
    }

    .bau-highlight-item:hover {
      transform: scale(1.05);
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
      transition: all 0.2s ease;
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
      transition: all 0.2s ease;
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
      transition: all 0.2s ease;
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
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
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
      transition: all 0.2s ease;
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
      transition: all 0.2s ease;
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
      transition: all 0.2s ease;
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
      transition: all 0.2s ease;
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
        transition: all 0.2s ease;
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
        transition: all 0.2s ease;
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
      transition: all 0.2s ease;
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
  `,document.head.appendChild(t)};var Ue={steps:[{id:0,title:"Selecione o tipo de atendimento",isBranching:!0},{id:1,title:"Contexto e Valida\xE7\xE3o",fields:[{id:"advName",name:"advName",label:"Nome do Anunciante",type:"text",placeholder:"Nome do Anunciante",required:!0,isSmart:!0},{id:"cid",name:"cid",label:"CID",type:"text",placeholder:"000-000-0000",required:!0,isSmart:!0,tooltip:"Use o formato 000-000-0000 ou 10 d\xEDgitos",validation:{regex:"^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$",error:"Formato de CID incorreto"}},{id:"amName",name:"amName",label:"Account Manager (AM)",type:"text",placeholder:"Nome do AM",required:!0,isSmart:!0},{id:"website",name:"website",label:"Website",type:"text",placeholder:"https://www.exemplo.com",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!1,isSmart:!0,button:{id:"bau-top-se-search",icon:"wand",title:"Buscar ID automaticamente"}}]},{id:2,title:"Tasks",fields:[{id:"reason",name:"reason",label:"O que deve ser feito em BAU",type:"textarea",placeholder:"Descreva as a\xE7\xF5es esperadas...",required:!0,style:{minHeight:"80px"}},{id:"taskType",name:"taskType",label:"Tasks para BAU (Selecione 1 ou mais)",type:"checkbox-grid",required:!0,tooltip:"Selecione os tipos de implementa\xE7\xE3o t\xE9cnica",options:["Ads Conversion Tracking","Ads Dynamic Remarketing","Ads Enhanced Conversions","Ads Website Call Conversion","Ads Remarketing","Analytics Cross Domain Tracking","Analytics E-Commerce Tracking","Analytics Enhanced E-Commerce Tracking","Analytics Event Tracking","Analytics Health Check","Analytics Remarketing","Analytics Setup","Fix GA4 implementation","Consent Mode","Fix Sitewide Tagging (OGT & CT)","Google Tag Manager Installation","Customer Match"]}]},{id:3,title:"Justificativa e Agendamento",fields:[{id:"nonImplementationReason",name:"nonImplementationReason",label:"Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",type:"select",required:!0,options:[{value:"",text:"Selecione um motivo..."},{value:"Tempo da consultoria esgotado",text:"Tempo da consultoria esgotado"},{value:"Solicita\xE7\xE3o de reagendamento pelo anunciante",text:"Solicita\xE7\xE3o de reagendamento pelo anunciante"},{value:"Falta de acessos ou backup do site",text:"Falta de acessos ou backup do site"},{value:"Anunciante indispon\xEDvel ou n\xE3o preparado",text:"Anunciante indispon\xEDvel ou n\xE3o preparado"},{value:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)",text:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"},{value:"Solicita\xE7\xE3o de tarefas (tasks) adicionais",text:"Solicita\xE7\xE3o de tarefas (tasks) adicionais"},{value:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)",text:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"},{value:"Retorno de contato ap\xF3s prazo de 14 dias expirado",text:"Retorno de contato ap\xF3s prazo de 14 dias expirado"}]},{id:"description",name:"description",label:"Justificativa / Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva detalhadamente o que precisa ser feito...",required:!0},{id:"availability",name:"availability",label:"Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",type:"datetime-group",required:!0,fields:[{name:"availability_1",label:"Op\xE7\xE3o 1 (Prioridade)",required:!0},{name:"availability_2",label:"Op\xE7\xE3o 2 (Opcional)",required:!1},{name:"availability_3",label:"Op\xE7\xE3o 3 (Opcional)",required:!1}]}]},{id:4,title:"Confirma\xE7\xE3o",isConfirmation:!0},{id:5,title:"Solicitar Descarte",fields:[{id:"caseId",name:"caseId",label:"Case ID",type:"text",placeholder:"Case ID",required:!0,isSmart:!0},{id:"language",name:"language",label:"Idioma",type:"text",placeholder:"Idioma",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text",placeholder:"Speakeasy ID",required:!0,isSmart:!0},{id:"description",name:"description",label:"Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva o motivo do descarte...",required:!0},{id:"discardReason",name:"reason",label:"Motivo do Descarte",type:"select",required:!0,groups:[{label:"Live Appointments",options:[{value:"Caso Filho gerado no atendimento",text:"Caso Filho gerado no atendimento"},{value:"3\xAA Tentativa de contato sem sucesso",text:"3\xAA Tentativa de contato sem sucesso"}]},{label:"Live Meet",options:[{value:"Apenas o AM presente",text:"Apenas o AM presente"},{value:"Estouro de tempo para conclus\xE3o",text:"Estouro de tempo para conclus\xE3o"},{value:"Gera\xE7\xE3o de caso BAU (Reagendamento)",text:"Gera\xE7\xE3o de caso BAU (Reagendamento)"}]}]}]}]};var me={add:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',wand:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',check:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path class="bau-check-path" d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',expand:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'};function Go(t){switch(t){case"PENDING_TL_CREATION":return{text:"Aguardando TL",class:"status-yellow",aura:"status-yellow-aura"};case"CREATED":return{text:"Aprovado / Criado",class:"status-green",aura:"status-green-aura"};case"DISCARDED":return{text:"Descartado pelo TL",class:"status-red",aura:"status-red-aura"};case"CANCELED_BY_AGENT":return{text:"Cancelado",class:"status-gray",aura:""};default:return{text:t||"Pendente",class:"status-gray",aura:""}}}function jo(t){let e=document.createElement("div");if(e.className="bau-dynamic-input",e.id=`wrapper-${t.id}`,t.label){let a=document.createElement("label");a.className="bau-label",a.textContent=t.label,t.tooltip&&a.setAttribute("data-tooltip",t.tooltip),e.appendChild(a)}let o;switch(t.type){case"textarea":o=document.createElement("textarea"),o.style.minHeight="80px",e.appendChild(o);break;case"select":o=document.createElement("select"),t.groups?t.groups.forEach(l=>{let s=document.createElement("optgroup");s.label=l.label,l.options.forEach(c=>{let p=document.createElement("option");p.value=c.value,p.textContent=c.text,s.appendChild(p)}),o.appendChild(s)}):t.options&&t.options.forEach(l=>{let s=document.createElement("option");s.value=l.value,s.textContent=l.text,o.appendChild(s)}),e.appendChild(o);break;case"checkbox-grid":return o=document.createElement("div"),o.className="bau-tasks-grid",t.options.forEach(l=>{let s=document.createElement("label");s.className="bau-task-item",s.innerHTML=`<input type="checkbox" name="${t.name}" value="${l}"><span>${l}</span>`,s.addEventListener("click",c=>{c.preventDefault();let p=s.querySelector("input");p.checked=!p.checked,s.classList.toggle("active",p.checked),$.playClick()}),o.appendChild(s)}),e.appendChild(o),e;case"datetime-group":o=document.createElement("div"),o.className="bau-availability-container",t.fields.forEach(l=>{let s=document.createElement("div");s.className="bau-availability-field",s.innerHTML=`
                    <span class="bau-field-hint">${l.label}</span>
                    <input type="datetime-local" name="${l.name}" class="bau-input" ${l.required?"required":""}>
                `,o.appendChild(s)});let a=document.createElement("div");return a.className="bau-availability-disclaimer",a.innerHTML=`
                <div class="bau-disclaimer-text">
                    <strong>Aten\xE7\xE3o:</strong> Para clientes fora do fuso hor\xE1rio do Brasil, o hor\xE1rio inserido deve corresponder sempre ao hor\xE1rio local do cliente, e n\xE3o ao do agente.
                </div>
                <button type="button" class="bau-timezone-link" id="bau-open-timezone">
                    ${me.refresh}
                    Consultar Time Zone
                </button>
            `,a.querySelector("#bau-open-timezone").onclick=()=>{let l=document.getElementById("cw-btn-timezone");l?(l.click(),$.playClick()):V("M\xF3dulo Time Zone n\xE3o encontrado.",{error:!0})},e.appendChild(o),e.appendChild(a),e;case"text-with-button":let n=document.createElement("div");n.className="bau-input-group",o=document.createElement("input"),o.type="text";let i=document.createElement("button");i.type="button",i.id=t.button.id,i.className="bau-mini-btn-input",i.title=t.button.title,i.innerHTML=me[t.button.icon]||"",n.appendChild(o),n.appendChild(i),e.appendChild(n);break;default:o=document.createElement("input"),o.type="text",e.appendChild(o)}return o&&t.type!=="checkbox-grid"&&t.type!=="datetime-group"&&(o.id=`bau-form-${t.id}`,o.name=t.name,o.className=t.type==="select"?"bau-select":t.type==="textarea"?"bau-textarea":"bau-input",t.placeholder&&(o.placeholder=t.placeholder),t.required&&(o.required=!0)),e}function Uo(){Ho();let t=!1,e="dashboard",o=null,a=0,n="BAU",i=!1,l=null,s=Ue.steps.length,c=document.createElement("div");c.id="bau-form-popup",c.className="bau-popup cw-module-window",c.style.display="none";let p=ge(c,"BAU Central","v2.2.0","Dashboard de Casos BAU",{},()=>P());c.appendChild(p);let m=document.createElement("div");m.className="bau-view-container",c.appendChild(m);let f=document.createElement("div");f.id="bau-view-details",f.className="bau-details-view",m.appendChild(f);let h=document.createElement("div");h.id="bau-view-dashboard",h.className="bau-view active",h.innerHTML=`
        <div class="bau-dashboard-content">
            <div class="bau-dashboard-metrics" id="bau-dashboard-metrics"></div>
            <ul class="bau-case-list" id="bau-case-list-container"></ul>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            ${me.add}
            Novo Caso BAU
        </button>
    `,m.appendChild(h);let w=document.createElement("div");w.id="bau-view-form",w.className="bau-view";let g=document.createElement("div");g.className="bau-view-header",g.innerHTML=`
      <button class="bau-back-btn" id="bau-form-back-btn">
        ${me.back}
        Voltar ao Dashboard
      </button>
    `,w.appendChild(g);let v=document.createElement("div");v.className="bau-content",w.appendChild(v);let E=document.createElement("div");E.className="bau-form-loading-overlay",E.innerHTML=`
        <div class="bau-spinner"></div>
        <div class="bau-loading-text">Configurando Edi\xE7\xE3o...</div>
    `,v.appendChild(E);let N=r=>{E.classList.toggle("active",r)},F=document.createElement("div");F.className="bau-progress-indicator",v.appendChild(F);let q=document.createElement("form");q.id="bau-escalation-form",q.noValidate=!0,v.appendChild(q),Ue.steps.forEach(r=>{let u=document.createElement("div");if(u.className="bau-step"+(r.id===a?" active":""),u.id=`bau-step-${r.id}`,r.isBranching)u.innerHTML=`
                <div class="bau-branching-container">
                    <div class="bau-branching-card" id="bau-opt-full">
                        <div class="bau-branching-icon">${me.add}</div>
                        <h3 class="bau-branching-title">Abrir caso para BAU</h3>
                        <p class="bau-branching-subtitle">Fluxo completo para implementa\xE7\xF5es t\xE9cnicas e suporte especializado.</p>
                    </div>
                    <div class="bau-branching-card" id="bau-opt-discard">
                        <div class="bau-branching-icon">${me.empty}</div>
                        <h3 class="bau-branching-title">Solicitar Descarte</h3>
                        <p class="bau-branching-subtitle">Fluxo simplificado para casos que n\xE3o requerem implementa\xE7\xE3o.</p>
                    </div>
                </div>
            `,u.querySelector("#bau-opt-full").onclick=()=>{n="BAU",a=1,q.querySelectorAll(".bau-highlight-panel").forEach(x=>x.classList.remove("discard-theme")),X(),$.playClick()},u.querySelector("#bau-opt-discard").onclick=()=>{n="DISCARD",a=5,q.querySelectorAll(".bau-highlight-panel").forEach(x=>x.classList.add("discard-theme")),X(),$.playClick()};else if(r.isConfirmation)u.innerHTML=`
                <div class="bau-card">
                    <h3 class="bau-step-title">Confirme os dados antes de enviar</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;else{let x=document.createElement("div");if(x.className="bau-card",r.id===1||r.id===5){x.innerHTML=`
                    <div class="bau-vital-highlights bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div class="bau-all-data"></div>
                `;let b=x.querySelector(".bau-dynamic-inputs-container");r.fields.forEach(S=>{b.appendChild(jo(S))});let y=x.querySelector("#wrapper-cid");if(y){let S=document.createElement("div");S.id="bau-cid-error",S.className="bau-cid-error-hint",S.style.display="none",S.textContent="Formato de CID incorreto",y.appendChild(S)}}else r.fields.forEach(b=>{x.appendChild(jo(b))});u.appendChild(x)}q.appendChild(u)});let z=document.createElement("div");z.className="bau-footer";let W=document.createElement("button");W.type="button",W.id="bau-step-back-btn",W.className="bau-btn-secondary",W.textContent="Voltar";let J=document.createElement("button");J.type="button",J.id="bau-step-next-btn",J.className="bau-btn-primary",J.textContent="Pr\xF3ximo";let L=document.createElement("button");L.type="submit",L.className="bau-btn-submit",L.innerHTML=`${me.send} Enviar para o TL`,L.style.display="none",z.appendChild(W),z.appendChild(J),z.appendChild(L),q.appendChild(z),m.appendChild(w);let I=document.createElement("div");I.id="bau-view-success",I.className="bau-view bau-success-view",I.innerHTML=`
        <div class="bau-success-content">
            <div class="bau-success-icon" style="color: ${Re.green};">${me.check}</div>
            <h2 class="bau-success-title">Caso enviado com sucesso!</h2>
            <p class="bau-success-subtitle">Sua solicita\xE7\xE3o foi recebida e ser\xE1 processada em breve.</p>
            <button class="bau-btn-primary" id="bau-success-back-btn">Voltar ao Dashboard</button>
        </div>
    `,m.appendChild(I),document.body.appendChild(c);function R(r){e=r,c.querySelectorAll(".bau-view").forEach(S=>S.classList.remove("active"));let u=c.querySelector(`#bau-view-${r}`);u&&u.classList.add("active");let x=p.querySelector(".cw-module-header-title")||p.querySelector("h2"),b=p.querySelector(".cw-module-header-subtitle")||p.querySelector("p");x&&(r==="form"?x.textContent=i?`Editando Caso #${l}`:"Novo Caso BAU":x.textContent="BAU Central"),b&&(b.textContent=r==="form"?"Preencha os detalhes abaixo":"Dashboard de Casos BAU");let y=q.querySelector(".bau-btn-submit");y&&(y.innerHTML=i?`${me.send} Salvar Altera\xE7\xF5es`:`${me.send} Enviar para o TL`)}function H(){let r=c.querySelector("#bau-case-list-container"),u=c.querySelector("#bau-dashboard-metrics");u&&(u.innerHTML=`
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `),r&&(r.innerHTML=Array(5).fill(0).map(()=>`
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join(""))}async function _(){let r=c.querySelector("#bau-case-list-container"),u=c.querySelector("#bau-dashboard-metrics");if(!(!r||!u)){H();try{let x=await Wt();if(!Array.isArray(x))throw new Error("API response is not a valid array");te(x)}catch(x){console.error("Critical Error loading BAU cases:",x),u&&(u.innerHTML=""),r.innerHTML=`
                <div class="bau-empty-state bau-error-state">
                    <div style="color: ${Re.red}; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">Ops! Algo deu errado</h3>
                    <p class="bau-empty-subtitle">N\xE3o conseguimos carregar seus casos BAU no momento.</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        Tentar Novamente
                    </button>
                </div>
            `,c.querySelector("#bau-retry-btn")?.addEventListener("click",()=>_()),V("Erro ao carregar Dashboard. Verifique sua conex\xE3o.",{error:!0})}}}function D(r){if(!r)return;let u=Go(r.status),x=(y,S)=>{navigator.clipboard.writeText(y).then(()=>{V("Copiado para a \xE1rea de transfer\xEAncia!"),$.playClick();let C=S.style.color;S.style.color="#1E8E3E",setTimeout(()=>{S.style.color=C},800)})};f.innerHTML=`
            <div class="bau-details-header">
                <h2 class="bau-details-title">Detalhes do Caso</h2>
                <button class="bau-details-close-btn">
                    ${me.back}
                    Voltar
                </button>
            </div>
            <div class="bau-details-content">
                <div class="bau-details-grid">
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Anunciante</span>
                            <span class="bau-details-value">${r.advName||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${me.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Status</span>
                            <span class="bau-case-status-badge ${u.class}">${u.text}</span>
                        </div>
                    </div>
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">CID</span>
                            <span class="bau-details-value">${r.cid||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${me.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Case ID</span>
                            <span class="bau-details-value">${r.caseId||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${me.wand}</button>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Motivo BAU</span>
                            <span class="bau-details-value">${r.reason||"N\xE3o informado"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Tasks solicitadas</span>
                            <span class="bau-details-value">${r.taskType||"Nenhuma"}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Justificativa</span>
                            <span class="bau-details-value">${r.nonImplementationReason||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Descri\xE7\xE3o detalhada</span>
                            <span class="bau-details-value">${r.description||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Disponibilidade</span>
                            <span class="bau-details-value">${it(r.availability)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;let b=f.querySelector(".bau-details-close-btn");b.onclick=()=>{f.classList.remove("active"),$.playSwoosh(),setTimeout(()=>{f.style.display="none"},600)},f.querySelectorAll(".bau-copy-btn").forEach(y=>{y.onclick=S=>{let C=S.target.closest(".bau-details-row").querySelector(".bau-details-value").textContent;x(C,y)}}),f.style.display="flex",requestAnimationFrame(()=>{f.classList.add("active"),$.playClick()})}function j(r){if(!r)return"";let u=Go(r?.status),x=it(r?.date),b="",y="";if(r?.status==="PENDING_TL_CREATION"&&r?.availability_1){let T=new Date(r.availability_1),M=new Date;(T<=M||T-M<36e5*2)&&(b='<span class="bau-sla-badge">Urgente</span>',y="bau-pulse-attention")}let S=r?.reason&&r.reason.trim()?r.reason:"Nenhum contexto adicional fornecido pelo agente.",d=/^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(r?.cid||""),A=!r?.caseId||r.caseId==="N/A"||!d;return A&&r?.status==="PENDING_TL_CREATION"&&(y="bau-pulse-attention"),`
            <li class="bau-case-card ${u.aura} ${y}" data-case-id="${r?.id||""}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${me.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${r?.advName||"Nome indefinido"}</h3>
                            ${b}
                            <span class="bau-case-date">${x}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="Customer ID do Anunciante">Case: ${r?.caseId||"N/A"}</span> \u2022
                            <span data-tooltip="CID do Anunciante (Formato: 000-000-0000)" class="${d?"":"bau-error-text"}">CID: ${r?.cid||"N/A"}</span> \u2022
                            <span data-tooltip="O que deve ser feito em BAU">Motivo: ${S}</span>
                        </p>
                        ${A?`<div class="bau-data-error-hint">${!r?.caseId||r?.caseId==="N/A"?"Dados Incompletos":"CID Inv\xE1lido"} - Contate o Suporte</div>`:""}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                    <span class="bau-case-status-badge ${u.class}">${u.text}</span>
                    ${r?.status&&r.status.includes("PENDING")?`
                        <button class="bau-case-edit-btn" data-id="${r.id}" title="Editar Solicita\xE7\xE3o">
                            ${me.edit}
                            Editar
                        </button>
                    `:""}
                </div>
            </li>
        `}function te(r){let u=c.querySelector("#bau-case-list-container"),x=c.querySelector("#bau-dashboard-metrics");if(!u||!x)return;let b=Array.isArray(r)?r.filter(Boolean):[];if(b.length===0){x.innerHTML=`
                <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard">
                    ${me.refresh}
                    Atualizar
                </button>
            `,u.innerHTML=`
                <div class="bau-empty-state">
                    ${me.empty}
                    <h3 class="bau-empty-title">Nenhum caso recente</h3>
                    <p class="bau-empty-subtitle">Seus casos BAU aparecer\xE3o aqui</p>
                </div>
            `,c.querySelector("#bau-refresh-dashboard")?.addEventListener("click",()=>_());return}let y=b.filter(T=>T.status==="PENDING_TL_CREATION").length,S=b.filter(T=>T.status==="CREATED").length;x.innerHTML=`
            <div class="bau-metric-card">
                <span class="bau-metric-value">${y}</span>
                <span class="bau-metric-label">Aguardando TL</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${S}</span>
                <span class="bau-metric-label">Criados / Aprovados</span>
            </div>
            <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard" title="Atualizar Dashboard">
                ${me.refresh}
            </button>
        `;let C=x.querySelector("#bau-refresh-dashboard");C?.addEventListener("click",async()=>{C.classList.contains("spinning")||(C.classList.add("spinning"),$.playClick(),await _(),setTimeout(()=>C.classList.remove("spinning"),1e3))}),u.innerHTML="";let d=b.slice(0,5),A=b.slice(5);if(d.forEach(T=>{let M=j(T),O=document.createElement("div");O.innerHTML=M;let Y=O.firstElementChild;Y.addEventListener("click",se=>{se.target.closest(".bau-case-edit-btn")||D(T)});let U=Y.querySelector(".bau-case-edit-btn");U&&(U.onclick=se=>{se.stopPropagation(),oe(T)}),u.appendChild(Y)}),A.length>0){let T=document.createElement("li");T.className="bau-accordion-container";let M=document.createElement("button");M.className="bau-accordion-toggle",M.innerHTML=`${me.expand} <span>Mostrar ${A.length} casos mais antigos</span>`;let O=document.createElement("ul");O.className="bau-case-list bau-accordion-content",O.style.display="none",A.forEach(Y=>{let U=j(Y),se=document.createElement("div");se.innerHTML=U;let pe=se.firstElementChild;pe.addEventListener("click",Ae=>{Ae.target.closest(".bau-case-edit-btn")||D(Y)});let Ee=pe.querySelector(".bau-case-edit-btn");Ee&&(Ee.onclick=Ae=>{Ae.stopPropagation(),oe(Y)}),O.appendChild(pe)}),M.addEventListener("click",()=>{let Y=O.style.display==="none";O.style.display=Y?"block":"none",M.classList.toggle("expanded",Y),M.querySelector("span").textContent=Y?"Esconder casos mais antigos":`Mostrar ${A.length} casos mais antigos`,$.playClick()}),T.appendChild(M),T.appendChild(O),u.appendChild(T)}}function X(){let r=n==="BAU"?[1,2,3,4]:[5,4];q.querySelectorAll(".bau-step").forEach(b=>{let y=parseInt(b.id.replace("bau-step-","")),S=y===a,C=r.includes(y)||y===0;b.classList.toggle("active",S),b.style.display=S?"block":"none",b.querySelectorAll("input, select, textarea").forEach(d=>{d.disabled=!C})});let u=a===0;if(F.style.display=u?"none":"flex",!u){F.innerHTML="";let b=n==="BAU"?[1,2,3,4]:[5,4];b.forEach((y,S)=>{let C=document.createElement("div"),d=y===a,A=b.indexOf(a),T=S<A;C.className=`bau-progress-step ${d?"active":T?"completed":""}`,C.textContent=S+1,F.appendChild(C)})}let x=a===4;W.style.display=a>0?"inline-block":"none",J.style.display=!u&&!x?"inline-block":"none",L.style.display=x?"flex":"none",x&&K()}function Z(r){let u=Ue.steps.find(x=>x.id===r);if(!u||!u.fields||u.isConfirmation)return!0;for(let x of u.fields){let b=q.querySelector(`#bau-step-${r} #wrapper-${x.id}`);if(!(b&&b.style.display==="none")&&x.validation){let y=q.querySelector(`#bau-step-${r} [name="${x.name}"]`);if(y&&y.offsetParent!==null&&y.value.trim())if(new RegExp(x.validation.regex).test(y.value.trim())){y.classList.remove("invalid-cid");let C=q.querySelector("#bau-cid-error");C&&(C.style.display="none")}else{console.warn(`Validation failed for field "${x.name}" in step ${r}: Regex mismatch.`),V(`Erro: ${x.validation.error}`,{error:!0}),y.classList.add("invalid-cid");let C=q.querySelector("#bau-cid-error");return C&&(C.style.display="flex"),!1}}}return!0}function ee(r){if(!q.querySelector(`#bau-step-${r}`))return!1;let x=Ue.steps.find(y=>y.id===r);if(!x||!x.fields||x.isConfirmation)return!0;let b=!0;for(let y of x.fields){let S=q.querySelector(`#bau-step-${r} #wrapper-${y.id}`);if(!(S&&S.style.display==="none")&&y.required){let C=!0,d="";if(y.type==="checkbox-grid")q.querySelector(`#bau-step-${r} input[name="${y.name}"]:checked`)||(d="No option selected in checkbox-grid",V(`Erro: Selecione pelo menos uma op\xE7\xE3o para "${y.label}".`,{error:!0}),C=!1);else if(y.type==="datetime-group"){let A=q.querySelector(`#bau-step-${r} input[name="${y.fields[0].name}"]`);if(!A||A.offsetParent===null)continue;A.value.trim()||(d="Datetime group first field is empty",V(`Erro: O campo "${y.fields[0].label}" \xE9 obrigat\xF3rio.`,{error:!0}),C=!1)}else{let A=q.querySelector(`#bau-step-${r} [name="${y.name}"]`);if(!A||A.offsetParent===null)continue;A.value.trim()||(d="Field is empty",V(`Erro: O campo '${y.label}' \xE9 obrigat\xF3rio.`,{error:!0}),C=!1)}if(!C){console.warn(`Validation failed for required field "${y.name}" in step ${r}: ${d}`),b=!1;break}}}return b}J.addEventListener("click",()=>{if(Z(a)&&ee(a)){n==="BAU"?a++:a===5?a=4:a++,X();let r=c.querySelector(".bau-content");r&&(r.scrollTop=0),$.playClick()}}),W.addEventListener("click",()=>{a>0&&(n==="BAU"?a--:a===4?a=5:a===5?a=0:a--,X(),$.playClick())});async function Q(){let r=await Fe()||{};(!r.amName||r.amName==="N/A")&&(r.amName=r.internalEmail||"N/A"),o=r,q.querySelectorAll(".bau-vital-highlights").forEach(b=>{let y=[{label:"Anunciante",value:r.advName},{label:"CID",value:r.cid},{label:"Website",value:r.website||r.site},{label:"Case ID",value:r.caseId}];b.innerHTML=y.map(S=>{let C=S.value&&S.value!=="N/A"&&S.value!=="undefined"&&S.value!=="null"?S.value:"N\xE3o capturado";return`
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${S.label}</span>
                        <span class="bau-highlight-value">${C}</span>
                    </div>
                `}).join("")}),Ue.steps.forEach(b=>{b.fields&&b.fields.forEach(y=>{if(y.isSmart){let S=r[y.id];y.id==="language"&&r.userProfile?.defaultLanguage&&(S=r.userProfile.defaultLanguage);let C=q.querySelector(`#bau-step-${b.id} [name="${y.name}"]`),d=q.querySelector(`#bau-step-${b.id} #wrapper-${y.id}`);if(C&&(C.value=S&&S!=="N/A"?S:"",y.id==="language"&&S&&S!=="N/A"&&(C.readOnly=!0,C.style.background="#F1F3F4",C.style.cursor="not-allowed")),d){let A=S&&S!==""&&S!=="N/A"&&S!=="undefined"&&S!=="null";y.id==="language"?d.style.display="block":d.style.display=A?"none":"block"}}})}),q.querySelectorAll(".bau-all-data").forEach(b=>{let y=[{label:"Anunciante",value:r.advName},{label:"CID",value:r.cid},{label:"AM",value:r.amName},{label:"SE ID",value:r.seId},{label:"Site",value:r.website||r.site},{label:"Email",value:r.email},{label:"Timezone",value:r.timezone},{label:"Case ID",value:r.caseId},{label:"Programa",value:r.salesProgram},{label:"Idioma",value:r.language}];b.innerHTML=`
                <div class="bau-context-badges-grid">
                    ${y.filter(S=>S.value&&S.value!=="N/A"&&S.value!=="---"&&S.value!=="undefined"&&S.value!=="null").map(S=>`
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${S.label}:</span>
                                <span class="bau-badge-value">${S.value}</span>
                            </div>
                        `).join("")}
                </div>
            `})}c.querySelector("#bau-top-se-search")?.addEventListener("click",r=>{r.preventDefault(),ct("bau-form-seId")});let ae=c.querySelector("#bau-form-cid");ae&&ae.addEventListener("input",()=>Z(1));function K(){let r=new FormData(q),u=Object.fromEntries(r.entries()),x=c.querySelector("#bau-confirmation-details");if(x){if(n==="BAU"){let b=r.getAll("taskType"),y=b.length>0?b.join(", "):"Nenhuma";x.innerHTML=`
                ${i?`<div class="bau-highlight-panel" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${Re.yellow}; background: rgba(255, 186, 0, 0.05); border-radius: 8px; font-weight: 500;">Voc\xEA est\xE1 editando o caso #<span style="color: ${Re.yellow}">${l}</span></div>`:""}
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
                        <input class="bau-confirm-value-input" data-field="seId" data-step="1" value="${u.seId||""}" placeholder="N\xE3o informado">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">O que deve ser feito</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="reason" data-step="2" placeholder="---">${u.reason||""}</textarea>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Tasks</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="Para editar as tasks, volte ao Passo 2">${y}</span>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Justificativa BAU</span>
                        <select class="bau-confirm-value-input" data-field="nonImplementationReason" data-step="3">
                            <option value="Tempo da consultoria esgotado" ${u.nonImplementationReason==="Tempo da consultoria esgotado"?"selected":""}>Tempo da consultoria esgotado</option>
                            <option value="Solicita\xE7\xE3o de reagendamento pelo anunciante" ${u.nonImplementationReason==="Solicita\xE7\xE3o de reagendamento pelo anunciante"?"selected":""}>Solicita\xE7\xE3o de reagendamento pelo anunciante</option>
                            <option value="Falta de acessos ou backup do site" ${u.nonImplementationReason==="Falta de acessos ou backup do site"?"selected":""}>Falta de acessos ou backup do site</option>
                            <option value="Anunciante indispon\xEDvel ou n\xE3o preparado" ${u.nonImplementationReason==="Anunciante indispon\xEDvel ou n\xE3o preparado"?"selected":""}>Anunciante indispon\xEDvel ou n\xE3o preparado</option>
                            <option value="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)" ${u.nonImplementationReason==="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"?"selected":""}>Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)</option>
                            <option value="Solicita\xE7\xE3o de tarefas (tasks) adicionais" ${u.nonImplementationReason==="Solicita\xE7\xE3o de tarefas (tasks) adicionais"?"selected":""}>Solicita\xE7\xE3o de tarefas (tasks) adicionais</option>
                            <option value="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)" ${u.nonImplementationReason==="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"?"selected":""}>Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)</option>
                            <option value="Retorno de contato ap\xF3s prazo de 14 dias expirado" ${u.nonImplementationReason==="Retorno de contato ap\xF3s prazo de 14 dias expirado"?"selected":""}>Retorno de contato ap\xF3s prazo de 14 dias expirado</option>
                        </select>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Descri\xE7\xE3o</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="3" placeholder="---">${u.description||""}</textarea>
                    </div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Disponibilidade (Prioridade)</span>
                        <input type="datetime-local" class="bau-confirm-value-input" data-field="availability_1" data-step="3" value="${u.availability_1||""}">
                    </div>
                </div>
            `}else x.innerHTML=`
                ${i?`<div class="bau-highlight-panel discard-theme" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${Re.red}; background: rgba(217, 48, 37, 0.05); border-radius: 8px; font-weight: 500;">Voc\xEA est\xE1 editando o descarte do caso #<span style="color: ${Re.red}">${l}</span></div>`:""}
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
                        <span class="bau-confirm-label">Motivo do Descarte</span>
                        <input class="bau-confirm-value-input" data-field="reason" data-step="5" value="${u.reason||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Descri\xE7\xE3o do Descarte</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="5" placeholder="---">${u.description||""}</textarea>
                    </div>
                </div>
            `;x.querySelectorAll(".bau-confirm-value-input").forEach(b=>{b.addEventListener("input",y=>{let S=y.target.dataset.field,C=y.target.dataset.step;if(!S||!C)return;let d=q.querySelector(`#bau-step-${C} [name="${S}"]`);d&&(d.value=y.target.value,S==="cid"&&Z(1))})})}}async function oe(r){if(!await ve("Aten\xE7\xE3o: Para editar as informa\xE7\xF5es, voc\xEA deve estar com a p\xE1gina deste Caso espec\xEDfico aberta no sistema. Caso contr\xE1rio, os dados capturados estar\xE3o incorretos.",{confirmText:"Estou na p\xE1gina correta"}))return;N(!0),k(),i=!0,l=r.id,n=r.status==="PENDING_TL_DISCARD"||r.reason&&!r.task?"DISCARD":"BAU",R("form"),await Q(),o={...o,advName:r.advName||o.advName,cid:r.cid||o.cid,caseId:r.caseId||o.caseId,seId:r.seId||o.seId,site:r.site||r.website||o.site||o.website,email:r.advEmail||o.email,timezone:r.timezone||o.timezone,language:r.language||o.language,amName:r.amName||o.amName,salesProgram:r.salesProgram||o.salesProgram};let x=r.availability?r.availability.split("|").map(b=>b.trim()):[];q.querySelectorAll("input, select, textarea").forEach(b=>{let y=b.name,C={advEmail:"advEmail",website:"site",site:"site"}[y]||y;if(y==="taskType"){let d=(r.task||r.taskType||"").split(",").map(A=>A.trim());b.type==="checkbox"&&(b.checked=d.includes(b.value),b.closest(".bau-task-item")?.classList.toggle("active",b.checked))}else if(y.startsWith("availability_")){let d=parseInt(y.split("_")[1])-1,A=x[d];if(A&&b.type==="datetime-local")try{let T=new Date(A);if(!isNaN(T.getTime())){let M=new Date(T.getTime()-T.getTimezoneOffset()*6e4).toISOString().slice(0,16);b.value=M}}catch{}}else r[C]!==void 0?b.value=r[C]:y==="reason"?b.value=r.reason:y==="description"?b.value=r.description:y==="nonImplementationReason"&&(b.value=r.nonImplementationReason||"")}),a=n==="BAU"?1:5,X(),$.playClick(),setTimeout(()=>N(!1),500)}q.onsubmit=async r=>{r.preventDefault();let u=n==="BAU"?[1,2,3]:[5];for(let d of u)if(!Ue.steps.find(T=>T.id===d)?.isConfirmation&&(!Z(d)||!ee(d))){console.warn(`Form submission blocked by validation failure in step ${d}`),a=d,X();return}let x=c.querySelector(".bau-btn-submit");x.disabled=!0,x.innerHTML="Enviando...";let b=new FormData(q),y=Object.fromEntries(b.entries()),S=o||{},C={...S,...y,requestType:n};if(y.advEmail?C.advEmail=y.advEmail:S.email&&(C.advEmail=S.email),y.website?C.website=y.website:S.website?C.website=S.website:S.site&&(C.website=S.site),n==="BAU"){let d=b.getAll("taskType"),A=[y.availability_1,y.availability_2,y.availability_3].filter(T=>T&&T.trim()!=="").join(" | ");C.taskType=d.join(", "),C.availability=A,i?(y.nonImplementationReason?C.nonImplementationReason=y.nonImplementationReason:delete C.nonImplementationReason,y.description?C.description=y.description:delete C.description):(C.nonImplementationReason=y.nonImplementationReason||"",C.description=y.description||"",C.nonImplementationReason||console.warn("Aviso: Campo 'Justificativa' (nonImplementationReason) est\xE1 saindo vazio."),C.description||console.warn("Aviso: Campo 'Descri\xE7\xE3o detalhada' (description) est\xE1 saindo vazio."))}else C.reason=y.reason,i?(y.description?C.description=y.description:delete C.description,delete C.taskType,delete C.availability,delete C.nonImplementationReason):(C.taskType="",C.availability="",C.nonImplementationReason="",C.description=y.description||"");try{i?await Xt(l,C):await Yt(C,S.agentEmail||"anon"),$.playSuccess();let d=c.querySelector(".bau-success-title");d&&(i?d.textContent="Caso atualizado com sucesso!":d.textContent=n==="DISCARD"?"Caso enviado para descarte com sucesso!":"Caso enviado com sucesso!"),R("success")}catch(d){V("Erro: "+(d.message||"Erro desconhecido"),{error:!0}),console.error("Payload que tentou enviar:",C)}finally{x.disabled=!1,x.innerHTML=`${me.send} Enviar para o TL`}};function k(){q.reset(),a=0,n="BAU",i=!1,l=null,X(),q.querySelectorAll(".bau-task-item.active").forEach(u=>u.classList.remove("active"));let r=q.querySelector('[name="language"]');r&&(r.readOnly=!1,r.style.background="",r.style.cursor="")}c.querySelector("#bau-new-case-btn").addEventListener("click",()=>{k(),R("form"),Q()}),c.querySelector("#bau-form-back-btn").addEventListener("click",()=>R("dashboard")),c.querySelector("#bau-success-back-btn").addEventListener("click",()=>R("dashboard"));async function P(){t=!t,c.style.display=t?"flex":"none",t&&(R("dashboard"),_()),be(t,c,"cw-btn-bauform")}return X(),P}function ka(){if(window.techSolInitialized){kt();return}window.techSolInitialized=!0;let t="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{Qt();try{$.initGlobalListeners(),$.playStartup()}catch(m){console.warn("\xC1udio bloqueado:",m)}de.fetchTips(),kt();let e=Eo(),o=Fo(),a=Io(),n=Oo(),i=Ro(),l=$o(),s=Po(),c=Uo(),p=No();ho({toggleNotes:e,toggleEmail:o,toggleScript:a,toggleLinks:n,toggleTimezone:i,toggleLibrary:l,toggleConfigs:s,toggleBAUForm:c,broadcastControl:p}),setTimeout(()=>{de.logEvent("App","Start","Session Start"),_o(),setTimeout(()=>{Mo(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),V("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}ka();})();
