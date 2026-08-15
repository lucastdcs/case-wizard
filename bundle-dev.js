(()=>{var Go=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Ht="AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg",jo=Go?`https://script.google.com/a/macros/google.com/s/${Ht}/dev`:`https://script.google.com/a/macros/google.com/s/${Ht}/exec`,vt="cw_data_broadcast",Gt="cw_data_tips",Uo=["Processando...","Mantenha o foco!","Aguarde..."];function Te(t,e={}){return new Promise((o,a)=>{let n="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script"),r=setTimeout(()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(new Error("Timeout: A API demorou muito para responder. (Apps Script bloqueado ou erro 500)"))},15e3);window[n]=u=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(u)};let s=Object.keys(e).map(u=>encodeURIComponent(u)+"="+encodeURIComponent(e[u])).join("&"),l=`${jo}?op=${t}&callback=${n}&t=${Date.now()}&${s}`;i.src=l,i.onerror=()=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(new Error("Erro de conex\xE3o JSONP."))},document.body.appendChild(i)})}var de={fetchTips:async()=>{try{let t=await Te("tips");t?.tips&&localStorage.setItem(Gt,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await Te("broadcast");if(t?.broadcast)return localStorage.setItem(vt,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(vt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(vt)||"[]"),getRandomTip:()=>{let t=Uo,e=localStorage.getItem(Gt);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await de._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await de._performOp("update_broadcast",o)},deleteBroadcast:async t=>await de._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`Executando ${t}...`,e);let o=await Te(t,e);return o&&o.status==="success"?(console.log("Sucesso:",t),!0):(console.warn("Falha:",o),!1)}catch(o){return console.error("Erro JSONP:",o),!1}},logEvent:(t,e,o="",a=null)=>{try{let n="anon";try{let r=fe();r&&(n=r.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:n,version:"v5.1",category:t,action:e,label:o,value:a||""};Te("log",i).catch(r=>{})}catch(n){console.warn("Analytics error",n)}},logUsage:()=>{},sendBAUEscalation:async(t,e)=>{let o={...t,user:e,date:new Date().toISOString()};try{console.log("Executando create_bau...",o);let a=await Te("create_bau",o);if(a&&a.status==="success")return console.log("Sucesso: create_bau"),a;throw new Error(a?.error||a?.message||"Falha na opera\xE7\xE3o BAU")}catch(a){throw console.error("Erro JSONP (BAU):",a),a}},readAgentBAU:async()=>{let t=fe();if(!t)return console.warn("Email n\xE3o encontrado. N\xE3o foi poss\xEDvel buscar casos BAU."),[];try{console.log("Buscando casos BAU para:",t);let e=await Te("read_agent_bau",{user:t});if(e&&e.status==="success"&&Array.isArray(e.cases))return e.cases;if(e&&e.status==="error")throw new Error(e.message||"Erro retornado pela API de leitura");return[]}catch(e){throw console.error("Erro ao buscar casos BAU:",e),e}},updateBAUStatus:async(t,e,o={})=>{let a=fe();try{console.log(`Atualizando status BAU ${t} para ${e}...`);let n=await Te("update_bau_status",{id:t,status:e,user:a,...o});return n&&n.status==="success"}catch(n){return console.error("Erro ao atualizar status BAU:",n),!1}},updateBAUEscalation:async(t,e)=>{let o=fe(),a={...e,id:t,user:o,date_edited:new Date().toISOString()};try{console.log(`Executando update_bau para ${t}...`,a);let n=await Te("update_bau",a);if(n&&n.status==="success")return console.log("Sucesso: update_bau"),n;throw new Error(n?.error||n?.message||"Falha na atualiza\xE7\xE3o BAU")}catch(n){throw console.error("Erro JSONP (Update BAU):",n),n}},fetchUserProfile:async t=>{try{console.log(`Buscando perfil para: ${t}`);let e=await Te("get_user_profile",{ldap:t});return console.log("Resposta bruta do servidor:",e),e&&e.status==="success"&&e.profile?e.profile:null}catch(e){return console.error("Erro ao buscar perfil:",e),null}},getUserSnippets:async t=>{try{return console.log("Buscando snippets para:",t),await Te("get_user_snippets",{user:t})}catch(e){return console.error("Erro ao carregar snippets:",e),{status:"error",snippets:[]}}},saveSnippet:async(t,e)=>{let o={id:t.id,type:t.type,title:t.title,content:t.content,subject:t.subject||"",isCode:t.isCode,isRich:t.isRich,user:e};try{console.log("Salvando snippet na nuvem:",o);let a=await Te("save_snippet",o);return a&&a.status==="success"}catch(a){return console.error("Erro ao salvar snippet:",a),!1}},deleteSnippet:async(t,e)=>{try{console.log(`Deletando snippet ${t}...`);let o=await Te("delete_snippet",{id:t,user:e});return o&&o.status==="success"}catch(o){return console.error("Erro ao deletar snippet:",o),!1}}},jt=de.sendBAUEscalation,Ut=de.readAgentBAU,Sa=de.updateBAUStatus,Vt=de.updateBAUEscalation,at=de.fetchUserProfile,Ca=de.getUserSnippets,Ea=de.saveSnippet,Aa=de.deleteSnippet;var ne=t=>new Promise(e=>setTimeout(e,t));function he(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function Ve(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}function Ne(t){return t?Object.entries(t).map(([e,o])=>`${e.replace(/[A-Z]/g,a=>"-"+a.toLowerCase())}:${o}`).join(";"):""}function Be(t,e,o){return Math.max(e,Math.min(t,o))}var nt="",Je="",wt=null;async function St(){try{let t=document.querySelector('material-button[debug-id="toggle-translation-button"]');if(t){let e=t.textContent.toLowerCase();(e.includes("show original")||e.includes("mostrar original"))&&(console.log("TechSol: Tradu\xE7\xE3o detectada. Revertendo para o idioma original..."),t.click(),await ne(400))}}catch(t){console.warn("TechSol: Erro ao tentar reverter tradu\xE7\xE3o:",t)}}async function Ct(){if(nt&&Je)return nt;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await ne(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let n=document.querySelector("profile-details img");if(n&&n.src.includes("/photos/")){let i=n.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let a=document.querySelector("profile-details .email");return a&&(Je=a.textContent.trim(),console.log("TechSol: Identidade confirmada ->",Je)),t.click(),document.body.click(),nt=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function Ke(){return nt||"Consultor"}function fe(){return Je||null}function Yt(t){let e=new Date,o=e.getHours(),a=e.getDay(),n="Ol\xE1",i="";o>=5&&o<12?(n="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(n="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(n="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let r=[];o>=0&&o<5?r=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?a===1?r=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:a===5?r=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:r=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?r=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:r=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(a===0||a===6)&&(r=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let s=r[Math.floor(Math.random()*r.length)];return{prefix:`${n},`,name:t,suffix:s,icon:i,isFriday:a===5}}async function Vo(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,a=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');a&&(a.click(),await ne(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(r=>{let s=r.innerText.trim();return s.includes("@")&&!s.includes("Is this:")&&s.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Yo(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function Wo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Google Ads External Customer ID")||n.textContent.includes("Customer ID"));if(e){let n=e.closest("home-data-item")||e.parentElement;if(n){let i=n.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let a=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(a)return a[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"N/A"}function Xo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Account Manager")||o.textContent.includes("AM Name")||o.textContent.includes("Sales Rep"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar AM:",t)}return null}function Jo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("customer time zone")||o.textContent.toLowerCase().includes("time zone")||o.textContent.toLowerCase().includes("timezone"));if(e){let o=e.parentElement;if(o){let a=o.querySelector("sanitized-content");if(a&&a.textContent.trim())return a.textContent.trim();let n=o.querySelector(".data-pair-content")||e.nextElementSibling;if(n&&n.textContent.trim()){let i=n.textContent.trim();if(i&&i!=="---"&&i!=="N/A")return i}}}}catch(t){console.warn("Erro ao capturar Timezone:",t)}return null}async function Ko(){let t="---";try{t=window.location.href.split("/").pop()}catch(e){console.warn("Falha URL:",e)}return t}function Zo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("sales program")||o.textContent.toLowerCase().trim()==="program"||o.textContent.toLowerCase().includes("programa"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector('sanitized-content ng-template[debug-id="html-value"]')||o.querySelector("sanitized-content");if(a)return a.textContent.trim();let n=o.querySelector(".data-pair-content")||o.nextElementSibling;if(n)return n.textContent.trim()}}catch(t){console.warn("Erro ao capturar Sales Program:",t)}return""}function Qo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Language")||o.textContent.includes("Idioma"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar Idioma:",t)}return"N/A"}function ea(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Speakeasy ID")||n.textContent.includes("SE ID"));if(e){let n=e.closest(".data-pair")||e.parentElement,i=n.querySelector(".data-pair-content")||n.nextElementSibling;if(i&&i.textContent.trim())return i.textContent.trim()}let o=/Speakeasy.*?(P\d{15,25})/i,a=Array.from(document.querySelectorAll("textarea, .preview, .message-body, .notes-content"));for(let n=a.length-1;n>=0;n--){let r=(a[n].value||a[n].innerText||"").match(o);if(r&&r[1])return r[1]}}catch(t){console.warn("Erro ao capturar SE ID:",t)}return"N/A"}async function Fe(){await St(),Je||await Ct();let t="Cliente",e="";try{let f=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(f&&f.nextElementSibling){let y=f.nextElementSibling.innerText.trim();y&&(t=y)}}catch(b){console.warn("Falha Nome:",b)}try{let f=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(f&&f.nextElementSibling){let y=f.nextElementSibling.innerText.trim();y&&(e=y)}}catch(b){console.warn("Falha URL:",b)}let o=await Vo(),a=Yo(),n=Wo(),i=Xo(),r=Jo(),s=await Ko(),l=Zo(),u=Qo(),p=ea(),g=fe();if(g&&!wt){let b=g.split("@")[0];try{wt=await at(b)}catch(f){console.warn("Falha ao carregar perfil do usu\xE1rio:",f)}}return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:a,cid:n,amName:i,timezone:r,agentName:Ke(),agentEmail:fe(),caseId:s,userProfile:wt,advName:t,site:e,email:o,salesProgram:l,language:u,seId:p}}var Pe=null,Et=null,_e=.3;var Me=localStorage.getItem("cw_sounds_muted")==="true";function $e(){if(!Pe){let t=window.AudioContext||window.webkitAudioContext;t&&(Pe=new t)}return Pe&&Pe.state==="suspended"&&Pe.resume(),Pe}function Wt(t){if(Et)return Et;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),a=o.getChannelData(0);for(let n=0;n<e;n++)a[n]=Math.random()*2-1;return Et=o,o}var $={setMuted:t=>{Me=t,localStorage.setItem("cw_sounds_muted",t)},isMuted:()=>Me,playClick:()=>{if(Me)return;let t=$e();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Wt(t);let a=t.createBiquadFilter();a.type="highpass",a.frequency.value=4e3;let n=t.createGain();n.gain.setValueAtTime(_e*.8,e),n.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{if(Me)return;let t=$e();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let a=t.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(_e*.1,e+.005),a.gain.linearRampToValueAtTime(0,e+.02),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{if(Me)return;let t=$e();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((a,n)=>{let i=t.createOscillator(),r=t.createGain();i.type="sine",i.frequency.value=a,r.gain.setValueAtTime(0,e),r.gain.linearRampToValueAtTime(_e*.6,e+.05),r.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(r),r.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{if(Me)return;let t=$e();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Wt(t);let a=t.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(100,e),a.frequency.exponentialRampToValueAtTime(800,e+.2);let n=t.createGain();n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(_e*.5,e+.05),n.gain.linearRampToValueAtTime(0,e+.25),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{if(Me)return;let t=$e();if(!t)return;let e=t.currentTime,o=t.createOscillator(),a=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),a.gain.setValueAtTime(_e,e),a.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{if(Me)return;let t=$e();if(!t)return;let e=t.currentTime,o=.12,a=t.createOscillator(),n=t.createGain(),i=t.createBiquadFilter();a.type="square",a.frequency.setValueAtTime(400,e),a.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),n.gain.setValueAtTime(_e*4,e),n.gain.exponentialRampToValueAtTime(.001,e+.1),a.connect(i),i.connect(n),n.connect(t.destination),a.start(e),a.stop(e+.12);let r=t.createOscillator(),s=t.createGain();r.type="sine",r.frequency.setValueAtTime(150,e),r.frequency.exponentialRampToValueAtTime(50,e+.15),s.gain.setValueAtTime(_e*1.5,e),s.gain.exponentialRampToValueAtTime(.001,e+.15),r.connect(s),s.connect(t.destination),r.start(e),r.stop(e+.15),[55,55.4,110.5].forEach(u=>{let p=t.createOscillator(),g=t.createGain(),b=t.createBiquadFilter();p.type="sawtooth",p.frequency.value=u,b.type="lowpass",b.frequency.setValueAtTime(30,e),b.frequency.linearRampToValueAtTime(900,e+o+.2),b.frequency.exponentialRampToValueAtTime(40,e+3),g.gain.setValueAtTime(0,e),g.gain.linearRampToValueAtTime(_e*.6,e+o+.1),g.gain.exponentialRampToValueAtTime(.001,e+3.5),p.connect(b),b.connect(g),g.connect(t.destination),p.start(e),p.stop(e+3.6)})},playNotification:()=>{if(Me)return;let t=$e();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(a=>{let n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(a.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(_e*a.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+a.dur),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+a.dur+.1)})},playSwoosh:()=>{$.playGenieOpen()},playReset:()=>{$.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!Pe)return;let a=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!a||a.contains(o.relatedTarget))return;let n=Date.now();n-t<e||($.playHover(),t=n)},{passive:!0})}};var Xt=1e4;function Jt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function Z(t,e={}){let o=document.createElement("div"),a=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:a,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?$.playError():$.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function Kt(t,e=null){let o=0,a=0,n=0,i=0,r=e||t;r.style.cursor="grab",r.onmousedown=s;function s(p){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(p.target.tagName)||p.target.closest(".no-drag"))return;p=p||window.event,r.style.cursor="grabbing",t.style.transition="none";let g=t.getBoundingClientRect();t.style.transform="none",t.style.left=g.left+"px",t.style.top=g.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",Xt++,t.style.zIndex=Xt,n=p.clientX,i=p.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=u,document.onmousemove=l}function l(p){p=p||window.event,p.preventDefault(),o=n-p.clientX,a=i-p.clientY,n=p.clientX,i=p.clientY;let g=t.offsetTop-a,b=t.offsetLeft-o,f=16,y=window.innerWidth,h=window.innerHeight,C=t.offsetWidth,I=t.offsetHeight;b=Be(b,f,y-C-f),g=Be(g,f,h-I-f),t.style.top=g+"px",t.style.left=b+"px"}function u(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var ye={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var At={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Zt={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Qt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};async function ta(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await ne(200);for(let a=0;a<e.length;a++){let n=e.charAt(a),i=document.createElement("span");i.textContent=n,o&&o.parentNode===t?o.before(i):t.appendChild(i);let r=Math.floor(Math.random()*60)+30;a===0&&(r=150),a>e.length-3&&(r=30),await ne(r)}await ne(600),o&&(o.style.display="none")}async function kt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await ne(200);let e=await Ct(),o=Yt(e),a=t.querySelector("#w-icon"),n=t.querySelector("#p1"),i=t.querySelector("#p2"),r=t.querySelector("#p3"),s=t.querySelector("#p-sextou");a&&(a.innerHTML=o.icon),n&&(n.textContent=o.prefix),r&&(r.textContent=o.suffix),await ne(300);let l=a?a.querySelector("svg"):null;if(l&&(l.style.opacity="1",l.style.transform="scale(1)"),await ne(400),n&&(n.style.opacity="1"),$.playStartup(),i&&await ta(i,o.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),o.isFriday&&s){await ne(400),s.style.display="block",s.offsetWidth;let u=s.querySelector(".sextou-badge");u&&(u.style.opacity="1",u.style.transform="scale(1)")}await ne(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await ne(900),t.parentNode&&t.parentNode.removeChild(t)}}function eo(t){if(!t)return;let e=t.getBoundingClientRect(),o=window.innerWidth,a=window.innerHeight,n=24,i=o-e.width-n,r=a-e.height-n,s=parseFloat(t.style.left)||e.left,l=parseFloat(t.style.top)||e.top,u=Be(s,n,i),p=Be(l,n,r);if(u!==s||p!==l){let g=t.style.transition;t.style.transition="left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",t.style.left=`${u}px`,t.style.top=`${p}px`,setTimeout(()=>{t.style.transition=g},300)}}var qe={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Oe(t,e){e.onmousedown=o;function o(a){a.stopPropagation(),a.preventDefault();let n=t.style.transition;t.style.transition="none";let i=a.clientX,r=a.clientY,s=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),l=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),u=i,p=r,g=!1;function b(h){u=h.clientX,p=h.clientY,g||(window.requestAnimationFrame(()=>{f(),g=!1}),g=!0)}function f(){let h=s+(u-i),C=l+(p-r);h>360&&(t.style.width=h+"px"),C>300&&(t.style.height=C+"px")}function y(){document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",y),setTimeout(()=>{t.style.transition=n},50)}document.addEventListener("mousemove",b),document.addEventListener("mouseup",y)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function it(t){if(!t||t==="N/A"||t==="undefined")return"Data indispon\xEDvel";if(String(t).includes(" | "))return t.split(" | ").map(e=>it(e.trim())).filter(e=>e!=="Data indispon\xEDvel").join(" | ");try{let e=new Date(t);if(isNaN(e.getTime()))return"Data indispon\xEDvel";let o=e.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}),a=e.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});return`${o} \xE0s ${a}`}catch{return"Data indispon\xEDvel"}}function to(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}function oo(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),t}function ao(){let t=document.createElement("div");return Object.assign(t.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),t}function ve(t,e={}){return new Promise(o=>{let a=oo(),n=ao(),i=e.danger?"#FF3B30":"#007AFF",r=e.confirmText||(e.danger?"Excluir":"Confirmar");n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${t}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${r}</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)"});let s=p=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(p)},300)},l=n.querySelector("#cw-conf-cancel"),u=n.querySelector("#cw-conf-ok");[l,u].forEach(p=>p.onmouseenter=()=>$.playHover()),l.onclick=()=>{$.playClick(),s(!1)},u.onclick=()=>{$.playClick(),s(!0)}})}function no(t,e=""){return new Promise(o=>{let a=oo(),n=ao();n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${t}</div>
            <input type="text" id="cw-prompt-input" value="${e}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a);let i=n.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let r=u=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(u)},300)},s=n.querySelector("#cw-prompt-cancel"),l=n.querySelector("#cw-prompt-ok");[s,l].forEach(u=>u.onmouseenter=()=>$.playHover()),s.onclick=()=>{$.playClick(),r(null)},l.onclick=()=>{$.playClick(),r(i.value)},i.onkeydown=u=>{u.key==="Enter"&&l.click(),u.key==="Escape"&&s.click()}})}var Tt=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.activeFields=[];let e=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(e||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(e){this.currentCaseType!==e&&(this.currentCaseType=e,this.isDirty=!0,this.notify())}setLanguage(e){this.currentLang!==e&&(this.currentLang=e,this.notify())}setPortugalCase(e){this.isPortugalCase!==e&&(this.isPortugalCase=e,this.isDirty=!0,this.notify())}setConsent(e){this.consent!==e&&(this.consent=e,this.isDirty=!0,this.notify())}setTagSupportUsed(e){this.tagSupportUsed=e,e||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(e){this.activeFields=[...e],this.isDirty=!0,this.notify()}removeField(e){this.activeFields=this.activeFields.filter(o=>o!==e),this.isDirty=!0,this.notify()}addFieldAt(e,o){this.activeFields.includes(e)||(this.activeFields.splice(o,0,e),this.isDirty=!0,this.notify())}setForcedScreenshots(e){this.forcedScreenshots=new Set(e),this.isDirty=!0,this.notify()}toggleForcedScreenshot(e,o){o?this.forcedScreenshots.add(e):this.forcedScreenshots.delete(e),this.isDirty=!0,this.notify()}setStatus(e){this.currentStatus!==e&&(this.currentStatus=e,this.isDirty=!0,this.notify())}setSubStatus(e){this.currentSubStatus!==e&&(this.currentSubStatus=e,this.isDirty=!0,this.notify())}setScreenshotMode(e){this.screenshotMode=e,this.notify()}setActiveTasks(e){this.activeTasks=e,this.isDirty=!0,this.notify()}toggleFavorite(e){this.favorites.has(e)?this.favorites.delete(e):this.favorites.add(e),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(e,o){this.formData[e]!==o&&(this.formData[e]=o,this.isDirty=!0,this.notify())}listeners=[];subscribe(e){return this.listeners.push(e),()=>this.listeners=this.listeners.filter(o=>o!==e)}notify(){this.listeners.forEach(e=>e(this))}},W=new Tt;var oa={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},io={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function ge(t,e,o,a,n,i){let r=document.createElement("div");Object.assign(r.style,oa),Kt(t,r);let s=document.createElement("div");if(Object.assign(s.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let I=document.createElement("style");I.id="cw-header-anim",I.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(I)}s.style.animation="cw-header-flow 6s linear infinite",r.appendChild(s),n&&(n.googleLine=s);let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center",gap:"12px"});let u=document.createElement("img");u.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(u.style,{width:"20px",height:"20px",pointerEvents:"none"});let p=document.createElement("span");p.textContent=e,l.appendChild(u),l.appendChild(p);let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center",gap:"4px"});let b='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',f='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',y=document.createElement("div");y.innerHTML=b,Object.assign(y.style,io),y.title="Sobre & Feedback",y.classList.add("no-drag"),y.onmouseenter=()=>{y.style.background="rgba(255,255,255,0.1)",y.style.color="#FFF"},y.onmouseleave=()=>{y.style.color!=="rgb(138, 180, 248)"&&(y.style.background="transparent",y.style.color="#9AA0A6")};let h=document.createElement("div");h.innerHTML=f,Object.assign(h.style,io),h.title="Fechar",h.classList.add("no-drag","cw-header-close"),h.onmouseenter=()=>{h.style.background="rgba(242, 139, 130, 0.2)",h.style.color="#F28B82"},h.onmouseleave=()=>{h.style.background="transparent",h.style.color="#9AA0A6"},h.onmousedown=I=>I.stopPropagation(),y.onmousedown=I=>I.stopPropagation(),h.onclick=i;let C=aa(t,e,o,a);return y.onclick=I=>{I.stopPropagation(),C.style.opacity==="1"?(C.style.opacity="0",C.style.pointerEvents="none",y.style.color="#9AA0A6",y.style.background="transparent"):(C.style.opacity="1",C.style.pointerEvents="auto",y.style.color="#8AB4F8",y.style.background="rgba(138, 180, 248, 0.1)")},g.appendChild(y),g.appendChild(h),r.appendChild(l),r.appendChild(g),r}function aa(t,e,o,a){let n=document.createElement("div");return Object.assign(n.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),n.innerHTML=`
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
    `,setTimeout(()=>{let i=n.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let r=n.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{n.style.opacity="0",n.style.pointerEvents="none"})},0),t.appendChild(n),n}var B={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},ue={small:"8px",medium:"12px",large:"20px",pill:"100px"},De={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},ce="cubic-bezier(0.34, 1.56, 0.64, 1)",na={width:"100%",padding:"14px 16px",borderRadius:ue.medium,border:`1.5px solid ${B.border}`,backgroundColor:B.bgInput,fontSize:"14px",color:B.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${ce}`,outline:"none"},Ba={...na,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},$a={fontSize:"12px",fontWeight:"700",color:B.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},Pa={display:"block",fontSize:"14px",fontWeight:"600",color:B.text,marginBottom:"10px",marginTop:"20px"},Ha={fontSize:"12px",color:B.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},Ft={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:B.primary},Ga={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:B.text,cursor:"pointer",padding:"16px 20px",backgroundColor:B.surface,border:`1px solid ${B.border}`,borderRadius:ue.large,transition:`all 0.4s ${ce}`,userSelect:"none",boxShadow:De.subtle},ja={padding:"14px 28px",color:"#fff",backgroundColor:B.primary,border:"none",borderRadius:ue.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${ce}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},Ua={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${B.primary}`,color:B.primary,borderRadius:ue.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${ce}`},Va={background:"transparent",border:`1px solid ${B.border}`,borderRadius:ue.pill,color:B.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${ce}`};function so(t,e){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,ye,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${ce}, height 0.4s ${ce}, transform 0.4s ${ce}, opacity 0.3s ease`,borderRadius:ue.large,boxShadow:De.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let a={popup:o,googleLine:null},n=ge(o,"Case Notes",t,"Gera notas padronizadas com excel\xEAncia visual.",a,e);o.appendChild(n);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:B.surface}),o.appendChild(i);let r=document.createElement("div");r.textContent="created by lucaste@",Object.assign(r.style,Qt,{padding:"16px 24px",borderTop:`1px solid ${B.bgInput}`,color:B.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),o.appendChild(r);let s=document.createElement("div");return Object.assign(s.style,qe),s.className="no-drag",o.appendChild(s),Oe(o,s),ia(),{popup:o,content:i,header:n,animRefs:a,credit:r}}function ia(){if(document.getElementById("cw-notes-refactor-styles"))return;let t=document.createElement("style");t.id="cw-notes-refactor-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}var Ce={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} O que foi feito:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evid\xEAncias de Contato",ligacao_1:"Liga\xE7\xE3o 1",ligacao_2:"Liga\xE7\xE3o 2",mensagem_am:"Mensagem para AM"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Qu\xE9 se hizo:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evidencias de Contacto",ligacao_1:"Llamada 1",ligacao_2:"Llamada 2",mensagem_am:"Mensaje para AM"}},Ie={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},sa=["GTM_GA4_VERIFICADO","MULTIPLE_CIDS"],ra=["REASON_COMMENTS"];function Ze(t){let e=[...ra];return t?.requiresTasks&&e.push("GTM_GA4_VERIFICADO"),e}function st(t){let e=[...sa,...t?.extraOptionalFields||[]],o=Ze(t);return e.filter(a=>!o.includes(a))}var Le={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],extraOptionalFields:["PROXIMOS_PASSOS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Ye={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},We=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],rt=["CONSIDERACOES","COMENTARIOS"],lt={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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

Irei solicitar descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var ro="cw-automation-styles";if(!document.getElementById(ro)){let t=document.createElement("style");t.id=ro,t.innerHTML=`
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
    `,document.head.appendChild(t)}function lo(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function ct(t){await St();let e=document.getElementById(t),o="";lo(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let a=document.querySelector('material-button[debug-id="dock-item-case-log"]');a&&!a.classList.contains("selected")&&(Ve(a),await ne(1200));let n=document.querySelector("search-filter dropdown-button .button");if(n&&!(n.innerText||"").includes("All")){Ve(n),await ne(600);let b=document.querySelector('material-checkbox[debug-id="check-all-box"]');b&&b.getAttribute("aria-checked")!=="true"&&(Ve(b),await ne(300));let f=document.querySelector('material-button[debug-id="apply-filter"]');f&&(Ve(f),await ne(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await ne(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let g=r.length-1;g>=0;g--){let b=r[g],f=b.querySelector("i.material-icons-extended"),y=f&&f.innerText.trim()==="phone_in_talk",h=b.innerText||"",C=h.includes("Agent joined")||h.includes("outbound-call")||h.includes("Speakeasy");if(y||C){b.getAttribute("aria-expanded")==="true"||(e&&(e.placeholder="Lendo mensagem..."),Ve(b),await ne(1e3));break}}let l=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),u=/Speakeasy.*?(P\d{15,25})/i,p=null;for(let g=l.length-1;g>=0;g--){let b=l[g];if(b.offsetParent===null)continue;let f=(b.innerText||"").match(u);if(f&&f[1]){p=f[1];break}}if(e)if(p){try{await navigator.clipboard.writeText(p)}catch{}e.tagName==="INPUT"||e.tagName==="TEXTAREA"?e.value=p:e.textContent=p,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),$.playSuccess(),Z(`ID Localizado: ${p}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else $.playError(),Z("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(a){console.error("Erro na automa\xE7\xE3o:",a),Z("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),lo(!1)}}function co(t){t.dataset.bulletEnabled!=="true"&&(t.dataset.bulletEnabled="true",(t.value.trim()===""||t.value.trim()==="\u2022")&&(t.value="\u2022 "),t.addEventListener("keydown",function(e){let o=this.selectionStart,a=this.selectionEnd,n=this.value,i=n.lastIndexOf(`
`,o-1)+1,r=n.substring(i,o);if(e.key==="Enter"){e.preventDefault();let s=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=n.substring(0,i)+`
`+n.substring(a),this.selectionStart=this.selectionEnd=i+1;return}let l=`
`+s;this.value=n.substring(0,o)+l+n.substring(a),this.selectionStart=this.selectionEnd=o+l.length}else if(e.key==="Tab")e.preventDefault(),e.shiftKey?r.startsWith("  ")&&(this.value=n.substring(0,i)+r.substring(2)+n.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=n.substring(0,i)+"  "+r+n.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(e.key==="Backspace"&&o===a&&o>0){let s=n.substring(0,o);s.endsWith("\u2022 ")?(e.preventDefault(),this.value=s.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2):s.endsWith("  ")&&r.trim().startsWith("\u2022")&&(e.preventDefault(),this.value=s.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2)}}))}function dt(t,e,o){e.innerHTML="";let a=Le[t];if(!a)return;let n=Ze(a);if(o.activeFields.forEach(s=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(s))return;let l=`field-${s}`,u=document.createElement("label"),p=y=>Ce[o.currentLang]?.[y]||Ce.pt?.[y]||y;u.textContent=p(s.toLowerCase())!==s.toLowerCase()?p(s.toLowerCase()):s.replace(/_/g," ").replace(/\b\w/g,y=>y.toUpperCase())+":",Object.assign(u.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:B.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let g=n.includes(s),b=document.createElement("span");if(b.textContent=u.textContent,g){let y=document.createElement("span");y.textContent=" *",y.style.color=B.error,b.appendChild(y)}if(u.innerHTML="",u.appendChild(b),s==="SPEAKEASY_ID"){let y=document.createElement("button");y.innerHTML="\u2728 Auto Busca",y.style.cssText=`font-size: 11px; font-weight: 700; color: ${B.primary}; background-color: ${B.primaryBg}; border: none; border-radius: ${ue.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${ce};`,y.onmouseenter=()=>y.style.backgroundColor="#d2e3fc",y.onmouseleave=()=>y.style.backgroundColor=B.primaryBg,y.onclick=h=>{h.preventDefault(),ct(l)},u.appendChild(y)}if(!g){let y=document.createElement("button");y.innerHTML="\u2715",y.style.cssText=`font-size: 14px; background: ${B.bgInput}; border: none; color: ${B.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${ce};`,y.onmouseenter=()=>{y.style.background=B.error,y.style.color=B.surface},y.onmouseleave=()=>{y.style.background=B.bgInput,y.style.color=B.textSub},y.onclick=async h=>{h.preventDefault(),await ve(`Tem certeza que deseja remover o campo "${b.textContent.replace(":","")}"?`)&&(o.removeField(s),dt(t,e,o))},u.appendChild(y)}let f;We.includes(s)?(f=document.createElement("textarea"),f.classList.add("bullet-textarea","cw-textarea"),f.placeholder="Utilize marcadores para detalhar...",co(f)):rt.includes(s)?(f=document.createElement("textarea"),f.classList.add("cw-textarea"),f.placeholder="Descreva as considera\xE7\xF5es..."):(f=document.createElement("input"),f.type="text",f.classList.add("cw-input")),f.id=l,f.value=o.formData[l]||"",f.addEventListener("input",y=>o.updateField(l,y.target.value)),e.appendChild(u),e.appendChild(f)}),o.activeFields.includes("CONSENTIU_GRAVACAO")){let s=p=>Ce[o.currentLang]?.[p]||Ce.pt?.[p]||p,l=document.createElement("label");l.textContent=s("consentiu_gravacao"),Object.assign(l.style,{display:"block",fontSize:"13px",fontWeight:"700",color:B.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let u=document.createElement("select");u.className="cw-select",u.innerHTML=`
            <option value="false">${s("nao")}</option>
            <option value="true">${s("sim")}</option>
        `,u.value=o.consent?"true":"false",u.onchange=()=>o.setConsent(u.value==="true"),e.appendChild(l),e.appendChild(u)}let i=st(a),r=(a.templateFields||[]).filter(s=>i.includes(s)&&!o.activeFields.includes(s));if(r.length>0){let s=u=>Ce[o.currentLang]?.[u]||Ce.pt?.[u]||u,l=document.createElement("div");Object.assign(l.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"24px"}),r.forEach(u=>{let p=s(u.toLowerCase())!==u.toLowerCase()?s(u.toLowerCase()):u.replace(/_/g," ").replace(/\b\w/g,b=>b.toUpperCase())+":",g=document.createElement("button");g.type="button",g.textContent=`+ ${p.replace(/:$/,"")}`,g.style.cssText=`font-size: 12px; font-weight: 600; color: ${B.primary}; background-color: ${B.primaryBg}; border: none; border-radius: ${ue.pill}; padding: 6px 14px; cursor: pointer; transition: all 0.2s ${ce};`,g.onmouseenter=()=>g.style.backgroundColor="#d2e3fc",g.onmouseleave=()=>g.style.backgroundColor=B.primaryBg,g.onclick=b=>{b.preventDefault(),o.addFieldAt(u,o.activeFields.length),dt(t,e,o)},l.appendChild(g)}),e.appendChild(l)}}function It(t,e,o,a=null){let n=t.currentSubStatus;if(!n)return null;let i=Le[n],r=Ce[t.currentLang]||Ce.pt,s=p=>r[p]||Ce.pt?.[p]||p,l='style="margin-bottom: 12px; padding-left: 30px;"',u="";if(t.activeFields.forEach(p=>{let g=s(p.toLowerCase()),b="N/A";if(p==="label_substatus")g=s("label_substatus"),b=i.name;else if(p==="TAGS_IMPLEMENTED"){g=s("tags_implemented");let f=[];e.getCheckedElements().forEach(h=>{let C=h.value,I=Ie[C],O=h.count||1,_=C==="ads_conversion_tracking"||C==="ads_enhanced_conversions";t.tagSupportUsed&&_&&!t.forcedScreenshots.has(C)?f.push(`${I.name} - ${s("ts_output_disclaimer")}`):f.push(O>1?`${I.name} (x${O})`:I.name)}),b=f.join(", ")||"N/A"}else if(p==="SCREENSHOTS_LIST"){g=s("screenshots_list");let f="",y=e.screenshotsElement;y&&Array.from(y.querySelectorAll('input[id^="name-"]')).forEach(C=>{let I=C.value,O=C.closest(".cw-screen-card");if(O){let _=O.querySelectorAll('input[id^="screen-"]'),P=!1,J="";_.forEach(oe=>{let F=oe.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",z=oe.value.trim();z&&(J+=`<li>${F} - ${z}</li>`,P=!0)}),P&&(f+=`<div style="margin-bottom: 8px;"><b>${I}</b><ul ${l}>${J}</ul></div>`)}}),b=f||"N/A"}else if(p==="CASO_PORTUGAL")g=s("caso_portugal"),b=s("sim");else if(p==="CONSENTIU_GRAVACAO")g=s("consentiu_gravacao"),b=t.consent?s("sim"):s("nao");else{let f=`field-${p}`,y=t.formData[f],h="";if(i.fieldPrefixes&&i.fieldPrefixes[p]&&(h=i.fieldPrefixes[p]+" "),y&&y.trim()!==""&&y.trim()!=="\u2022"){let C=y.trim();if(We.includes(p)){let I=C.split(`
`).map(O=>O.trim()).filter(O=>O!==""&&O!=="\u2022").map(O=>O.startsWith("\u2022 ")?O.substring(2):O).map(O=>`<li>${O}</li>`).join("");b=I?`${h}<ul ${l}>${I}</ul>`:"N/A"}else rt.includes(p)?b=h+C.split(`
`).filter(I=>I.trim()!=="").map(I=>`<p style="margin: 0 0 8px 0;">${I}</p>`).join(""):b=h+C}else h&&(b=h.trim())}u+=`<b>${g}</b><br>${b}<br><br>`}),a){let p="";a.l1&&(p+=`<li>${s("ligacao_1")}: ${a.l1}</li>`),a.l2&&(p+=`<li>${s("ligacao_2")}: ${a.l2}</li>`),a.msg&&(p+=`<li>${s("mensagem_am")}: ${a.msg}</li>`),p&&(u+=`<b>${s("evidencias_contato")}</b><br><ul ${l}>${p}</ul><br>`)}if(i.customFooter&&(u+=`${i.customFooter}<br><br>`),o?.getOutput){let p=o.getOutput();p&&(u+=`${p}<br><br>`)}return u+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",u.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}function po(t){let e=document.createElement("div");e.className="cw-step-scenarios";let o="Passe o mouse sobre um cen\xE1rio para visualizar o texto...",a=document.createElement("div");Object.assign(a.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let i=document.createElement("span");i.style.transition="opacity 0.2s ease, transform 0.2s ease",i.textContent=o,n.appendChild(i);let r=new Set,s=null;return e.render=(l,u)=>{r.clear();let p=Object.entries(lt).filter(([g,b])=>{let f=!b.type||b.type==="all"||b.type===u,y=!1;return l.startsWith("NI_")?y=g.includes("-ni-")||g.includes("attempted"):l.startsWith("SO_")?y=g.includes("gtm")||g.includes("whatsapp")||g.includes("form")||g.includes("ecw4")||g.includes("ga4")||g.includes("-so-"):l.startsWith("AS_")?y=g.includes("-as-"):l.startsWith("IN_")?y=g.includes("-in-"):l.startsWith("DC_")&&(y=g.includes("-dc-")),f&&y});a.innerHTML="",p.forEach(([g,b])=>{let f=document.createElement("div"),y=g.replace("quickfill-","").replace(/-/g," ");f.textContent=y,f.dataset.id=g,Object.assign(f.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let h=b["field-REASON_COMMENTS"]||b["field-CONTEXTO_CALL"]||g;f.onmouseenter=()=>{s&&clearTimeout(s),r.has(g)||(f.style.background="#f1f3f4"),i.style.opacity="0",i.style.transform="translateY(5px)",s=setTimeout(()=>{i.textContent=h.substring(0,120)+(h.length>120?"...":""),i.style.opacity="1",i.style.transform="translateY(0)"},50)},f.onmouseleave=()=>{s&&clearTimeout(s),r.has(g)||(f.style.background="#ffffff"),s=setTimeout(()=>{r.size===0&&(i.style.opacity="0",setTimeout(()=>{i.textContent=o,i.style.opacity="1"},50))},100)},f.onclick=()=>{$.playClick();let C=!r.has(g);C?(r.add(g),f.style.background="#e8f0fe",f.style.borderColor="#1a73e8",f.style.color="#1967d2"):(r.delete(g),f.style.background="#ffffff",f.style.borderColor="#dadce0",f.style.color="#3c4043"),t(g,C)},a.appendChild(f)}),p.length===0?e.style.display="none":e.style.display="block"},e.appendChild(a),e.appendChild(n),e}function la(t){return t==="ads_conversion_tracking"||t==="ads_enhanced_conversions"}function Lt(t,e){return e.tagSupportUsed&&la(t)&&!e.forcedScreenshots.has(t)}var re={bg:B.bgInput,white:B.surface,border:B.border,textMain:B.text,textSub:B.textSub,blue:B.blue,blueLight:B.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:B.blue,bg:B.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:B.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:B.primary,bg:B.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:B.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},He={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function uo(t,e,o){let a={};o&&o.subscribe(()=>{J(),oe()});function n(q){let F=q.toLowerCase();return F.includes("ads")||F.includes("conversion")||F.includes("remarketing")?re.brands.ads:F.includes("ga4")||F.includes("analytics")?re.brands.ga4:F.includes("gtm")||F.includes("tag manager")||F.includes("container")?re.brands.gtm:F.includes("merchant")||F.includes("shopping")||F.includes("feed")?re.brands.gmc:re.brands.default}let i=Object.entries(Ie).filter(([q,F])=>F.popular),r={};Object.entries(Ie).forEach(([q,F])=>{if(F.popular)return;let z=n(F.name);r[z.label]||(r[z.label]={brand:z,tasks:[]}),r[z.label].tasks.push({key:q,...F})});let s="cw-zen-tasks";if(!document.getElementById(s)){let q=document.createElement("style");q.id=s,q.innerHTML=`
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
        `,document.head.appendChild(q)}let l=document.createElement("div");l.className="cw-zen-container";let u=document.createElement("div");Object.assign(u.style,{display:"none"});let p=document.createElement("div");p.className="cw-screens-container",u.appendChild(p),l.innerHTML=`
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
    `;let g=l.querySelector(".cw-hero-grid"),b=l.querySelector(".cw-acc-container"),f=l.querySelector(".cw-results-container"),y=l.querySelector(".cw-search-input"),h=l.querySelector(".cw-status-bar"),C=l.querySelector(".cw-status-text"),I=l.querySelector(".cw-footer-icons");function O(q,F){return z=>{if(z.target.closest(".cw-step-btn-hero, .cw-step-btn-list"))return;let V=a[q]?a[q].count:0;P(q,V>0?-V:1,F)}}i.forEach(([q,F])=>{let z=n(F.name),V=document.createElement("div");V.className="cw-hero-card",V.id=`hero-${q}`,V.style.setProperty("--hero-color",z.color),V.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${He[z.icon]}</div>
                <div class="cw-hero-label">${F.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn-hero minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-hero plus">+</div>
            </div>
        `,V.onclick=O(q,F),V.querySelector(".minus").onclick=()=>P(q,-1,F),V.querySelector(".plus").onclick=()=>P(q,1,F),V.dataset.color=z.color,g.appendChild(V)});function _(q,F){let z=n(F.name),V=document.createElement("div");return V.className="cw-task-item",V.dataset.id=q,V.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${z.bg}; color:${z.color}">
                    ${He[z.icon]||He.default}
                </div>
                <div class="cw-task-label">${F.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn-list minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn-list plus">+</div>
            </div>
        `,V.onclick=O(q,F),V.querySelector(".minus").onclick=()=>P(q,-1,F),V.querySelector(".plus").onclick=()=>P(q,1,F),V}Object.entries(r).forEach(([q,F])=>{let z=document.createElement("div");z.className="cw-acc-group";let V=document.createElement("div");V.className="cw-acc-header",V.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${F.brand.color}"></div>
                ${q}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,V.onclick=()=>{b.querySelectorAll(".cw-acc-group.open").forEach(D=>{D!==z&&D.classList.remove("open")}),z.classList.toggle("open")};let M=document.createElement("div");M.className="cw-acc-body",F.tasks.forEach(D=>{let Y=_(D.key,D);M.appendChild(Y)}),z.appendChild(V),z.appendChild(M),b.appendChild(z)});function P(q,F,z){a[q]||(a[q]={count:0,data:z,brand:n(z.name)}),a[q].count+=F,a[q].count<=0&&delete a[q],J(),oe(),t&&t()}function J(){i.forEach(([M])=>{let D=g.querySelector(`#hero-${M}`);if(!D)return;let Y=a[M];Y?(D.classList.add("active"),D.querySelector(".cw-step-val").textContent=Y.count,D.querySelector(".cw-step-val").style.color=D.dataset.color,D.classList.toggle("ts-success",Lt(M,o))):(D.classList.remove("active"),D.classList.remove("ts-success"))}),l.querySelectorAll(".cw-task-item").forEach(M=>{let D=M.dataset.id,Y=a[D];Y?(M.classList.add("selected"),M.querySelector(".cw-step-val").textContent=Y.count,M.classList.toggle("ts-success",Lt(D,o))):(M.classList.remove("selected"),M.classList.remove("ts-success"))});let F=Object.keys(a),z=0,V=[];if(F.forEach(M=>{let D=a[M];z+=D.count;for(let Y=0;Y<D.count;Y++)V.length<6&&V.push(D.brand)}),z>0){h.classList.add("visible");let M=z>1?"A\xE7\xF5es":"A\xE7\xE3o",D=z>1?"definidas":"definida";C.textContent=`${z} ${M} ${D}`,I.innerHTML="",V.forEach(Y=>{let k=document.createElement("div");k.className="cw-mini-icon-status",k.innerHTML=He[Y.icon]||He.default;let L=k.querySelector("svg");L&&(L.style.width="14px",L.style.height="14px"),I.appendChild(k)})}else h.classList.remove("visible"),C.textContent="",I.innerHTML=""}y.addEventListener("input",q=>{let F=q.target.value.toLowerCase();if(F.length>0){b.style.display="none",f.style.display="block",f.innerHTML="";let z=!1;Object.entries(Ie).forEach(([V,M])=>{if(M.name.toLowerCase().includes(F)){z=!0;let D=_(V,M);a[V]&&(D.classList.add("selected"),D.querySelector(".cw-step-val").textContent=a[V].count),f.appendChild(D)}}),z||(f.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else b.style.display="block",f.style.display="none"});function oe(){let q={};p.querySelectorAll(".cw-input-field").forEach(M=>{q[M.id]=M.value}),p.innerHTML="";let F=Object.keys(a),z=!1;if(F.length===0){p.innerHTML=`<div class="cw-empty-state">${e("selecione_tarefas")}</div>`,u.style.display="none";return}let V=document.createElement("div");V.className="cw-info-banner",V.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,p.appendChild(V),F.forEach(M=>{let D=a[M].data,Y=a[M].count,k=a[M].brand,L=Lt(M,o),G=o.screenshotMode||"implementation",R=D.screenshots?.[G]||[];if(R.length>0||L){z=!0;for(let ee=1;ee<=Y;ee++){let ae=document.createElement("div");ae.className="cw-screen-card",L&&ae.classList.add("ts-success"),ae.style.setProperty("--brand-color",k.color),ae.style.setProperty("--brand-bg",k.bg),ae.style.setProperty("--brand-shadow",k.color+"40");let te=document.createElement("div");te.className="cw-card-header";let j=document.createElement("div");j.className="cw-card-icon",j.innerHTML=He[k.icon]||He.default;let U=document.createElement("div");U.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let K=document.createElement("input");K.className="cw-card-title-input",K.id=`name-${M}-${ee}`,K.value=`${D.name}${Y>1?" #"+ee:""}`,K.title="Clique para renomear esta task";let c=document.createElement("span");if(c.className="cw-edit-hint",c.innerHTML="\u270E Renomear",U.appendChild(K),U.appendChild(c),te.appendChild(j),te.appendChild(U),ae.appendChild(te),L){let m=document.createElement("div");m.className="cw-ts-disclaimer-box",m.innerHTML=`
                <span>${e("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${e("incluir_mesmo_assim")}</button>
            `,m.querySelector("button").onclick=()=>{o.toggleForcedScreenshot(M,!0)},ae.appendChild(m)}else R.forEach((m,v)=>{let x=document.createElement("div");x.className="cw-input-group";let w=document.createElement("label");w.className="cw-input-label",w.textContent=m;let E=document.createElement("input");E.className="cw-input-field",E.id=`screen-${M}-${ee}-${v}`,E.placeholder="Cole o link aqui...",E.setAttribute("autocomplete","off"),q[E.id]&&(E.value=q[E.id],E.value.trim().length>5&&E.classList.add("filled")),E.addEventListener("input",()=>{E.value.trim().length>5?E.classList.add("filled"):E.classList.remove("filled")});let S=document.createElement("div");S.className="cw-input-check",S.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',x.appendChild(w),x.appendChild(E),x.appendChild(S),ae.appendChild(x)});p.appendChild(ae)}}}),u.style.display=z?"block":"none"}return{selectionElement:l,screenshotsElement:u,updateSubStatus:()=>oe(),getCheckedElements:()=>Object.keys(a).map(q=>({value:q,count:a[q].count})),setTaskCount:(q,F)=>{a[q]&&delete a[q],F>0&&Ie[q]&&P(q,F,Ie[q])},toggleTask:(q,F=!0)=>{let z=a[q];F&&!z?P(q,1,Ie[q]):!F&&z&&P(q,-z.count,Ie[q])},setLanguage:q=>{e=q;let F=l.querySelector(".js-hero-title");F&&(F.textContent=e("acesso_rapido"));let z=l.querySelector(".cw-search-input");z&&(z.placeholder=e("buscar_catalogo")),oe()},reset:()=>{for(let q in a)delete a[q];y.value="",b.style.display="block",f.style.display="none",J(),oe()}}}var ca={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},da={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},pa={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},ua={display:"flex",gap:"20px",marginBottom:"12px"};function mo(t){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,ca);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=t("utilizou_tag_support"),Object.assign(o.style,At,{marginTop:"0"});let a=document.createElement("div");Object.assign(a.style,ua);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,Ft);let i=document.createElement("label");i.textContent="Sim";let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(n),r.appendChild(i);let s=document.createElement("input");s.type="radio",s.name="ts_usage_mod",s.value="N\xE3o",s.checked=!0,Object.assign(s.style,Ft);let l=document.createElement("label");l.textContent="N\xE3o";let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center"}),u.appendChild(s),u.appendChild(l),a.appendChild(r),a.appendChild(u);let p=document.createElement("div");p.style.display="block";let g=document.createElement("label");g.className="js-ts-reason-label",g.textContent=t("motivo_ts"),Object.assign(g.style,At,{fontSize:"12px"});let b=document.createElement("input");b.type="text",Object.assign(b.style,pa);let f=document.createElement("div");f.className="js-ts-warning",f.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(f.style,da),p.appendChild(g),p.appendChild(b),p.appendChild(f),e.appendChild(o),e.appendChild(a),e.appendChild(p),n.onchange=()=>{p.style.display="none",W.setTagSupportUsed(!0)},s.onchange=()=>{p.style.display="block",W.setTagSupportUsed(!1)};function y(O,_){if(e.style.display="none",!O||!_||_.length===0)return;_.some(J=>J==="ads_conversion_tracking"||J==="ads_enhanced_conversions")?e.style.display="block":(I(),W.setTagSupportUsed(!1))}function h(){if(e.style.display==="none")return"";let O=`<br><b>Utilizou Tag Support?</b> ${n.checked?"\u2705 Sim":"\u274C N\xE3o"}`;return s.checked&&b.value.trim()!==""&&(O+=`<br><b>Motivo:</b> ${b.value}`),O+="<br>",O}function C(O){t=O,o.textContent=t("utilizou_tag_support"),g.textContent=t("motivo_ts"),f.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`}function I(){e.style.display="none",s.checked=!0,n.checked=!1,p.style.display="block",b.value=""}return{element:e,updateVisibility:y,getOutput:h,setLanguage:C,reset:I}}var qt="cw_notes_parking_lot",pt="cw_notes_emergency_save";var we={getAll:()=>{try{return JSON.parse(localStorage.getItem(qt)||"[]")}catch{return[]}},save:t=>{let e=we.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...t};return e.unshift(o),e.length>5&&e.pop(),localStorage.setItem(qt,JSON.stringify(e)),o},delete:t=>{let e=we.getAll();return e=e.filter(o=>o.id!==t),localStorage.setItem(qt,JSON.stringify(e)),e},getCount:()=>we.getAll().length,saveEmergency:t=>{let e={timestamp:Date.now(),data:t};localStorage.setItem(pt,JSON.stringify(e))},getEmergency:()=>{try{let t=localStorage.getItem(pt);if(!t)return null;let e=JSON.parse(t);return Date.now()-e.timestamp>432e5?(localStorage.removeItem(pt),null):!e.data||!e.data.subStatus?null:e.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(pt)}};var ut=["lucaste","ricardogi"];var le={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"};function mt(t){let e=document.getElementById("cw-btn-notes");if(!e)return;let o=e.querySelector(".cw-dot-dirty");t?o||(o=document.createElement("div"),o.className="cw-dot-dirty",e.appendChild(o)):o&&o.remove()}function go(t){let e="cw-command-center-style";if(!document.getElementById(e)){let h=document.createElement("style");h.id=e,h.innerHTML=`
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
        `,document.head.appendChild(h)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>'},a=document.createElement("div");a.id="cw-floating-trigger",a.className="cw-pill side-right collapsed",a.innerHTML=`
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
    `;let n=document.createElement("div");n.className="cw-focus-backdrop",document.body.appendChild(n),document.body.appendChild(a);let i=(h,C)=>{$.playClick(),a.querySelector(`.${h}`).classList.toggle("active"),C()};if(a.querySelector(".notes").onclick=h=>{h.stopPropagation(),i("notes",t.toggleNotes)},a.querySelector(".bauform").onclick=h=>{h.stopPropagation(),i("bauform",t.toggleBAUForm)},a.querySelector(".email").onclick=h=>{h.stopPropagation(),i("email",t.toggleEmail)},a.querySelector(".script").onclick=h=>{h.stopPropagation(),i("script",t.toggleScript)},a.querySelector(".links").onclick=h=>{h.stopPropagation(),i("links",t.toggleLinks)},a.querySelector(".library").onclick=h=>{h.stopPropagation(),i("library",t.toggleLibrary)},a.querySelector(".timezone").onclick=h=>{h.stopPropagation(),i("timezone",t.toggleTimezone)},a.querySelector(".configs").onclick=h=>{h.stopPropagation(),i("configs",t.toggleConfigs)},a.querySelector(".broadcast").onclick=h=>{h.stopPropagation(),i("broadcast",()=>{let C=h.currentTarget.querySelector(".cw-badge");C&&C.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},a.querySelectorAll(".cw-btn").forEach(h=>{h.addEventListener("mouseenter",()=>$.playHover())}),t.broadcastControl&&t.broadcastControl.hasUnread){let h=document.createElement("div");h.className="cw-badge",a.querySelector(".broadcast").appendChild(h)}let r=null;a.onmouseleave=()=>{a.querySelector(".cw-btn.active")||a.classList.contains("processing-center")||(r=setTimeout(()=>{a.classList.add("collapsed")},3e3))},a.onmouseenter=()=>{r&&clearTimeout(r)},(async function(){let C=()=>{let O=fe();if(O){let _=O.split("@")[0].toLowerCase();if(ut.includes(_)){let P=a.querySelector("#cw-admin-tag");P&&P.classList.add("visible")}}else setTimeout(C,2e3)};C(),await ne(2800),a.classList.add("docked"),await ne(300);let I=a.querySelectorAll(".cw-btn");a.querySelectorAll(".cw-sep").forEach(O=>O.classList.add("visible"));for(let O=0;O<I.length;O++)I[O].classList.add("popped"),await ne(40);await ne(100),a.classList.add("system-check"),await ne(100),a.classList.add("system-ready"),setTimeout(()=>a.classList.remove("system-ready"),400)})();let s=!1,l,u,p,g,b=3;a.onmousedown=h=>{if(h.target.closest("button"))return;h.preventDefault(),l=h.clientX,u=h.clientY;let C=a.getBoundingClientRect();p=C.left,g=C.top,document.addEventListener("mousemove",f),document.addEventListener("mouseup",y)};function f(h){let C=h.clientX-l,I=h.clientY-u;!s&&Math.sqrt(C*C+I*I)>b&&(s=!0,a.classList.add("dragging"),a.style.transition="none",r&&clearTimeout(r)),s&&(a.style.left=`${p+C}px`,a.style.top=`${g+I}px`,a.style.right="auto",a.style.bottom="auto",a.style.transform="none")}function y(h){if(document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",y),s){s=!1,a.classList.remove("dragging");let C=window.innerWidth,I=window.innerHeight,O=a.getBoundingClientRect(),_=O.left+O.width/2,P;_<C/2?(P=24,a.classList.remove("side-right"),a.classList.add("side-left")):(P=C-O.width-24,a.classList.remove("side-left"),a.classList.add("side-right"));let J=Be(O.top,24,I-O.height-24);setTimeout(()=>{a.style.setProperty("transition","left 0.3s cubic-bezier(0.4, 0, 0.2, 1), top 0.3s cubic-bezier(0.4, 0, 0.2, 1)","important"),a.style.left=`${P}px`,a.style.top=`${J}px`,a.style.bottom="auto",a.style.transform=""},10),setTimeout(()=>{a.style.transition="",a.style.removeProperty("transition")},700)}else{let C=a.querySelector(".cw-btn.active"),I=h.target.closest("button");if(a.classList.contains("collapsed")){let O=a.getBoundingClientRect(),_=window.innerHeight,P=O.top>_/2;if(a.style.setProperty("transition","none","important"),P){let J=_-O.bottom;a.style.top="auto",a.style.bottom=`${J}px`}else a.style.bottom="auto",a.style.top=`${O.top}px`;a.offsetWidth,a.style.removeProperty("transition"),a.classList.remove("collapsed"),$.playGenieOpen()}else!C&&!I&&(a.classList.add("collapsed"),$.playGenieOpen());I&&(I.style.transform="scale(0.9)",setTimeout(()=>I.style.transform="",150))}}}function Qe(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${de.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let a=document.createElement("div");a.className="cw-abort-btn",a.textContent="Cancelar",a.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,Z("Cancelado!",{duration:3e3}),o.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},o.appendChild(a),t.appendChild(o);let n=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(o))return;let r=Date.now()-n,s=Math.max(0,2e3-r);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(o))return;let l=o.querySelector(".cw-center-dots"),u=o.querySelector(".cw-center-text"),p=o.querySelector(".cw-center-success"),g=o.querySelector(".cw-abort-btn");l&&(l.style.display="none"),u&&(u.style.display="none"),g&&(g.style.display="none"),p&&p.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{o.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},s)}}function bo(t){let{onSaveCurrent:e,onLoadDraft:o,t:a}=t,n=document.createElement("button");n.className="js-btn-park",n.innerHTML=`
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
    `,n.onmouseenter=()=>{n.style.backgroundColor="#F8F9FA",n.style.borderColor="#202124",n.style.color="#202124",n.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",n.style.transform="translateY(-1px)"},n.onmouseleave=()=>{n.style.backgroundColor="#FFFFFF",n.style.borderColor="#DADCE0",n.style.color="#5F6368",n.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",n.style.transform="translateY(0)"},n.onmousedown=()=>n.style.transform="scale(0.96)",n.onmouseup=()=>n.style.transform="scale(1) translateY(-1px)",n.onclick=async()=>{if(await ve("Deseja guardar o rascunho atual e limpar os campos?"))try{let C=await e();C?(we.save(C),y(),l(),$.playSuccess(),Z("Rascunho salvo com sucesso!")):Z("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(C){console.error("Erro ao salvar rascunho:",C),Z("Erro ao salvar.",{error:!0})}};let i=document.createElement("div");i.title="Meus Rascunhos",i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#9AA0A6"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let r=i.querySelector("svg"),s=document.createElement("div");s.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(s),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=h=>{h.stopPropagation(),f()};function l(){let h=we.getCount();mt(h>0),r.style.color=h>0?B.primary:"#9AA0A6",h>0?(s.style.display="block",s.textContent=h,s.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):s.style.display="none"}let u=document.createElement("div");u.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${B.surface}; z-index: 100;
        border-radius: ${ue.large} ${ue.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${ce};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let p=document.createElement("div");p.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",p.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${a("rascunhos_salvos")}</span>`;let g=document.createElement("button");g.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',g.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",g.onmouseenter=()=>g.style.background="#F1F3F4",g.onmouseleave=()=>g.style.background="transparent",g.onclick=()=>f(!1),p.appendChild(g);let b=document.createElement("div");b.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",u.appendChild(p),u.appendChild(b);function f(h){let C=u.style.transform==="translateY(0%)";(h!==void 0?h:!C)?(y(),u.style.transform="translateY(0%)"):u.style.transform="translateY(110%)"}function y(){let h=we.getAll();if(b.innerHTML="",h.length===0){b.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${B.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${a("nenhum_rascunho")}</div>
                </div>`;return}h.forEach(C=>{let I=document.createElement("div");I.style.cssText=`
                background: ${B.surface}; padding: 20px; border-radius: ${ue.large};
                border: 1.5px solid ${B.bgInput}; box-shadow: ${De.subtle};
                position: relative; transition: all 0.3s ${ce};
            `;let _=new Date(C.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),P="";C.summaryTags&&C.summaryTags.length>0&&(P=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${C.summaryTags.slice(0,3).join(", ")+(C.summaryTags.length>3?"...":"")}</div>`),I.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${C.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${_}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${C.cid||"---"}</span>
                    <span style="display:block; color:${C.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${C.subStatus||C.status||"Sem Status"}</span>
                    ${P}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let J=I.querySelector(".cw-resume-btn");J.onclick=async()=>{await ve("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(C),we.delete(C.id),y(),l(),f(!1),$.playSwoosh(),Z("Rascunho carregado."))};let oe=I.querySelector(".cw-del-btn");oe.onclick=async()=>{await ve("Excluir este rascunho?",{danger:!0})&&(we.delete(C.id),y(),l())},b.appendChild(I)})}return l(),{parkButton:n,historyBtnWrapper:i,drawer:u}}function et(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let a=window.getSelection();a.removeAllRanges(),a.addRange(o);try{document.execCommand("copy")}catch{Z("Falha ao copiar",{error:!0})}a.removeAllRanges(),document.body.removeChild(e)}function gt(t){["input","change","keydown","keyup"].forEach(o=>{let a=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(a)})}function fo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function bt(){let t=fo(),e=t.length,a=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(a){let r=a.closest("material-fab")||a.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),he(r)):he(a)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let s=r.querySelector(".trigger");s?(s.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),he(s)):r.click(),await ne(800);let u=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="description");u&&he(u)}}let n=null,i=0;for(;!n&&i<20;){await ne(300);let r=fo();if(r.length>e)n=r.find(s=>!t.includes(s)),n||(n=r[r.length-1]);else if(i>10){let s=r.filter(l=>l.offsetParent!==null);s.length>0&&(n=s[s.length-1])}i++}return n}function xo(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let a=document.createElement("div");a.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(a),e.appendChild(o),o.addEventListener("scroll",()=>{a.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let n={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function r({id:_,label:P,type:J="text",placeholder:oe="",required:q=!1,parent:F=o}){let z=document.createElement("div");z.style.cssText=n.inputWrapper;let V=document.createElement("label");V.style.cssText=n.label,V.innerHTML=`${P} ${q?'<span style="color:#D93025">*</span>':""}`;let M;return J==="textarea"?(M=document.createElement("textarea"),M.style.cssText=n.input+n.textarea):(M=document.createElement("input"),M.type=J,M.style.cssText=n.input),M.id=_,M.placeholder=oe,M.addEventListener("focus",()=>{M.style.borderColor="#1a73e8",M.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),M.addEventListener("blur",()=>{M.style.borderColor="#DADCE0",M.style.boxShadow="none",q&&M.value.trim()!==""&&(M.style.backgroundColor="#FFF")}),i[_]={input:M,wrapper:z,required:q},z.appendChild(V),z.appendChild(M),F.appendChild(z),z}function s({id:_,label:P,options:J=["Yes","No"],defaultValue:oe="No",onChange:q=null}){let F=document.createElement("div");F.style.cssText=n.inputWrapper;let z=document.createElement("label");z.style.cssText=n.label,z.textContent=P,F.appendChild(z);let V=document.createElement("div");V.style.cssText=n.radioGroup;let M=document.createElement("input");return M.type="hidden",M.id=_,M.value=oe,F.appendChild(M),J.forEach(D=>{let Y=document.createElement("div");Y.textContent=D,Y.style.cssText=n.radioLabel,D===oe&&(Y.style.cssText+=n.radioActive),Y.onclick=()=>{Array.from(V.children).forEach(L=>L.style.cssText=n.radioLabel),Y.style.cssText+=n.radioActive,M.value=D,q&&q(D)},V.appendChild(Y)}),i[_]={input:M,wrapper:F,required:!1},F.appendChild(V),o.appendChild(F),F}let l=document.createElement("div");l.style.cssText=n.banner,l.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(l);let u=document.createElement("div");u.style.marginBottom="24px";let p=document.createElement("button");p.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",p.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",p.onmouseover=()=>p.style.background="#E1EFFF",p.onmouseout=()=>p.style.background="#F0F7FF",u.appendChild(p),o.appendChild(u);let g=document.createElement("div");g.style.cssText=n.section,g.innerHTML=`<div style="${n.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(g),r({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:g}),r({id:"ga4",label:"GA4 Property ID",parent:g}),r({id:"gtm",label:"GTM Container ID",parent:g});let b=document.createElement("div");b.style.cssText=n.hiddenField,g.appendChild(b),s({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:_=>{_==="Yes"?b.style.cssText=n.visibleField+"margin-bottom:14px;":(b.style.cssText=n.hiddenField,i.accessEmail.input.value="")}}),r({id:"accessEmail",label:"User Access Email",parent:b}),s({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let f=document.createElement("div");f.style.cssText=n.section,f.innerHTML=`<div style="${n.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(f),r({id:"name",label:"Advertiser Name",required:!0,parent:f}),r({id:"url",label:"Website URL",parent:f}),r({id:"phone",label:"Phone Number",parent:f}),r({id:"email",label:"Contact Email",parent:f}),r({id:"callback",label:"Preferred Callback Time (Timezone)",parent:f}),r({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:f}),r({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:f}),r({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:f});let y=document.createElement("div");y.style.cssText=n.section,y.innerHTML=`<div style="${n.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(y),r({id:"cc_adv",label:"Advertiser Contact",parent:y}),r({id:"cc_am",label:"Account Manager",parent:y});let h=document.createElement("div");h.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let C=document.createElement("button");C.innerHTML="Voltar",C.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",C.onclick=t;let I=document.createElement("button");I.textContent="Gerar Nota",I.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",h.appendChild(C),h.appendChild(I),e.appendChild(h),p.onclick=async()=>{let _=p.innerHTML;p.innerHTML="\u23F3 Buscando dados...";try{let P=await Fe(),J=0,oe=(z,V)=>{let M=i[z];V&&M&&M.input.value===""&&(M.input.value=V,M.input.style.backgroundColor="#E6F4EA",M.input.style.borderColor="#34A853",setTimeout(()=>{M.input.style.backgroundColor="#FFF",M.input.style.borderColor="#DADCE0"},1e3),J++)};oe("name",P.advertiserName),oe("url",P.websiteUrl),P.clientEmail&&(oe("email",P.clientEmail),oe("cc_adv",P.clientEmail));let F=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);F&&oe("cid",F[0]),J>0?Z(`${J} campos preenchidos!`):Z("Nenhum dado novo encontrado.")}catch(P){console.error(P),Z("Erro ao ler p\xE1gina.")}finally{p.innerHTML=_}};let O=()=>{let _=!0,P=null;return Object.values(i).forEach(J=>{J.required&&!J.input.value.trim()&&(_=!1,J.input.style.cssText+=n.inputError,J.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),P||(P=J.input))}),P&&P.scrollIntoView({behavior:"smooth",block:"center"}),_};return I.onclick=async()=>{if(!O()){Z("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let _=z=>i[z].input.value||"N/A",P=_("hasAccess"),J=P==="Yes"?_("accessEmail"):"N/A",q=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${_("cid")}
<b>GA4 ID:</b> ${_("ga4")}
<b>GTM ID:</b> ${_("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${P==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${J}
<b>Ghosting Access Available (Y/N):</b> ${_("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${_("name")}
<b>Website:</b> ${_("url")}
<b>Phone Number:</b> ${_("phone")}
<b>Preferred Callback:</b> ${_("callback")}
<b>Email Address:</b> ${_("email")}

<b>Detailed Issue Description:</b>
${_("desc")}

<b>Uncropped screenshots:</b>
${_("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${_("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${_("cc_adv")}
<b>Account Manager:</b> ${_("cc_am")}
`.replace(/\n/g,"<br>");et(q);let F=await bt();F?(F.innerText.trim()===""&&(F.innerHTML=""),document.execCommand("insertHTML",!1,q),gt(F),Z("Nota gerada e inserida!")):Z("Copiado! Abra uma nota para colar.")},e}function ke(t,e="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,o[e]||o.info)}function ft(t,e){if(!t)return;let o=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,a=document.getElementById(o);a&&a.remove();let n=t.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
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
    `;let r=i.querySelector(".cw-close-btn");r.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&r.click()},25e3)}async function xt(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await ne(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await ne(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Ot(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let a=o.offsetParent!==null,n=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return a&&!n&&i});return e&&ke("Editor visualmente detectado.","success"),e}async function ho(){ke("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(g=>g.innerText.trim()==="email");if(o&&o.offsetParent!==null){ke("Bot\xE3o de email direto encontrado.");let g=o.closest("material-button")||o.closest("material-fab")||o;he(g),t=!0}else{ke("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let g=document.querySelector("material-fab-speed-dial");if(g){let b=g.querySelector(".trigger");if(b){he(b),await ne(800);let y=Array.from(document.querySelectorAll("i.material-icons-extended")).find(h=>h.innerText.trim()==="email");y&&(he(y),t=!0)}}}if(!t)return Z("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ke("\u{1F680} FASE 2: Verificando rascunhos...");let a=null,n=0,i=20;for(;n<i;){await ne(250);let g=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(a=Array.from(g).find(b=>b.offsetParent!==null),a){ke("\u26A0\uFE0F Rascunho detectado!","warn");break}n++}if(a){ke("\u{1F5D1}\uFE0F Descartando..."),he(a),a.click();let g=null,b=0;for(;b<15;){await ne(300);let f=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(g=Array.from(f).find(y=>y.offsetParent!==null),g)break;b++}g&&(he(g),Z("Limpando rascunho antigo...",{duration:2e3}),await ne(2500))}ke("\u{1F680} FASE 3: Buscando editor final...");let r=0,s=null;for(;r<20&&(s=Ot(),!s);)await ne(250),r++;if(!s)return Z("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let l=s.closest('[id="email-body-content-top"]'),p=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(l){if(p){let b=p.closest('[aria-hidden="true"]');b&&b.removeAttribute("aria-hidden"),p.focus(),he(p)}await ne(300),l.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let g=l.querySelector("#cases-body-field");if(g){let b=document.createRange();b.selectNodeContents(g),b.collapse(!0);let f=window.getSelection();f.removeAllRanges(),f.addRange(b)}return!0}return!1}async function ht(t){if(!t||!await ho())return;let o=await Fe();ke("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let a=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(a&&(a.click(),await ne(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await xt(i,o.clientEmail),ft(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await xt(i,o.internalEmail),ft(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await ne(500);let n=document.querySelector('material-button[debug-id="canned_response_button"]');if(n){he(n),await ne(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){he(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),ke("\u23F3 Buscando resultado da Canned Response...","info");let r=null,s=0,l=15e3,u=500;for(;s<l&&(r=document.querySelector("material-select-dropdown-item"),!r);)await ne(u),s+=u;if(r){he(r),await ne(1500);let p=Ot();if(p){let b=Array.from(p.querySelectorAll("span.field")).filter(y=>y.innerText.includes("{Requested Task Type}"));if(b.length>0){let y=b.map(C=>C.closest("tr")).filter(C=>C!==null),h=[...new Set(y)];if(h.length>0){let I=h[0].querySelector('td[width="100%"]');I&&(I.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let O=1;O<h.length;O++)h[O].remove()}}let f=p.innerHTML;o.advertiserName&&f.includes("{%ADVERTISER_NAME%}")&&(f=f.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),f.includes("{%^79285%}")&&(f=f.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),p.innerHTML=f}Z("Canned Response aplicada!")}else ke(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),Z(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else Z("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function yo(t){if(ke(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await ho())return;let o=await Fe(),a=Ke();await ne(600);let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await ne(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await xt(s,o.clientEmail),ft(s,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await xt(s,o.internalEmail),ft(s,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await ne(300));let r=Ot();if(r){let l=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');l&&(l.focus(),he(l));let u=new Date;u.setDate(u.getDate()+3);let p=u.getDay();p===6?u.setDate(u.getDate()+2):p===0&&u.setDate(u.getDate()+1);let g=u.toLocaleDateString("pt-BR"),b=t.body;b=b.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),b=b.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),b=b.replace(/\[URL\]/g,o.websiteUrl||"seu site"),b=b.replace(/\[Seu Nome\]/g,a),b=b.replace(/\[MM\/DD\/YYYY\]/g,g),document.execCommand("insertHTML",!1,b),l&&(l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),Z("Email preenchido com sucesso!",{duration:2e3}),ke("\u2705 Processo finalizado com sucesso.","success")}else Z("Erro ao focar no editor.",{error:!0})}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function be(t,e,o){let a=document.getElementById(o);if(!e)return;let n=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(a){let p=a.getBoundingClientRect();i.x=p.left+p.width/2,i.y=p.top+p.height/2}let r,s;if(!n)r=window.innerWidth/2,s=window.innerHeight/2;else{let p=e.getBoundingClientRect();r=p.left+p.width/2,s=p.top+p.height/2,r===0&&s===0&&(r=window.innerWidth/2,s=window.innerHeight/2)}let l=i.x-r,u=i.y-s;t?($.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",n?e.style.transform=`translate(${l}px, ${u}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${l}px), calc(-50% + ${u}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),a&&a.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",n?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof vo=="function"&&vo(e,o)):($.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",n?e.style.transform=`translate(${l}px, ${u}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${l}px), calc(-50% + ${u}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),a&&a.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof _t=="function"&&_t(e))}function vo(t,e){_t(t);let o=a=>{if(!t.classList.contains("open"))return;let n=t.contains(a.target),i=document.querySelector(".cw-pill"),r=i&&i.contains(a.target);n?(t.classList.remove("idle"),t.style.zIndex="2147483648"):r||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function _t(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}function wo(){let t="v4.0.0",{popup:e,content:o,header:a,animRefs:n,credit:i}=so(t,V),r=mo(x),s=uo(()=>{R(),W.setActiveTasks(s.getCheckedElements())},x,W),l=document.createElement("div");l.style.display="none";let u=po((d,A)=>{ee(d,A)});l.appendChild(u);let p=document.createElement("div");p.id="evidence-container",Object.assign(p.style,{display:"none",marginTop:"16px",padding:"16px",background:B.bgInput,border:`1px solid ${B.border}`,borderRadius:ue.medium,boxShadow:De.subtle});let g=document.createElement("div");g.className="cw-section-title",g.textContent=x("evidencias_contato"),p.appendChild(g);let b={},f=(d,A)=>{let T=document.createElement("div");T.style.marginBottom="12px";let H=document.createElement("label");H.textContent=A,H.setAttribute("for",d),H.style.cssText=`display: block; font-size: 11px; font-weight: 700; color: ${B.textSub}; margin-bottom: 6px; text-transform: uppercase;`;let N=document.createElement("input");return N.type="text",N.id=d,N.className="cw-input",N.placeholder="https://screenshot.googleplex.com/...",N.style.marginBottom="0",T.appendChild(H),T.appendChild(N),b[d]=N,T};p.appendChild(f("evidence-l1",x("ligacao_1"))),p.appendChild(f("evidence-l2",x("ligacao_2"))),p.appendChild(f("evidence-msg",x("mensagem_am")));let y=bo({onSaveCurrent:async()=>{let d=await c();return K(),d},onLoadDraft:d=>{v(d)},t:d=>x(d)}),h=D(),C=Y(),I=document.createElement("div"),O=E(),_=ae(y,x);o.appendChild(h),o.appendChild(C),o.appendChild(O),o.appendChild(l),o.appendChild(I),o.appendChild(p),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none";let P=document.createElement("button");P.id="manual-task-toggle",P.textContent=x("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",P.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${B.primary}; background: ${B.surface}; color: ${B.primary}; border-radius: ${ue.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${ce}; text-transform: uppercase; letter-spacing: 0.5px;`,P.onmouseenter=()=>{P.style.background=B.primaryBg},P.onmouseleave=()=>{P.style.background=B.surface},P.onclick=()=>{s.selectionElement.style.display="block",s.screenshotsElement.style.display="block",P.style.display="none"},o.appendChild(P),o.appendChild(s.selectionElement),o.appendChild(r.element),o.appendChild(s.screenshotsElement),o.appendChild(_);let J=document.createElement("div");J.style.display="none",J.style.flexGrow="1",J.style.minHeight="0",J.style.overflow="hidden";let oe=xo(()=>M());oe.style.height="100%",J.appendChild(oe),e.insertBefore(J,i);let q=a.lastElementChild;q&&(q.insertBefore(y.historyBtnWrapper,q.firstChild),q.insertBefore(w(),q.firstChild)),e.appendChild(y.drawer);let F=null;W.subscribe(d=>{S(d),z(),d.isDirty?(F&&clearTimeout(F),F=setTimeout(async()=>{let A=await c(!0);A.subStatus?we.saveEmergency(A):we.clearEmergency(),d.isDirty=!1},2e3)):F&&(clearTimeout(F),F=null)});function z(){let d=we.getCount()>0,A=!!W.currentSubStatus;mt(d||A)}function V(){W.visible=!W.visible,be(W.visible,e,"cw-btn-notes")}function M(){W.isSplitView=!W.isSplitView,W.isSplitView?(o.style.display="none",J.style.display="flex",J.style.flexDirection="column",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",J.style.display="none",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function D(){let d=document.createElement("div");if(d.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-idioma" style="font-size: 10px; margin-bottom: 6px;">${x("idioma")}</div>
                    <div class="cw-segmented-control" id="lang-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-lang="pt" class="active" style="z-index:2">PT</button>
                        <button data-lang="es" style="z-index:2">ES</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${x("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${x("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${x("nao")}</button>
                        <button data-val="true" style="z-index:2">${x("sim")}</button>
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
            `,document.head.appendChild(T)}let A=(T,H)=>{let Q=d.querySelector(`#${T}`).querySelector(".cw-segmented-indicator");Q&&(Q.style.transform=`translateX(${H*100}%) translateX(${H*2}px)`)};return d.querySelectorAll("#lang-selector button").forEach((T,H)=>{T.onclick=()=>{W.setLanguage(T.dataset.lang),d.querySelectorAll("#lang-selector button").forEach(N=>N.classList.remove("active")),T.classList.add("active"),A("lang-selector",H),$.playHover(),W.currentSubStatus&&G(W.currentSubStatus)}}),d.querySelectorAll("#type-selector button").forEach((T,H)=>{T.onclick=()=>{W.setCaseType(T.dataset.type),d.querySelectorAll("#type-selector button").forEach(N=>N.classList.remove("active")),T.classList.add("active"),A("type-selector",H),$.playHover(),W.currentSubStatus&&G(W.currentSubStatus)}}),d.querySelectorAll("#portugal-selector button").forEach((T,H)=>{T.onclick=()=>{W.setPortugalCase(T.dataset.val==="true"),d.querySelectorAll("#portugal-selector button").forEach(N=>N.classList.remove("active")),T.classList.add("active"),A("portugal-selector",H),$.playHover(),W.currentSubStatus&&G(W.currentSubStatus)}}),d}function Y(){let d=document.createElement("div");d.className="cw-status-section",d.style.cssText="display: flex; flex-direction: column; gap: 8px;",d.innerHTML=`
            <div class="cw-section-title js-label-status" style="margin-top: 8px;">${x("status_principal")}</div>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${x("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <div class="cw-section-title js-label-substatus" style="margin-top: 8px;">${x("substatus")}</div>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${x("select_substatus")}</option>
            </select>
        `;let A=d.querySelector("#main-status-select"),T=d.querySelector("#sub-status-select");return A.onchange=()=>{W.setStatus(A.value),L(A.value,T),W.setSubStatus(""),G("")},T.onchange=()=>{W.setSubStatus(T.value),G(T.value)},d}function k(){return p.style.display==="none"?null:{l1:b["evidence-l1"]?.value.trim()||"",l2:b["evidence-l2"]?.value.trim()||"",msg:b["evidence-msg"]?.value.trim()||""}}function L(d,A){if(A.innerHTML=`<option value="">${x("select_substatus")}</option>`,!d){A.disabled=!0;return}for(let T in Le)if(Le[T].status===d){let H=document.createElement("option");H.value=T,H.textContent=Le[T].name,A.appendChild(H)}A.disabled=!1}function G(d){let A=Le[d],T=d==="NI_Attempted_Contact"||A&&A.name&&A.name.toLowerCase().includes("attempted contact");if(u.render&&u.render(d,W.currentCaseType),!d){p.style.display="none",b["evidence-l1"]&&(b["evidence-l1"].value=""),b["evidence-l2"]&&(b["evidence-l2"].value=""),b["evidence-msg"]&&(b["evidence-msg"].value=""),l.style.display="none",I.style.display="none";let pe=document.getElementById("manual-task-toggle");pe&&(pe.style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",O.style.display="flex",O.style.opacity="1",_.style.display="none";return}if(T?p.style.display="block":(p.style.display="none",b["evidence-l1"]&&(b["evidence-l1"].value=""),b["evidence-l2"]&&(b["evidence-l2"].value=""),b["evidence-msg"]&&(b["evidence-msg"].value="")),O.style.opacity="0",setTimeout(()=>{W.currentSubStatus&&(O.style.display="none")},400),_.style.display="grid",A&&A.templateFields){let pe=st(A);W.setActiveFields(A.templateFields.filter(Ee=>!pe.includes(Ee)))}U(),dt(d,I,W),I.style.display="block",l.style.display="block";let H=d.startsWith("SO_"),N=d==="NI_Awaiting_Validation",Q=document.getElementById("manual-task-toggle");H||N?(s.selectionElement.style.display="block",Q.style.display="none"):(s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",Q.style.display="block");let X=d==="SO_Education_Only"?"education":"implementation";W.setScreenshotMode(X),s.updateSubStatus(d),R();let se=document.getElementById("email-automation-toggle-row");se&&(se.style.display=Ye[d]?"flex":"none")}function R(){let d=s.getCheckedElements().map(A=>A.value);r.updateVisibility(W.currentSubStatus,d)}function ee(d,A){let T=lt[d];if(T){for(let H in T)if(H==="linkedTask")s.toggleTask(T.linkedTask,A);else if(H==="activeTasks")T.activeTasks.forEach(N=>{A?s.setTaskCount(N.value,N.count):s.setTaskCount(N.value,0)});else if(H.startsWith("field-")){let N=H,Q=T[H],X=document.getElementById(N);if(X){let se=We.includes(N.replace("field-",""));if(A)if(se){let pe=X.value.trim();pe.includes(Q.trim())||(X.value=pe?pe+`
`+Q.trim():Q.trim())}else X.value=Q;else if(se){let pe=X.value.trim(),Ee=Q.trim();pe.includes(Ee)&&(X.value=pe.replace(Ee,"").trim().replace(/\n{3,}/g,`

`))}else X.value.trim()===Q.trim()&&(X.value="");W.updateField(N,X.value),X.dispatchEvent(new Event("input"))}}}}function ae(d,A){let T=document.createElement("div");if(T.className="cw-actions-section",T.style.cssText=`
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
            `,document.head.appendChild(pe)}let H=document.createElement("div");H.id="email-automation-toggle-row",H.style.cssText="grid-column: 1 / -1; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",H.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${B.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${B.primary};">
                <span class="js-label-email-toggle">${A("preencher_email_automaticamente")}</span>
            </label>
        `;let N=d.parkButton;N.classList.add("js-btn-park"),N.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let Q=document.createElement("button");Q.className="cw-btn-secondary js-btn-reset",Q.textContent=A("limpar"),Q.style.cssText=`width: 100%; height: 34px; background: ${B.surface}; color: ${B.textSub}; border: 1px solid ${B.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,Q.onclick=()=>K();let X=document.createElement("button");X.className="cw-btn-secondary js-btn-copy",X.textContent=A("copiar"),X.style.cssText=`width: 100%; height: 34px; background: ${B.surface}; color: ${B.primary}; border: 1px solid ${B.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,X.onclick=()=>te();let se=document.createElement("button");return se.className="cw-btn-primary js-btn-generate",se.textContent=A("preencher"),se.style.cssText=`width: 100%; height: 38px; background: ${B.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: 1 / -1; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,se.onclick=()=>j(),T.appendChild(H),T.appendChild(N),T.appendChild(Q),T.appendChild(X),T.appendChild(se),T}async function te(){if(!W.currentSubStatus){Z(x("select_substatus"),{error:!0});return}let d=It(W,s,r,k());d?(et(d),Z(x("copiado_sucesso")),$.playClick()):Z(x("select_substatus"),{error:!0})}async function j(){if(!W.currentSubStatus){Z(x("select_substatus"),{error:!0});return}let d=Le[W.currentSubStatus],A=Ze(d).filter(Q=>{if(!W.activeFields.includes(Q))return!1;let X=W.formData[`field-${Q}`];return!X||!X.trim()});if(A.length>0){Z(`Preencha o campo obrigat\xF3rio antes de gerar: ${x(A[0].toLowerCase())}`,{error:!0});return}if(d?.requiresTasks&&s.getCheckedElements().length===0){Z("Selecione ao menos uma tarefa antes de gerar a nota.",{error:!0});return}let T=It(W,s,r,k());et(T),V();let H=Qe(),N=await bt();if(N){N.focus(),document.execCommand("insertHTML",!1,T),gt(N);let Q=document.getElementById("email-automation-checkbox");(!Q||Q.checked)&&W.currentSubStatus&&Ye[W.currentSubStatus]&&await ht(Ye[W.currentSubStatus]),Z(x("inserido_copiado")),$.playSuccess(),K()}else Z("N\xE3o foi poss\xEDvel abrir a nota no CRM. O conte\xFAdo j\xE1 est\xE1 copiado \u2014 cole manualmente.",{error:!0}),V();H()}function U(){if(W.currentSubStatus){if(W.currentCaseType==="lm")W.removeField("ON_CALL");else{let d=Le[W.currentSubStatus];d&&d.templateFields.includes("ON_CALL")&&W.addFieldAt("ON_CALL",1)}W.isPortugalCase?(W.addFieldAt("CASO_PORTUGAL",1),W.addFieldAt("CONSENTIU_GRAVACAO",2)):(W.removeField("CASO_PORTUGAL"),W.removeField("CONSENTIU_GRAVACAO"))}}function K(){W.reset(),s.reset(),r.reset(),z(),we.clearEmergency(),o.querySelectorAll("select").forEach(A=>A.value=""),o.querySelector("#sub-status-select").disabled=!0;let d=document.getElementById("email-automation-toggle-row");d&&(d.style.display="none"),I.innerHTML="",l.style.display="none",O.style.display="flex",O.style.opacity="1",_.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",p.style.display="none",b["evidence-l1"]&&(b["evidence-l1"].value=""),b["evidence-l2"]&&(b["evidence-l2"].value=""),b["evidence-msg"]&&(b["evidence-msg"].value="")}async function c(d=!1){let A={};I.querySelectorAll("input, textarea, select").forEach(X=>{(X.id.startsWith("field-")||X.id==="consent-select")&&(A[X.id]=X.value)});let T="Cliente",H="---";if(!d)try{let X=await Fe();T=X.advertiserName,H=X.cid}catch(X){console.warn("Erro ao coletar pageData:",X)}let N=s.getCheckedElements().map(X=>({key:X.value,count:X.count})),Q=N.map(X=>{let se=Ie[X.key];return se?se.name:X.key});return{currentCaseType:W.currentCaseType,currentLang:W.currentLang,isPortugalCase:W.isPortugalCase,consent:W.consent,tagSupportUsed:W.tagSupportUsed,forcedScreenshots:[...W.forcedScreenshots],activeFields:W.activeFields,status:W.currentStatus,subStatus:W.currentSubStatus,formData:A,activeTasks:N,summaryTags:Q,clientName:T,cid:H,timestamp:new Date().toISOString()}}let m=d=>new Promise(A=>setTimeout(A,d));async function v(d){W.setLanguage(d.currentLang||"pt"),W.setCaseType(d.currentCaseType||"bau"),W.setPortugalCase(d.isPortugalCase||!1),W.setConsent(d.consent||!1),d.activeFields&&W.setActiveFields(d.activeFields);let A=o.querySelector(`#lang-selector button[data-lang="${W.currentLang}"]`);A&&A.classList.add("active"),o.querySelectorAll("#lang-selector button").forEach(N=>{N!==A&&N.classList.remove("active")});let T=o.querySelector(`#type-selector button[data-type="${W.currentCaseType}"]`);T&&T.classList.add("active"),o.querySelectorAll("#type-selector button").forEach(N=>{N!==T&&N.classList.remove("active")});let H=o.querySelector(`#portugal-selector button[data-val="${W.isPortugalCase}"]`);if(H&&H.classList.add("active"),o.querySelectorAll("#portugal-selector button").forEach(N=>{N!==H&&N.classList.remove("active")}),d.status){let N=o.querySelector("#main-status-select");N.value=d.status,W.setStatus(d.status);let Q=o.querySelector("#sub-status-select");if(L(d.status,Q),await m(50),d.subStatus){if(Q.value=d.subStatus,W.setSubStatus(d.subStatus),G(d.subStatus),await m(100),d.tagSupportUsed!==void 0){W.setTagSupportUsed(d.tagSupportUsed);let X=r.element.querySelector('input[value="Sim"]'),se=r.element.querySelector('input[value="N\xE3o"]');d.tagSupportUsed&&X?X.checked=!0:se&&(se.checked=!0),r.element.querySelector("div:last-child").style.display=d.tagSupportUsed?"none":"block"}d.forcedScreenshots&&W.setForcedScreenshots(d.forcedScreenshots);for(let X in d.formData){let se=document.getElementById(X);se&&(se.value=d.formData[X],W.updateField(X,se.value))}d.activeTasks&&(d.activeTasks.forEach(X=>s.setTaskCount(X.key,X.count)),W.setActiveTasks(s.getCheckedElements()))}}W.isDirty=!1}function x(d){return Ce[W.currentLang]?.[d]||Ce.pt?.[d]||d}function w(){let d=document.createElement("div");return d.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',d.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",d.onclick=A=>{A.stopPropagation(),M()},d.title="Alternar para Split & Transfer",d}function E(){let d=document.createElement("div");return d.id="notes-empty-state",d.style.cssText=`
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
                    ${x("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${B.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${x("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,d}function S(d){let A=o.querySelector(".js-label-idioma");A&&(A.textContent=x("idioma"));let T=o.querySelector(".js-label-fluxo");T&&(T.textContent=x("fluxo"));let H=o.querySelector(".js-label-portugal");H&&(H.textContent=x("caso_portugal"));let N=o.querySelector(".js-label-status");N&&(N.textContent=x("status_principal"));let Q=o.querySelector(".js-label-substatus");Q&&(Q.textContent=x("substatus"));let X=o.querySelector(".js-btn-copy");X&&(X.textContent=x("copiar"));let se=o.querySelector(".js-btn-generate");se&&(se.textContent=x("preencher"));let pe=o.querySelector(".js-btn-reset");pe&&(pe.textContent=x("limpar"));let Ee=document.getElementById("manual-task-toggle");Ee&&(Ee.textContent=x("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let Ae=o.querySelector(".js-btn-park span");Ae&&(Ae.textContent=x("guardar")),g.textContent=x("evidencias_contato");let ot=p.querySelector('label[for="evidence-l1"]');ot&&(ot.textContent=x("ligacao_1"));let Rt=p.querySelector('label[for="evidence-l2"]');Rt&&(Rt.textContent=x("ligacao_2"));let Bt=p.querySelector('label[for="evidence-msg"]');Bt&&(Bt.textContent=x("mensagem_am"));let $t=e.querySelector(".js-drawer-title");$t&&($t.textContent=x("rascunhos_salvos"));let Pt=o.querySelector(".js-label-email-toggle");Pt&&(Pt.textContent=x("preencher_email_automaticamente")),r&&r.setLanguage&&r.setLanguage(x),s&&s.setLanguage&&s.setLanguage(x)}return O.style.display="flex",_.style.display="none",W.setLanguage("pt"),W.setCaseType("bau"),z(),setTimeout(async()=>{let d=we.getEmergency();d&&(await ve("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?")?(v(d),Z("Sess\xE3o restaurada!")):we.clearEmergency())},3e3),document.body.appendChild(e),V}var So=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule2",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email nas pr\xF3ximas 48 horas o caso ser\xE1 encerrado.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}];var Co={_templates:null,async getTemplates(){return this._templates?this._templates:(this._templates=So,this._templates)}};var Eo="cw_personal_library_v1",Xe=!1,Se={getSnippets:(t="all")=>{let e=Se._loadFromLocal(),o=fe();return o&&o.includes("@")&&!Xe&&Se._syncWithServer(o),t==="all"?e:e.filter(a=>a.type===t)},save:async t=>{let e=fe();if(!e)return Z("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;Xe=!0;let o=Se._loadFromLocal(),a=new Date().toISOString(),n={id:t.id||"local_"+Date.now(),type:t.type||"general",title:t.title||"Sem t\xEDtulo",content:t.content||"",subject:t.subject||"",isCode:t.isCode||!1,isRich:t.isRich||!1,updated:a,_pendingSync:!0},i=o.filter(l=>l.id!==n.id);i.unshift(n),Se._saveToLocal(i);let r=!1;try{r=await de.saveSnippet(n,e),r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}catch(l){console.error("Erro na nuvem:",l)}finally{setTimeout(()=>{Xe=!1},2e3)}n._pendingSync=!r;let s=Se._loadFromLocal().filter(l=>l.id!==n.id);return s.unshift(n),Se._saveToLocal(s),{...n,synced:r}},delete:async t=>{let e=fe();Xe=!0;let a=Se._loadFromLocal().filter(n=>n.id!==t);return Se._saveToLocal(a),e?de.deleteSnippet(t,e).then(()=>{setTimeout(()=>{Xe=!1},2e3)}):Xe=!1,!0},_syncWithServer:async t=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let e=await de.getUserSnippets(t);if(e&&e.status==="success"&&Array.isArray(e.snippets)){let o=e.snippets,a=Se._loadFromLocal(),i=[...a.filter(l=>l._pendingSync),...o],r=JSON.stringify(i),s=JSON.stringify(a);r!==s&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),Se._saveToLocal(i))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(Eo)||"[]")}catch{return[]}},_saveToLocal:t=>{localStorage.setItem(Eo,JSON.stringify(t))}};function Ao(){let t="v6.0.0",e=!1,o=[],a=null,n="",i="Todos",r=new Set,s={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"},l=document.createElement("div");l.id="email-assistant-popup",l.classList.add("cw-module-window");let u=document.createElement("style");u.textContent=`
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
    `,document.head.appendChild(u),Object.assign(l.style,ye,{width:"850px",height:"650px",display:"none",flexDirection:"column",fontFamily:"'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",borderRadius:"12px",overflow:"hidden"});let p=ge(l,"Email Assistant",t,"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",{popup:l},()=>Y()),g=document.createElement("div");Object.assign(g.style,{display:"flex",flex:"1",overflow:"hidden",backgroundColor:s.bgApp});let b=document.createElement("div");Object.assign(b.style,{width:"320px",backgroundColor:"#EFEFF0",borderRight:`1px solid ${s.borderSubtle}`,display:"flex",flexDirection:"column",flexShrink:"0"});let f=document.createElement("div");Object.assign(f.style,{padding:"16px",borderBottom:`1px solid ${s.borderSubtle}`,position:"relative"});let y=document.createElement("input");y.placeholder="Buscar templates...",Object.assign(y.style,{width:"100%",padding:"10px 14px 10px 36px",borderRadius:"10px",border:"1.5px solid transparent",backgroundColor:"#E3E3E8",fontSize:"15px",outline:"none",boxSizing:"border-box",color:s.textPrimary,backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",transition:"all 0.2s ease-in-out"}),y.onfocus=()=>{y.style.backgroundColor="#FFFFFF",y.style.borderColor=s.primary,y.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)",y.style.transform="scale(1.02)"},y.onblur=()=>{y.style.backgroundColor="#E3E3E8",y.style.borderColor="transparent",y.style.boxShadow="none",y.style.transform="scale(1)"};let h=document.createElement("div");h.id="email-template-list",Object.assign(h.style,{flex:"1",overflowY:"auto",padding:"8px",scrollBehavior:"smooth"});let C=document.createElement("div");C.innerHTML="\u2715",Object.assign(C.style,{position:"absolute",right:"26px",top:"50%",transform:"translateY(-50%)",fontSize:"10px",color:"#fff",cursor:"pointer",display:"none",backgroundColor:"#C7C7CC",width:"16px",height:"16px",borderRadius:"50%",textAlign:"center",lineHeight:"16px",fontWeight:"bold"}),C.onclick=()=>{y.value="",n="",C.style.display="none",L(),y.focus()},f.appendChild(y),f.appendChild(C),b.appendChild(f),b.appendChild(h);let I=document.createElement("div");Object.assign(I.style,{flex:"1",display:"flex",flexDirection:"column",overflow:"hidden",backgroundColor:s.bgApp,transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"});let O=document.createElement("div");Object.assign(O.style,{padding:"20px",borderBottom:`1px solid ${s.borderSubtle}`,backgroundColor:s.bgSurface,maxHeight:"250px",overflowY:"auto",display:"none"});let _=document.createElement("div");Object.assign(_.style,{flex:"1",display:"flex",flexDirection:"column",padding:"20px",backgroundColor:s.bgApp,overflow:"hidden"});let P=document.createElement("div");Object.assign(P.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"});let J=document.createElement("span");J.textContent="Preview do E-mail",Object.assign(J.style,{fontSize:"12px",fontWeight:"600",color:s.textSecondary,textTransform:"uppercase",letterSpacing:"0.5px"});let oe=document.createElement("div");Object.assign(oe.style,{display:"flex",gap:"8px"});let q=(te,j=!1)=>{let U=document.createElement("button");return U.textContent=te,Object.assign(U.style,{padding:"8px 14px",borderRadius:"10px",border:j?"none":`1.5px solid ${s.primary}`,background:j?s.primary:"transparent",color:j?"#fff":s.primary,fontSize:"13px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 1, 0.5, 1)",boxShadow:j?"0 4px 12px rgba(0, 122, 255, 0.3)":"none"}),U.onmouseenter=()=>{j?(U.style.backgroundColor="#0062CC",U.style.transform="translateY(-1px)",U.style.boxShadow="0 6px 16px rgba(0, 122, 255, 0.4)"):U.style.backgroundColor="rgba(0, 122, 255, 0.05)"},U.onmouseleave=()=>{j?(U.style.backgroundColor=s.primary,U.style.transform="translateY(0)",U.style.boxShadow="0 4px 12px rgba(0, 122, 255, 0.3)"):(U.style.backgroundColor="transparent",U.style.transform="translateY(0)")},U.onmousedown=()=>U.style.transform="scale(0.94)",U.onmouseup=()=>U.style.transform="scale(1)",U},F=q("Copiar HTML"),z=q("Preencher no CRM",!0),V=q("Smart CR");V.style.borderColor="#E67E22",V.style.color="#E67E22",V.style.display="none",oe.appendChild(V),oe.appendChild(F),oe.appendChild(z),P.appendChild(J),P.appendChild(oe);let M=document.createElement("div");M.contentEditable="true",Object.assign(M.style,{flex:"1",backgroundColor:s.bgSurface,border:`1px solid ${s.borderSubtle}`,borderRadius:"8px",padding:"20px",fontSize:"15px",lineHeight:"1.6",color:s.textPrimary,overflowY:"auto",outline:"none",boxShadow:"inset 0 1px 2px rgba(0,0,0,0.02)"}),_.appendChild(P),_.appendChild(M),ae(),I.appendChild(O),I.appendChild(_),g.appendChild(b),g.appendChild(I),l.appendChild(p),l.appendChild(g);let D=document.createElement("div");Object.assign(D.style,qe),l.appendChild(D),Oe(l,D),document.body.appendChild(l);function Y(){e=!e,e?(l.style.display="flex",eo(l),o.length===0&&k()):l.style.display="none",be(e,l,"cw-btn-email")}async function k(){h.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',o=await Co.getTemplates(),L()}function L(){h.innerHTML="";let te=o.filter(m=>m.name.toLowerCase().includes(n.toLowerCase())||m.category.toLowerCase().includes(n.toLowerCase())),j=Object.entries(Ye).filter(([m,v])=>v&&(m.toLowerCase().includes(n.toLowerCase())||v.toLowerCase().includes(n.toLowerCase()))).map(([m,v])=>({id:m,name:m.replace(/_/g," "),category:"\u26A1 Smart CRs",code:v,isSmartCR:!0})),U=Se.getSnippets("email").filter(m=>m.title.toLowerCase().includes(n.toLowerCase())||m.subject&&m.subject.toLowerCase().includes(n.toLowerCase())).map(m=>{let v=[],x=m.content.match(/\[([^\]]+)\]/g);return x&&[...new Set(x)].forEach(w=>{v.push({key:w,label:w.replace("[","").replace("]",""),type:w.toLowerCase().includes("data")?"date":"text",auto:w.toLowerCase().includes("nome")&&w.toLowerCase().includes("seu")?"agentName":null})}),{id:m.id||`snippet-${Math.random()}`,name:m.title,category:"\u{1F464} Pessoal",subject:m.subject||"Sem Assunto",template:m.content,placeholders:v}}),K=[...te,...j,...U];if(K.length===0){h.innerHTML=`
                <div style="padding: 40px 20px; text-align: center; color: ${s.textSecondary}; opacity: 0.6;">
                    <div style="font-size: 32px; margin-bottom: 12px;">\u{1F50D}</div>
                    <div style="font-size: 14px; font-weight: 500;">Nenhum resultado para "${n}"</div>
                </div>`;return}[...new Set(K.map(m=>m.category))].sort((m,v)=>m.localeCompare(v)).forEach(m=>{let v=r.has(m)||n.length>0,x=K.filter(T=>T.category===m),w=document.createElement("div");Object.assign(w.style,{padding:"12px 16px 12px 24px",fontSize:"11px",fontWeight:"700",color:s.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",position:"sticky",top:"-8px",backgroundColor:"rgba(239, 239, 240, 0.9)",zIndex:"10",backdropFilter:"blur(20px)",margin:"0 -8px 8px -8px",borderBottom:`0.5px solid ${s.borderSubtle}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none",transition:"background-color 0.2s ease"}),w.onmouseenter=()=>w.style.backgroundColor="rgba(230, 230, 232, 0.9)",w.onmouseleave=()=>w.style.backgroundColor="rgba(239, 239, 240, 0.9)";let E=document.createElement("span");E.textContent=m,w.appendChild(E);let S=document.createElement("span");S.textContent=x.length,Object.assign(S.style,{backgroundColor:"rgba(0, 0, 0, 0.05)",padding:"2px 8px",borderRadius:"10px",fontSize:"10px",color:s.textSecondary});let d=document.createElement("span");d.innerHTML=v?"\u{10012A}":"\u{10012B}",d.innerHTML=v?"\u25BE":"\u25B8",d.style.marginLeft="8px",d.style.transition="transform 0.3s ease";let A=document.createElement("div");A.style.display="flex",A.style.alignItems="center",A.appendChild(S),A.appendChild(d),w.appendChild(A),w.onclick=()=>{r.has(m)?r.delete(m):r.add(m),L()},h.appendChild(w),v&&x.forEach(T=>{let H=a&&a.id===T.id,N=document.createElement("div");if(Object.assign(N.style,{padding:"12px 14px",fontSize:"14px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",borderRadius:"10px",color:s.textPrimary,margin:"4px 6px",display:"flex",alignItems:"center",gap:"12px",backgroundColor:H?s.primary:s.bgSurface,boxShadow:H?"0 4px 12px rgba(0, 122, 255, 0.3)":"0 1px 2px rgba(0,0,0,0.05)",border:H?"none":`1px solid ${s.borderSubtle}`,position:"relative",overflow:"hidden"}),H){let se=document.createElement("div");Object.assign(se.style,{position:"absolute",left:"0",top:"0",bottom:"0",width:"4px",backgroundColor:"#fff",borderRadius:"0 4px 4px 0"}),N.appendChild(se)}let Q=document.createElement("span");Q.innerHTML=T.isSmartCR?"\u26A1":T.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}",Q.style.fontSize="12px",Q.style.opacity="0.7",Q.style.flexShrink="0",N.appendChild(Q);let X=document.createElement("span");X.textContent=T.name,X.style.overflow="hidden",X.style.textOverflow="ellipsis",X.style.whiteSpace="nowrap",X.style.flex="1",N.appendChild(X),H&&(N.style.color="#fff",N.style.fontWeight="600",Q.style.opacity="1"),N.onmouseenter=()=>{H||(N.style.backgroundColor="#f8f8f9",N.style.transform="translateY(-1px) scale(1.01)",N.style.boxShadow="0 4px 8px rgba(0,0,0,0.08)",N.style.borderColor="rgba(0, 122, 255, 0.2)")},N.onmouseleave=()=>{H||(N.style.backgroundColor=s.bgSurface,N.style.transform="translateY(0) scale(1)",N.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",N.style.borderColor=s.borderSubtle)},N.onmousedown=()=>{N.style.transform=H?"scale(0.97)":"scale(0.98)"},N.onmouseup=()=>{N.style.transform=H?"scale(1)":"translateY(-1px) scale(1.01)"},N.onclick=()=>{R(T)},h.appendChild(N)})})}let G=null;async function R(te){a?.id!==te.id&&(a=te,G&&clearTimeout(G),I.style.opacity="0",I.style.transform="translateY(5px)",G=setTimeout(()=>{V.style.display=te.isSmartCR?"block":"none",z.style.display=te.isSmartCR?"none":"block",F.style.display=te.isSmartCR?"none":"block",L(),ee(),ae(),I.style.opacity="1",I.style.transform="translateY(0)",G=null},150))}function ee(){if(O.innerHTML="",!a||a.isSmartCR){a?.isSmartCR?(O.style.display="block",O.innerHTML=`<div style="padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):O.style.display="none";return}let te=a.placeholders&&a.placeholders.length>0;if(O.style.display=te?"block":"none",!te)return;let j=document.createElement("div");Object.assign(j.style,{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}),(a.placeholders||[]).forEach(U=>{let K=document.createElement("div"),c=document.createElement("label");c.textContent=U.label,Object.assign(c.style,{display:"block",fontSize:"11px",fontWeight:"700",color:s.textSecondary,marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.5px"});let m=document.createElement("input");m.type=U.type||"text",m.dataset.key=U.key,Object.assign(m.style,{width:"100%",padding:"10px 12px",borderRadius:"8px",border:`1.5px solid ${s.borderSubtle}`,backgroundColor:"#FBFBFD",fontSize:"14px",boxSizing:"border-box",transition:"all 0.2s ease",outline:"none"}),m.onfocus=()=>{m.style.borderColor=s.primary,m.style.backgroundColor="#FFFFFF",m.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)"},m.onblur=()=>{m.style.borderColor=s.borderSubtle,m.style.backgroundColor="#FBFBFD",m.style.boxShadow="none"},U.auto==="agentName"&&(m.value=Ke().split(" ")[0]),m.addEventListener("input",ae),K.appendChild(c),K.appendChild(m),j.appendChild(K)}),O.appendChild(j)}function ae(){if(!a){M.innerHTML=`
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
                </div>`;return}if(a.isSmartCR){M.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${a.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let te=a.template;(O.querySelectorAll("input")||[]).forEach(U=>{let K=U.dataset.key,c=U.value;if(U.type==="date"&&c){let[v,x,w]=c.split("-");c=`${x}/${w}/${v}`}c=c||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${K}</span>`;let m=K.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");te=te.replace(new RegExp(m,"g"),c)}),M.innerHTML=te}return y.addEventListener("input",te=>{n=te.target.value,C.style.display=n?"block":"none",L()}),F.onclick=()=>{let te=M.innerHTML,j=new Blob([te],{type:"text/html"}),U=M.innerText,K=[new ClipboardItem({"text/html":j,"text/plain":new Blob([U],{type:"text/plain"})})];navigator.clipboard.write(K).then(()=>Z("E-mail copiado com sucesso!"),()=>Z("Erro ao copiar e-mail",{error:!0}))},z.onclick=async()=>{if(!a)return;let te=Qe(),j={...a,body:M.innerHTML};try{await yo(j),Y()}catch{Z("Erro ao preencher e-mail",{error:!0})}finally{te()}},V.onclick=async()=>{if(!a||!a.isSmartCR)return;let te=Qe();try{await ht(a.code),Y()}catch{Z("Erro ao aplicar Smart CR",{error:!0})}finally{te()}},Y}var ko=["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],Mt={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:ko,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:ko,fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]}};var ie={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",danger:"#D93025",dangerBg:"#FCE8E6",success:"#34A853",successBg:"#E6F4EA"},ma={inicio:{PT:"Abertura",ES:"Apertura"},meio:{PT:"Implementa\xE7\xE3o (Tag Support)",ES:"Implementaci\xF3n"},fim:{PT:"Fechamento",ES:"Cierre"}};function ga(){if(document.getElementById("csa-styles-v2"))return;let t=document.createElement("style");t.id="csa-styles-v2",t.textContent=`
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
    `,document.head.appendChild(t)}function To(){let t="v3.1.0";ga();let e={},o="PT",a="BAU",n=!1,i=document.createElement("div");i.id="call-script-popup",i.classList.add("cw-module-window"),Object.assign(i.style,ye,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:i,googleLine:null},s=null;function l(){n&&Fe().then(v=>{let x=i.querySelector("#cw-ctx-name"),w=i.querySelector("#cw-ctx-cid"),E=i.querySelector("#cw-ctx-email");if(x&&(x.textContent=v.advertiserName||"Cliente Desconhecido"),w){let S=v.cid||"---";w.textContent!==S&&(w.textContent=S)}if(E){let S=v.clientEmail||"N\xE3o encontrado";E.textContent!==S&&(E.textContent=S,E.title=S)}})}function u(){Fe().then(v=>{let x=new Date().toLocaleDateString("pt-BR"),w=i.querySelector("#cw-am-message-area"),E=i.querySelector("#cw-am-review-container"),S=`Ol\xE1. Bom dia!

Estou com um caso do seu cliente (${v.advertiserName||"Cliente"}) em andamento hoje (${x}). Fiz a primeira tentativa de contato agora h\xE1 pouco, mas n\xE3o tive sucesso.

Farei uma nova tentativa em alguns minutos. Caso ele n\xE3o atenda novamente, seguirei com o e-mail padr\xE3o de reagendamento/no-show e te mantenho no radar.

Dados do caso para seu controle:

Cliente: ${v.advertiserName||"---"}
CID: ${v.cid||"---"}
Case ID: ${v.caseId||"---"}
E-mail: ${v.clientEmail||"---"}`;w&&(w.value=S),E&&(E.classList.add("visible"),E.scrollIntoView({behavior:"smooth",block:"end"}))})}function p(){n=!n,be(n,i,"cw-btn-script"),n?(l(),s||(s=setInterval(l,2e3))):s&&(clearInterval(s),s=null)}let g=ge(i,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",r,()=>{p()});i.appendChild(g);let b=document.createElement("div");b.className="csa-context-banner",b.innerHTML=`
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
  `;let f=b.querySelector("#csa-toggle-options"),y=b.querySelector("#csa-options-content"),h=b.querySelector("#csa-options-arrow"),C=!1;f.onclick=()=>{C=!C,h.classList.toggle("expanded",C),y.classList.toggle("expanded",C),$.playClick()};let I=b.querySelector("#cw-pill-message"),O=b.querySelector("#cw-am-copy-final"),_=b.querySelector("#cw-am-message-area");I.addEventListener("click",()=>{u()}),O.addEventListener("click",()=>{_.value&&(navigator.clipboard.writeText(_.value),Z("Mensagem copiada!"),$.playSuccess(),O.classList.add("copied-flash"),O.textContent="Copiado!",setTimeout(()=>{O.classList.remove("copied-flash"),O.textContent="Copiar Mensagem Final"},2e3))});let P=(v,x)=>{let w=b.querySelector(v),E=b.querySelector(x);w.onclick=()=>{let S=E.textContent;!S||S.includes("---")||S.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(S),$.playSuccess(),w.classList.add("copied"),setTimeout(()=>w.classList.remove("copied"),1500))}};i.appendChild(b);let J=document.createElement("div");J.className="csa-progress-container";let oe=document.createElement("div");oe.className="csa-progress-fill",J.appendChild(oe),i.appendChild(J);let q=document.createElement("div");q.id="csa-content",q.className="csa-content-area",i.appendChild(q);let F=document.createElement("div");F.className="csa-footer";let z=document.createElement("span");z.className="csa-credit",z.textContent="by lucaste@";let V=document.createElement("button");V.className="csa-reset-btn",V.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',V.onclick=()=>{for(let v in e)delete e[v];K()},F.appendChild(z),F.appendChild(V),i.appendChild(F);let M=document.createElement("div");M.className="csa-controls";let D=document.createElement("div");D.className="csa-segmented-control",D.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `;let Y=document.createElement("div");Y.className="csa-segmented-control",Y.innerHTML=`
      <div class="csa-segmented-indicator" id="lang-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-lang="PT">PT</button>
      <button data-lang="ES">ES</button>
  `,M.appendChild(D),M.appendChild(Y),q.appendChild(M);let k=D.querySelectorAll("button"),L=D.querySelector("#type-indicator");k.forEach((v,x)=>{v.onclick=()=>{k.forEach(w=>w.classList.remove("active")),v.classList.add("active"),L.style.transform=`translateX(${x*(D.offsetWidth/2-2)}px)`,a=v.dataset.type,$.playClick(),K()}});let G=Y.querySelectorAll("button"),R=Y.querySelector("#lang-indicator");G.forEach((v,x)=>{v.onclick=()=>{G.forEach(w=>w.classList.remove("active")),v.classList.add("active"),R.style.transform=`translateX(${x*(Y.offsetWidth/2-2)}px)`,o=v.dataset.lang,$.playClick(),K()}});let ee=document.createElement("div");ee.id="csa-checklist-area",q.appendChild(ee);let ae=document.createElement("div");Object.assign(ae.style,qe),ae.className="no-drag",ae.title="Redimensionar",i.appendChild(ae),Oe(i,ae),document.body.appendChild(i),P("#cw-pill-cid","#cw-ctx-cid"),P("#cw-pill-email","#cw-ctx-email");function te(v){return v.replace(/\n/g,"<br>")}function j(v,x,w,E){let S=`${v}-${x}-${E}`,d=!!e[S],A=document.createElement("div");A.className="csa-item-row"+(d?" completed":"");let T=document.createElement("div");T.className="csa-checkbox"+(d?" checked":""),T.innerHTML=d?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"";let H=document.createElement("span");return H.className="csa-item-text"+(d?" completed":""),H.innerHTML=te(w),A.onclick=()=>{let N=!e[S];e[S]=N,$.playClick(),A.classList.toggle("completed",N),H.classList.toggle("completed",N),T.classList.toggle("checked",N),T.innerHTML=N?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':"",N&&(T.classList.add("pulse"),setTimeout(()=>T.classList.remove("pulse"),150)),c(v,Mt[v])},A.appendChild(T),A.appendChild(H),{row:A,isDone:d}}function U(v,x,w){let E=document.createElement("div");E.className="csa-card";let S=document.createElement("div");S.className="csa-card-title",S.textContent=ma[x][o]||"";let d=document.createElement("span");d.className="csa-card-counter",S.appendChild(d),E.appendChild(S);let A=0;w.forEach((H,N)=>{let{row:Q,isDone:X}=j(v,x,H,N);X&&A++,E.appendChild(Q)});let T=A===w.length&&w.length>0;return E.classList.toggle("done",T),d.classList.toggle("done",T),d.textContent=`${A}/${w.length}`,E}function K(){ee.innerHTML="";let v=`${o} ${a}`,x=Mt[v];if(!x){ee.innerHTML='<div class="csa-empty-state"><div class="csa-empty-state-icon">\u2615</div><div>Script n\xE3o configurado.</div></div>',oe.style.width="0%";return}let w=0,E=0;["inicio","meio","fim"].forEach(S=>{x[S]&&(w+=x[S].length)}),["inicio","meio","fim"].forEach(S=>{let d=x[S];!d||d.length===0||(d.forEach((A,T)=>{let H=`${v}-${S}-${T}`;e[H]&&E++}),ee.appendChild(U(v,S,d)))}),m(w,E)}function c(v,x){let w=0,E=0;["inicio","meio","fim"].forEach(S=>{let d=x[S]||[];w+=d.length,d.forEach((A,T)=>{e[`${v}-${S}-${T}`]&&E++})}),m(w,E),setTimeout(()=>K(),200)}function m(v,x){let w=v===0?0:x/v*100;oe.style.width=`${w}%`,oe.classList.toggle("complete",w===100)}return K(),p}var tt={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Ge={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},yt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},Dt="cw_link_history_v4";function Fo(t,e){try{let o=JSON.parse(localStorage.getItem(Dt)||"[]");o=o.filter(a=>a.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(Dt,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function ba(){try{return JSON.parse(localStorage.getItem(Dt)||"[]")}catch{return[]}}function Io(){let t="v4.6",e="",o=!1,a=null,n=!1,i={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},r=document.createElement("div");r.id="links-popup",r.classList.add("cw-module-window"),Object.assign(r.style,ye,{right:"100px",width:"600px",height:"650px",background:i.bgApp,overflow:"hidden"});let l=ge(r,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:r,googleLine:null},()=>M());r.appendChild(l);let u=document.createElement("div");u.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",r.appendChild(u);let p=document.createElement("div");p.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${i.bgSidebar};
      border-right: 1px solid ${i.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,u.appendChild(p);let g=document.createElement("div");g.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",u.appendChild(g);let b=document.createElement("div");b.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let f=document.createElement("div");f.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let y=document.createElement("div");y.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',y.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let h=document.createElement("input");h.type="text",h.placeholder="Buscar ferramenta ou SOP...",h.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${i.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,h.onfocus=()=>{f.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",f.style.border="1px solid #1a73e8"},h.onblur=()=>{f.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",f.style.border="1px solid transparent"},f.appendChild(y),f.appendChild(h),b.appendChild(f),g.appendChild(b);let C=document.createElement("div");C.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",g.appendChild(C);let I=null;function O(){if(I)return;I=document.createElement("div"),I.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let D=document.createElement("div");D.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",D.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let Y=document.createElement("button");Y.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',Y.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",Y.onclick=()=>{P(),n=!1,F()},D.appendChild(Y),I.appendChild(D);let k=document.createElement("div");k.id="cw-history-list",k.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",I.appendChild(k),g.appendChild(I)}function _(){I||O();let D=I.querySelector("#cw-history-list");D.innerHTML="";let Y=ba();Y.length===0?D.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':Y.forEach(k=>{let L=V(k,Ge[k._originalCat],!0,k._originalCat);D.appendChild(L)}),requestAnimationFrame(()=>I.style.transform="translateY(0)")}function P(){I&&(I.style.transform="translateY(100%)")}function J(){p.innerHTML="";let D=oe("history","Recentes",Ge.history);D.id="cw-sidebar-btn-history",D.onclick=()=>{$.playClick(),n=!n,n?_():P(),F()},p.appendChild(D);let Y=document.createElement("div");Y.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",p.appendChild(Y),Object.keys(tt).forEach(k=>{let L=tt[k],G=oe(k,L.label,Ge[k]);G.id=`cw-sidebar-btn-${k}`,G.onclick=()=>{$.playClick(),n&&(n=!1,P()),q(k)},p.appendChild(G)})}function oe(D,Y,k){let L=document.createElement("div");L.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${i.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,L.title=Y,L.dataset.key=D;let G=document.createElement("div");G.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",G.innerHTML=k||Ge.tasks;let R=document.createElement("div");return R.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",R.textContent=Y,L.appendChild(G),L.appendChild(R),L.onmouseenter=()=>{a!==D&&!(D==="history"&&n)&&(L.style.background="#F1F3F4",G.style.transform="scale(1.1)")},L.onmouseleave=()=>{a!==D&&!(D==="history"&&n)&&(L.style.background="transparent",G.style.transform="scale(1)")},L}function q(D){let Y=document.getElementById(`cat-anchor-${D}`);Y&&(Y.scrollIntoView({behavior:"smooth",block:"start"}),a=D,F())}function F(){Object.keys(tt).forEach(Y=>{let k=p.querySelector(`#cw-sidebar-btn-${Y}`);if(k)if(a===Y&&!n){let L=yt[Y];k.style.background=L.bg,k.style.color=L.color,k.querySelector("div:first-child").style.transform="scale(1.1)"}else k.style.background="transparent",k.style.color=i.textSecondary,k.querySelector("div:first-child").style.transform="scale(1)"});let D=p.querySelector("#cw-sidebar-btn-history");D&&(n?(D.style.background="#3C4043",D.style.color="#FFFFFF"):(D.style.background="transparent",D.style.color=i.textSecondary))}function z(){if(C.innerHTML="",e.trim()!==""){let Y=[];if(Object.entries(tt).forEach(([L,G])=>{let R=G.links.filter(ee=>ee.name.toLowerCase().includes(e.toLowerCase())||ee.desc.toLowerCase().includes(e.toLowerCase()));Y.push(...R.map(ee=>({...ee,_cat:L})))}),Y.length===0){C.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let k=document.createElement("div");k.innerHTML="Resultados da busca",k.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",C.appendChild(k),Y.forEach(L=>{let G=V(L,Ge[L._cat],!1,L._cat);C.appendChild(G)});return}Object.entries(tt).forEach(([Y,k])=>{let L=yt[Y],G=document.createElement("div"),R=document.createElement("div");R.id=`cat-anchor-${Y}`,R.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${L.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,R.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${L.color};"></div>
            ${k.label}
          `,G.appendChild(R);let ee=document.createElement("div");ee.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",k.links.forEach(ae=>{let te=V(ae,Ge[Y],!1,Y);ee.appendChild(te)}),G.appendChild(ee),C.appendChild(G)});let D=document.createElement("div");D.style.height="80px",C.appendChild(D)}function V(D,Y,k,L){let G=document.createElement("div"),R=yt[L]||yt.history;G.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let ee=document.createElement("div");ee.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${R.bg}; color: ${R.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,ee.innerHTML=Y||Ge.tasks;let ae=ee.querySelector("svg");ae&&(ae.style.width="22px",ae.style.height="22px");let te=document.createElement("div");te.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let j=document.createElement("div");j.style.cssText=`font-size: 14px; font-weight: 600; color: ${i.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,j.textContent=D.name;let U=document.createElement("div");U.style.cssText=`font-size: 12px; color: ${i.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,U.textContent=D.desc,te.appendChild(j),te.appendChild(U);let K=document.createElement("div");return K.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',K.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,K.title="Copiar URL",G.onmouseenter=()=>{G.style.transform="translateY(-2px)",G.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",G.style.borderColor="rgba(0,0,0,0.05)",G.style.borderLeft=`4px solid ${R.color}`,K.style.opacity="1",K.style.background="#F1F3F4"},G.onmouseleave=()=>{G.style.transform="translateY(0)",G.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",G.style.border="1px solid transparent",K.style.opacity="0",K.style.background="transparent"},G.onclick=()=>{!k&&L&&Fo(D,L),window.open(D.url,"_blank")},K.onclick=c=>{c.stopPropagation(),$.playClick(),navigator.clipboard.writeText(D.url),!k&&L&&Fo(D,L),Z("Link copiado!")},G.appendChild(ee),G.appendChild(te),G.appendChild(K),G}h.addEventListener("input",D=>{e=D.target.value,z()});function M(){o=!o,be(o,r,"cw-btn-links")}return document.body.appendChild(r),J(),z(),M}var ze=[];function Nt(t){ze=t}var fa=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function Lo(){let t="v4.9",e=!1,o=null,a=null;function n(k){if(!k)return"";try{let L=new Date(k);return isNaN(L.getTime())?String(k):L.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(k)}}if(!document.getElementById("cw-broadcast-hd-css")){let k=document.createElement("style");k.id="cw-broadcast-hd-css",k.innerHTML=`
        @keyframes cw-pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(147, 51, 234, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0); }
        }
        
        .cw-btn-interactive {
            transition: transform 0.1s ease, background 0.2s ease;
            cursor: pointer; user-select: none;
        }
        .cw-btn-interactive:active { transform: scale(0.96); }

        /* Overlay do Editor */
        .cw-editor-overlay {
            position: absolute; inset: 0; 
            background: rgba(255, 255, 255, 0.98); 
            z-index: 200; display: flex; flex-direction: column;
            transform: translateY(100%); 
            transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
        }
        .cw-editor-overlay.active { transform: translateY(0); }

        /* Inputs HD */
        .cw-hd-input {
            width: 100%; padding: 12px 14px;
            border: 1px solid #DADCE0; border-radius: 12px;
            font-size: 14px; color: #202124; background: #FFF;
            transition: border 0.2s, box-shadow 0.2s;
            box-sizing: border-box; outline: none; font-family: 'Google Sans', Roboto, sans-serif;
        }
        .cw-hd-input:focus { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.1); }
        .cw-hd-input::placeholder { color: #9AA0A6; }

        .cw-radio-group { display: flex; gap: 12px; }
        .cw-radio-option {
            flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
            padding: 12px; border-radius: 12px; border: 1px solid #E0E0E0;
            font-size: 13px; font-weight: 600; cursor: pointer;
            transition: all 0.2s; position: relative; color: #5F6368;
        }
        .cw-radio-option:hover { background: #F8F9FA; }
        .cw-radio-option input { position: absolute; opacity: 0; }
        
        .cw-radio-option.info.checked { background: #E8F0FE; color: #1967D2; border-color: #1967D2; }
        .cw-radio-option.critical.checked { background: #FEE2E2; color: #B91C1C; border-color: #EF4444; }
        .cw-radio-option.success.checked { background: #DCFCE7; color: #15803D; border-color: #22C55E; }
        
        .cw-card-actions {
            display: flex; justify-content: flex-end; gap: 12px;
            padding: 12px 20px; background: #F8F9FA;
            border-top: 1px solid #F1F3F4;
        }
        .cw-action-btn {
            display: flex; align-items: center; gap: 6px;
            padding: 6px 12px; border-radius: 8px;
            font-size: 12px; font-weight: 600; cursor: pointer;
            border: 1px solid transparent; background: transparent;
            transition: all 0.2s;
        }
        .cw-action-btn.edit { color: #1967D2; }
        .cw-action-btn.edit:hover { background: #E8F0FE; }
        .cw-action-btn.delete { color: #D93025; }
        .cw-action-btn.delete:hover { background: #FCE8E6; }
      `,document.head.appendChild(k)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},r={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function s(k){if(!k||typeof k!="string")return"";let L=k;return L=L.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),L=L.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),L=L.replace(/_(.*?)_/g,"<i>$1</i>"),L=L.replace(/\n/g,"<br>"),L=to(L),L}let l=document.createElement("div");l.id="broadcast-popup",l.classList.add("cw-module-window"),Object.assign(l.style,ye,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let u={popup:l,googleLine:null};function p(){if(e=!e,be(e,l,"cw-btn-broadcast"),e){let k=document.getElementById("cw-btn-broadcast");k&&k.classList.remove("has-new"),oe()}}let g=ge(l,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",u,()=>p()),b=g.querySelector(".cw-header-actions")||g.lastElementChild,f=null;function y(){let k=null;try{k=fe()}catch{console.warn("TechSol: Auth Pending")}if(k){let L=k.split("@")[0].toLowerCase(),G=ut.includes(L);if(window._cwIsAdmin=G,window._cwCurrentUser=L,G&&b&&!b.querySelector("#cw-admin-btn")){let R=document.createElement("div");R.id="cw-admin-btn",R.className="cw-btn-interactive",R.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(R.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),R.title="Novo Aviso",R.onclick=ee=>{ee.stopPropagation(),I()},b.insertBefore(R,b.firstChild),f||C(),F()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(y,2e3))}if(b){let k=document.createElement("button");k.textContent="Limpar",k.className="cw-btn-interactive",Object.assign(k.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),k.onclick=L=>{L.stopPropagation(),$.playSuccess();let G=ze.map(R=>R.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(G)),F(),q()},b.insertBefore(k,b.firstChild)}l.appendChild(g);let h=document.createElement("div");h.id="cw-update-status",h.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",l.appendChild(h);function C(){f=document.createElement("div"),f.className="cw-editor-overlay",f.innerHTML=`
        <div style="flex:1; overflow-y:auto; padding: 24px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
                <span id="cw-editor-title-label" style="font-size: 20px; font-weight: 700; color: #202124;">Novo Aviso</span>
                <button id="cw-bc-close-x" class="cw-btn-interactive" style="background:none; border:none; color:#5f6368; padding:8px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
            
            <div style="margin-bottom:20px;">
                <label style="font-size:12px; font-weight:700; color:#5f6368; margin-bottom:8px; display:block;">TIPO DO COMUNICADO</label>
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

            <div style="margin-bottom:20px;">
                 <label style="font-size:12px; font-weight:700; color:#5f6368; margin-bottom:8px; display:block;">T\xCDTULO</label>
                 <input id="cw-bc-title" class="cw-hd-input" placeholder="Resumo do assunto">
            </div>

            <div style="margin-bottom:20px;">
                 <label style="font-size:12px; font-weight:700; color:#5f6368; margin-bottom:8px; display:block;">MENSAGEM</label>
                 <textarea id="cw-bc-text" class="cw-hd-input" placeholder="Escreva os detalhes aqui... Suporta HTML e Emojis :)" style="height:160px; resize:none; line-height:1.6;"></textarea>
            </div>
        </div>

        <div style="padding: 16px 24px; border-top: 1px solid #F1F3F4; background: #fff; display: flex; justify-content: flex-end; gap: 12px;">
            <button id="cw-bc-cancel" class="cw-btn-interactive" style="padding:10px 20px; background:white; border:1px solid #dadce0; color:#5f6368; border-radius:24px; font-weight:600; font-size:13px;">Cancelar</button>
            <button id="cw-bc-send" class="cw-btn-interactive" style="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:24px; font-weight:600; box-shadow:0 4px 12px rgba(26,115,232,0.3); font-size:13px;">Publicar</button>
        </div>
      `,f.querySelectorAll('input[name="cw-bc-type"]').forEach(R=>{R.addEventListener("change",()=>{f.querySelectorAll(".cw-radio-option").forEach(ee=>ee.classList.remove("checked")),R.parentElement.classList.add("checked")})}),setTimeout(()=>{let R=f.querySelector(".cw-radio-option.info");R&&R.classList.add("checked")},100);let k=f.querySelector("#cw-bc-cancel"),L=f.querySelector("#cw-bc-close-x"),G=f.querySelector("#cw-bc-send");k.onclick=O,L.onclick=O,G.onclick=_,l.appendChild(f)}function I(k=null){if(!f)return;let L=f.querySelector("#cw-editor-title-label"),G=f.querySelector("#cw-bc-title"),R=f.querySelector("#cw-bc-text"),ee=f.querySelector("#cw-bc-send");if(k){a=k.id,L.textContent="Editar Aviso",G.value=k.title||"",R.value=k.text||"",ee.textContent="Salvar Altera\xE7\xF5es";let ae=k.type||"info",te=f.querySelector(`input[name="cw-bc-type"][value="${ae}"]`);te&&te.click()}else{a=null,L.textContent="Novo Aviso",G.value="",R.value="",ee.textContent="Publicar";let ae=f.querySelector('input[name="cw-bc-type"][value="info"]');ae&&ae.click()}f.classList.add("active"),setTimeout(()=>G.focus(),300)}function O(){f&&f.classList.remove("active"),a=null}async function _(){let k=f.querySelector("#cw-bc-send"),L=f.querySelector("#cw-bc-title"),G=f.querySelector("#cw-bc-text"),R=f.querySelector('input[name="cw-bc-type"]:checked'),ee=R?R.value:"info";if(!L.value.trim()||!G.value.trim()){Z("Preencha todos os campos!",{error:!0});return}k.textContent="Salvando...",k.style.opacity="0.7";let ae=!1;a?ae=await de.updateBroadcast(a,{title:L.value,text:G.value,type:ee}):ae=await de.sendBroadcast({title:L.value,text:G.value,type:ee,author:window._cwCurrentUser||"admin"}),ae?(Z(a?"Atualizado!":"Publicado!"),$.playSuccess(),O(),setTimeout(()=>oe(),1500)):(Z("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),k.textContent=a?"Salvar Altera\xE7\xF5es":"Publicar",k.style.opacity="1")}async function P(k){if(await ve("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await de.deleteBroadcast(k)){Z("Aviso removido."),$.playClick();let R=ze.findIndex(ee=>ee.id===k);R>-1&&ze.splice(R,1),F(),setTimeout(()=>oe(),1500)}else Z("Erro ao excluir.",{error:!0})}let J=document.createElement("div");J.className="cw-nice-scroll",Object.assign(J.style,i.feedContainer),l.appendChild(J);async function oe(){e&&(h.style.display="block",h.innerHTML="\u{1F504} Sincronizando...");try{let k=await de.fetchData();k&&k.broadcast&&(Nt(k.broadcast),q(),e&&(F(),h.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{h.style.display="none"},1500)))}catch{e&&(h.innerHTML="\u26A0\uFE0F Offline")}}function q(){let k=document.getElementById("cw-btn-broadcast");if(!k)return;let L=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(ze.some(R=>!L.includes(R.id))){if(k.classList.add("has-new"),!k.querySelector(".cw-badge")){let R=document.createElement("div");R.className="cw-badge",Object.assign(R.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),k.appendChild(R)}}else{k.classList.remove("has-new");let R=k.querySelector(".cw-badge");R&&R.remove()}}function F(){J.innerHTML="";let k=l.querySelector("#cw-bau-widget");k&&k.remove();let L=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),G=[...ze].sort((j,U)=>{let K=new Date(j.date).getTime()||0;return(new Date(U.date).getTime()||0)-K}),R=G.findIndex(j=>j.title&&j.title.toLowerCase().includes("disponibilidade bau"));if(R!==-1){let j=G[R];G.splice(R,1);let U=document.createElement("div");U.id="cw-bau-widget",Object.assign(U.style,i.bauContainer);let K=[],c=(j.text||"").split(`
`),m=/\d{1,2}\/\d{1,2}/,v="\u{1F4C5}";if(c.forEach(d=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(d)?v="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(d)&&(v="\u{1F1EA}\u{1F1F8}");let A=d.match(m);if(A){let T=A[0],H=v;/🇧🇷|🇵🇹|PT|BR/i.test(d)?H="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(d)&&(H="\u{1F1EA}\u{1F1F8}"),K.some(Q=>Q.flag===H&&Q.date===T)||K.push({flag:H,date:T})}}),K.length===0){let d=(j.text||"").match(/\d{1,2}\/\d{1,2}/g);d&&[...new Set(d)].forEach(A=>K.push({flag:"\u{1F4C5}",date:A}))}let x="",w='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(w=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${w}
              `),K.length>0?x=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${K.map(A=>`
                  <div style="${Ne(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${Ne(i.bauFlag)}">${A.flag}</span>
                      <span style="${Ne(i.bauDate)}">${A.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${w}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${s(j.text)}</div>
              `:x=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${s(j.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,U.innerHTML=`
              <div style="${Ne(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${Ne(i.liveIndicator)}">
                      <div style="${Ne(i.pulseDot)}"></div>
                      <span style="${Ne(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${n(j.date)}</div>
              </div>
              ${x}
          `,h.after(U);let E=U.querySelector("#cw-bau-toggle-btn"),S=U.querySelector("#cw-bau-full");if(E&&S&&(E.onclick=()=>{let d=S.style.display==="none";S.style.display=d?"block":"none",E.textContent=d?"Ocultar":"Detalhes"}),window._cwIsAdmin){let d=U.querySelector(".cw-bau-edit");d&&(d.onclick=()=>I(j))}}let ee=G.sort((j,U)=>{let K=L.includes(j.id),c=L.includes(U.id);return K===c?0:K?1:-1});if(ee.length===0&&!R){let j=document.createElement("div");Object.assign(j.style,i.emptyState),j.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,J.appendChild(j)}let ae=ee.filter(j=>!L.includes(j.id)),te=ee.filter(j=>L.includes(j.id));if(ae.forEach(j=>J.appendChild(z(j,!1))),te.length>0){let j=document.createElement("div");Object.assign(j.style,i.historyDivider),j.innerHTML=`<span>Hist\xF3rico (${te.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let U=document.createElement("div");Object.assign(U.style,i.historyContainer),te.forEach(c=>U.appendChild(z(c,!0)));let K=!1;j.onclick=()=>{$.playClick(),K=!K,U.style.display=K?"flex":"none",j.querySelector("svg").style.transform=K?"rotate(180deg)":"rotate(0deg)"},J.appendChild(j),J.appendChild(U)}}function z(k,L){let G=document.createElement("div");Object.assign(G.style,L?i.cardHistory:i.card);let R=r[k.type]||r.info,ee=document.createElement("div");Object.assign(ee.style,i.cardHeader);let ae=document.createElement("div");Object.assign(ae.style,i.typeTag,{color:R.color,background:R.bg}),ae.innerHTML=`${R.icon} <span>${k.type}</span>`;let te=document.createElement("span");if(Object.assign(te.style,i.dateTag),te.textContent=n(k.date),ee.appendChild(ae),L)ee.appendChild(te);else{let m=document.createElement("button");m.className="cw-btn-interactive",Object.assign(m.style,i.dismissBtn),m.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',m.onmouseenter=()=>{m.style.color="#1e8e3e",m.style.background="#e6f4ea",m.style.borderColor="#1e8e3e"},m.onmouseleave=()=>{m.style.color="#5f6368",m.style.background="#fff",m.style.borderColor="rgba(0,0,0,0.1)"},m.onclick=v=>{v.stopPropagation(),$.playClick(),G.style.transform="translateX(20px)",G.style.opacity="0",setTimeout(()=>{let x=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");x.push(k.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(x)),F(),q()},200)},ee.appendChild(m)}let j=document.createElement("div");Object.assign(j.style,i.cardContent);let U=document.createElement("div");Object.assign(U.style,i.msgTitle),U.textContent=k.title;let K=document.createElement("div");Object.assign(K.style,i.msgBody),K.innerHTML=s(k.text);let c=document.createElement("div");if(Object.assign(c.style,i.msgMeta),c.innerHTML=`Publicado por <b>${k.author||"Sistema"}</b>`,L||(c.innerHTML+=` \u2022 ${n(k.date)}`),j.appendChild(U),j.appendChild(K),j.appendChild(c),G.appendChild(ee),G.appendChild(j),window._cwIsAdmin){let m=document.createElement("div");m.className="cw-card-actions";let v=document.createElement("button");v.className="cw-action-btn edit",v.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',v.onclick=()=>I(k);let x=document.createElement("button");x.className="cw-action-btn delete",x.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',x.onclick=()=>P(k.id),m.appendChild(v),m.appendChild(x),G.appendChild(m)}return G}let V=de.getCachedBroadcasts();V.length>0&&(Nt(V),F()),setTimeout(y,500),oe(),o||(o=setInterval(oe,fa));let M=document.createElement("div");Object.assign(M.style,qe),M.className="no-drag",l.appendChild(M),Oe(l,M),document.body.appendChild(l);let D=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),Y=ze.some(k=>!D.includes(k.id));return{toggle:p,hasUnread:Y}}function qo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},a=document.createElement("div");Object.assign(a.style,o.overlay);let n=document.createElement("div");Object.assign(n.style,o.card);let i=document.createElement("div");Object.assign(i.style,o.icon);let r=document.createElement("div");Object.assign(r.style,o.title);let s=document.createElement("div");Object.assign(s.style,o.text);let l=document.createElement("div");Object.assign(l.style,o.dotsContainer);let u=document.createElement("div");Object.assign(u.style,o.btnContainer);let p=document.createElement("button");p.textContent="Pular",Object.assign(p.style,o.btn,o.btnSkip),p.onmouseover=()=>p.style.color="#202124",p.onmouseout=()=>p.style.color="#5f6368";let g=document.createElement("button");g.textContent="Pr\xF3ximo",Object.assign(g.style,o.btn,o.btnNext),g.onmouseover=()=>g.style.transform="scale(1.05)",g.onmouseout=()=>g.style.transform="scale(1)",u.appendChild(p),u.appendChild(g),n.appendChild(i),n.appendChild(r),n.appendChild(s),n.appendChild(l),n.appendChild(u),a.appendChild(n),document.body.appendChild(a);function b(y){let h=t[y];i.textContent=h.icon,r.textContent=h.title,s.textContent=h.text,l.innerHTML="",t.forEach((C,I)=>{let O=document.createElement("div");Object.assign(O.style,o.dot),I===y&&Object.assign(O.style,o.dotActive),l.appendChild(O)}),h.isLast?(p.style.display="none",g.textContent="Come\xE7ar \u{1F680}",g.style.width="100%"):(p.style.display="block",g.textContent="Pr\xF3ximo",g.style.width="auto")}function f(){localStorage.setItem("cw_onboarding_seen_v1","true"),a.style.opacity="0",n.style.transform="translateY(20px)",setTimeout(()=>a.remove(),400),$.playSuccess(),Z("Tudo pronto! Use o menu flutuante.")}g.onclick=()=>{$.playClick(),e<t.length-1?(e++,b(e)):f()},p.onclick=async()=>{await ve("Pular o tutorial?")&&f()},b(0),requestAnimationFrame(()=>{a.style.opacity="1",n.style.transform="translateY(0)"})}var Oo={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function _o(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&xa(t)}function xa(t){let e=Oo.slides,o=0,a={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,a.overlay);let i=document.createElement("div");Object.assign(i.style,a.card);let r=document.createElement("div");Object.assign(r.style,a.badge),r.textContent=`Atualiza\xE7\xE3o ${t}`;let s=document.createElement("div");Object.assign(s.style,a.icon);let l=document.createElement("div");Object.assign(l.style,a.title);let u=document.createElement("div");Object.assign(u.style,a.text);let p=document.createElement("div");Object.assign(p.style,a.dotsContainer);let g=document.createElement("button");Object.assign(g.style,a.btn),g.onmouseover=()=>g.style.transform="scale(1.02)",g.onmouseout=()=>g.style.transform="scale(1)",i.appendChild(r),i.appendChild(s),i.appendChild(l),i.appendChild(u),i.appendChild(p),i.appendChild(g),n.appendChild(i),document.body.appendChild(n);function b(y){let h=e[y];s.textContent=h.icon,l.textContent=h.title,u.textContent=h.text,p.innerHTML="",e.forEach((C,I)=>{let O=document.createElement("div");Object.assign(O.style,a.dot),I===y&&Object.assign(O.style,a.dotActive),p.appendChild(O)}),y===e.length-1?g.textContent="Entendi, vamos l\xE1! \u{1F44D}":g.textContent="Pr\xF3ximo"}function f(){localStorage.setItem("cw_last_version",t),n.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>n.remove(),400),$.playSuccess(),Z(`TechSol atualizado para ${t}!`)}g.onclick=()=>{$.playClick(),o<e.length-1?(o++,b(o)):f()},b(0),requestAnimationFrame(()=>{n.style.opacity="1",i.style.transform="translateY(0)"})}var Mo="cw_timezone_pinned",zt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],ha=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function Do(){let t="v2.2 Pro",e=!1,o=null,a="mx",n=JSON.parse(localStorage.getItem(Mo)||"[]"),i="",r="all",s=new Date;s.setHours(14,0,0,0);let l={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},u={container:{display:"flex",flexDirection:"column",height:"100%",background:l.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:l.surface,borderBottom:`1px solid ${l.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:l.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:l.primary,borderBottomColor:l.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:l.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:l.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${l.border}`,background:l.surface,color:l.textSub,transition:"all 0.2s"},chipActive:{background:l.primaryBg,color:l.primary,borderColor:l.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:l.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${l.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:l.surface,border:`1px solid ${l.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:l.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},p=document.createElement("div");p.id="timezone-popup",p.classList.add("cw-module-window"),Object.assign(p.style,ye,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let b=ge(p,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:p},()=>G());p.appendChild(b);let f=document.createElement("div");Object.assign(f.style,u.container),p.appendChild(f);let y=document.createElement("div");Object.assign(y.style,u.tabHeader);let h=document.createElement("div");h.textContent="Monitoramento",Object.assign(h.style,u.tabBtn,u.tabActive);let C=document.createElement("div");C.textContent="Planejador",Object.assign(C.style,u.tabBtn),y.appendChild(h),y.appendChild(C),f.appendChild(y);let I=document.createElement("div");Object.assign(I.style,u.toolbar);let O=document.createElement("div");Object.assign(O.style,u.searchInputWrapper);let _=document.createElement("div");_.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(_.style,u.searchIcon);let P=document.createElement("input");P.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(P.style,u.searchInput),P.onfocus=()=>{P.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",P.style.borderColor="rgba(26,115,232,0.3)"},P.onblur=()=>{P.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",P.style.borderColor="transparent"},P.oninput=R=>{i=R.target.value.toLowerCase(),D()},O.appendChild(_),O.appendChild(P),I.appendChild(O);let J=document.createElement("div");Object.assign(J.style,u.chipsRow),ha.forEach(R=>{let ee=document.createElement("div");ee.textContent=R.label,ee.id=`tz-filter-${R.id}`,Object.assign(ee.style,u.chip),R.id===r&&Object.assign(ee.style,u.chipActive),ee.onclick=()=>{$.playClick(),r=R.id,Array.from(J.children).forEach(ae=>{Object.assign(ae.style,u.chip)}),Object.assign(ee.style,u.chipActive),D()},J.appendChild(ee)}),I.appendChild(J),f.appendChild(I);let oe=document.createElement("div");Object.assign(oe.style,u.listContainer);let q=document.createElement("style");q.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",f.appendChild(q);let F=document.createElement("div");Object.assign(F.style,u.plannerWrapper,{display:"none"}),f.appendChild(oe),f.appendChild(F),h.onclick=()=>z("live"),C.onclick=()=>z("plan");function z(R){$.playClick(),R==="live"?(Object.assign(h.style,u.tabActive),Object.assign(C.style,u.tabBtn),C.style.borderBottomColor="transparent",oe.style.display="flex",I.style.display="flex",F.style.display="none",k()):(Object.assign(C.style,u.tabActive),Object.assign(h.style,u.tabBtn),h.style.borderBottomColor="transparent",F.style.display="flex",oe.style.display="none",I.style.display="none",L(),Y())}function V(R){return R>=9&&R<17?{color:l.success,bg:l.successBg,label:"Aberto",icon:"\u{1F7E2}"}:R>=8&&R<9?{color:l.warning,bg:l.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:R>=17&&R<19?{color:l.warning,bg:l.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:l.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function M(R){n.includes(R)?n=n.filter(ee=>ee!==R):n.push(R),localStorage.setItem(Mo,JSON.stringify(n)),D(),$.playClick()}function D(){oe.innerHTML="";let R=new Date,ee=zt.filter(te=>{let j=te.name.toLowerCase().includes(i)||te.label.toLowerCase().includes(i),U=r==="all"||te.region===r;return j&&U});if(ee.sort((te,j)=>{let U=n.includes(te.id),K=n.includes(j.id);return U&&!K?-1:!U&&K?1:te.name.localeCompare(j.name)}),ee.length===0){oe.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}ee.forEach(te=>{let j=n.includes(te.id),U=R.toLocaleTimeString("pt-BR",{timeZone:te.zone,hour:"2-digit",minute:"2-digit"}),K=parseInt(U.split(":")[0]),c=V(K),m=K<6||K>18,v=document.createElement("div");Object.assign(v.style,u.hubCard),j&&Object.assign(v.style,u.hubCardPinned);let x=j?"\u2605":"\u2606",w=j?"#F9AB00":"#DADCE0";v.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${w}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${x}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${te.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${l.text}; letter-spacing:-0.2px;">${te.name}</div>
                        <div style="font-size:12px; color:${l.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${m?"\u{1F319}":"\u2600\uFE0F"} ${te.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${l.text}; font-family:'Google Sans', sans-serif;">${U}</div>
                    <div style="font-size:11px; font-weight:600; color:${c.color}; background:${c.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${c.label}
                    </div>
                </div>
            `,v.onmouseenter=()=>{v.style.transform="translateY(-2px)",v.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},v.onmouseleave=()=>{v.style.transform="translateY(0)",v.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let E=v.querySelector(".cw-pin-btn");E.onmouseenter=()=>{E.style.backgroundColor="#F1F3F4"},E.onmouseleave=()=>{E.style.backgroundColor="transparent"},E.onclick=S=>{S.stopPropagation(),M(te.id)},v.onclick=()=>{a=te.id,z("plan")},oe.appendChild(v)});let ae=document.createElement("div");ae.style.height="20px",ae.style.width="100%",oe.appendChild(ae)}function Y(){F.innerHTML="";let R=document.createElement("div"),ee=document.createElement("label");ee.textContent="Onde est\xE1 o cliente?",ee.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let ae=document.createElement("select");Object.assign(ae.style,Zt),ae.style.padding="14px",[...zt].sort((Q,X)=>Q.name.localeCompare(X.name)).forEach(Q=>{let X=document.createElement("option");X.value=Q.id,X.textContent=`${Q.flag} ${Q.name} (${Q.zone})`,Q.id===a&&(X.selected=!0),ae.appendChild(X)}),ae.onchange=Q=>{a=Q.target.value,N(),$.playClick()},R.appendChild(ee),R.appendChild(ae),F.appendChild(R);let j=document.createElement("div");Object.assign(j.style,u.timeComparisonRow);let U=document.createElement("div");Object.assign(U.style,u.timeCard),U.style.backgroundColor="#F8FAFF",U.style.borderColor="#E8F0FE",U.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let K=document.createElement("div");Object.assign(K.style,u.timeCard),K.style.backgroundColor="#FFF8E1",K.style.borderColor="#FEF7E0",K.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,j.appendChild(U),j.appendChild(K),F.appendChild(j);let c=document.createElement("div");c.id="cw-planner-status",Object.assign(c.style,u.statusBadge),F.appendChild(c);let m=document.createElement("div");Object.assign(m.style,{padding:"0 4px",marginTop:"12px"});let v=document.createElement("div");v.textContent="Arraste para simular o hor\xE1rio:",v.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let x=document.createElement("div");Object.assign(x.style,u.timelineContainer);let w=document.createElement("div");Object.assign(w.style,u.timelineTrack);let E=document.createElement("div");Object.assign(E.style,u.dayZone),w.appendChild(E);let S=document.createElement("input");S.type="range",S.min="0",S.max="1439",S.step="15",S.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let d=document.createElement("div");d.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",d.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",x.appendChild(w),x.appendChild(S),x.appendChild(d),m.appendChild(v),m.appendChild(x),F.appendChild(m);let A=U.querySelector("#cw-time-input-br"),T=K.querySelector("#cw-time-display-client"),H=K.querySelector("#cw-client-label");function N(){let Q=zt.find(ot=>ot.id===a);H.textContent=`${Q.flag} ${Q.label} (${Q.zone})`;let X=s.getHours(),se=s.getMinutes(),pe=`${String(X).padStart(2,"0")}:${String(se).padStart(2,"0")}`;A.value=pe,S.value=X*60+se;let Ee=s.toLocaleTimeString("pt-BR",{timeZone:Q.zone,hour:"2-digit",minute:"2-digit"});T.textContent=Ee;let Ae=parseInt(Ee.split(":")[0]);Ae>=9&&Ae<17?(c.style.background=l.successBg,c.style.color=l.success,c.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):Ae>=8&&Ae<9||Ae>=17&&Ae<19?(c.style.background=l.warningBg,c.style.color=l.warning,c.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(c.style.background=l.errorBg,c.style.color=l.error,c.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}S.oninput=Q=>{let X=parseInt(Q.target.value);s.setHours(Math.floor(X/60)),s.setMinutes(X%60),N()},A.oninput=Q=>{let[X,se]=Q.target.value.split(":");X&&se&&(s.setHours(parseInt(X)),s.setMinutes(parseInt(se)),N())},N()}function k(){D(),o||(o=setInterval(D,6e4))}function L(){o&&(clearInterval(o),o=null)}function G(){e=!e,be(e,p,"cw-btn-timezone"),e?z("live"):L()}return document.body.appendChild(p),G}var xe={tabs:{general:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>',email:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'},search:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',clear:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',copy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',more:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="12" cy="19" r="1.8"></circle></svg>',edit:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',delete:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',add:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',back:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',bold:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',italic:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',code:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',image:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',media:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',empty:'<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>'},No=[{id:"general",label:"Geral",icon:xe.tabs.general},{id:"note",label:"Notas",icon:xe.tabs.note},{id:"email",label:"Emails",icon:xe.tabs.email}];function ya(){if(document.getElementById("cw-lib-styles-v2"))return;let t=document.createElement("style");t.id="cw-lib-styles-v2",t.textContent=`
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
    `,document.head.appendChild(t)}function zo(){let t="v2.0",e=!1,o="general",a="",n=null,i=null;ya();let r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,ye,{right:"auto",left:"50%",width:"620px",height:"680px",maxHeight:"90vh",transform:"translateX(-50%) scale(0.05)"});let l=ge(r,"Minha Biblioteca",t,"Gerencie seus snippets, textos e templates.",{popup:r},()=>K());r.appendChild(l);let u=document.createElement("div");u.className="cw-lib-container",r.appendChild(u);let p=document.createElement("div");p.className="cw-lib-toolbar";let g=document.createElement("div");g.className="cw-lib-search-wrap";let b=document.createElement("div");b.className="cw-lib-search-icon",b.innerHTML=xe.search;let f=document.createElement("input");f.className="cw-lib-search no-drag",f.placeholder="Buscar por t\xEDtulo ou conte\xFAdo...",f.type="text";let y=document.createElement("div");y.className="cw-lib-search-clear cw-tactile",y.innerHTML=xe.clear,g.append(b,f,y);let h=document.createElement("div");h.className="cw-lib-tabs",No.forEach(c=>{let m=document.createElement("div");m.className="cw-lib-tab"+(c.id===o?" active":""),m.id=`lib-tab-${c.id}`,m.innerHTML=`${c.icon}<span>${c.label}</span>`,m.onmouseenter=()=>$.playHover(),m.onclick=()=>D(c.id),h.appendChild(m)}),p.append(g,h),u.appendChild(p);let C=document.createElement("div");C.className="cw-lib-grid",u.appendChild(C);let I=document.createElement("div");I.className="cw-lib-fab cw-tactile",I.title="Novo item",I.innerHTML=xe.add,I.onclick=()=>ee(),u.appendChild(I);let O=document.createElement("div");O.className="cw-lib-sheet";let _=document.createElement("div");_.className="cw-lib-sheet-handle";let P=document.createElement("div");P.className="cw-lib-sheet-head";let J=document.createElement("div");J.className="cw-lib-sheet-back no-drag",J.innerHTML=xe.back,J.title="Cancelar",J.onclick=ae;let oe=document.createElement("span");oe.className="cw-lib-sheet-title",oe.textContent="Novo Item",P.append(J,oe);let q=document.createElement("div");q.className="cw-lib-sheet-body";let F=document.createElement("div");F.className="cw-lib-sheet-foot";let z=document.createElement("button");z.className="cw-lib-save-btn no-drag",z.textContent="Salvar",z.onclick=te,F.appendChild(z);let V=document.createElement("div");V.className="cw-lib-loading",V.innerHTML='<div class="cw-lib-spinner"></div><div class="cw-lib-loading-text">Salvando...</div>',O.append(_,P,q,F,V),u.appendChild(O);let M=document.createElement("div");Object.assign(M.style,qe),M.className="no-drag",r.appendChild(M),Oe(r,M),document.body.appendChild(r),document.addEventListener("mousedown",c=>{i&&!i.contains(c.target)&&Y()});function D(c){$.playClick(),o=c,No.forEach(m=>{document.getElementById(`lib-tab-${m.id}`).classList.toggle("active",m.id===c)}),L()}function Y(){if(i){let c=i.querySelector(".cw-lib-menu");c&&c.classList.remove("open"),i=null}}function k(c,m){return m?`${c.title} ${c.content}`.toLowerCase().includes(m):!0}function L(){Y(),C.innerHTML="";let c=a.trim().toLowerCase(),m=Se.getSnippets(o).filter(v=>k(v,c));if(m.length===0){let v=document.createElement("div");v.className="cw-lib-empty";let x=c.length>0;v.innerHTML=`
                <div style="opacity:0.5;">${xe.empty}</div>
                <div class="cw-lib-empty-title">${x?"Nada encontrado":"Nada aqui ainda"}</div>
                <div class="cw-lib-empty-sub">${x?`Nenhum item bate com "${a.trim()}" nesta aba.`:"Clique no + para come\xE7ar sua cole\xE7\xE3o."}</div>
            `,C.appendChild(v);return}m.forEach(v=>C.appendChild(G(v)))}function G(c){let m=document.createElement("div");m.className="cw-lib-card"+(c.isCode?" is-code":"");let v=c.content,x="";if(c.isRich){let d=document.createElement("div");d.innerHTML=c.content;let A=!!d.querySelector("img");v=d.innerText.substring(0,200),A&&(x=`<span class="cw-lib-media-tag">${xe.media} M\xEDdia</span>`)}let w=[c.isCode?'<span class="cw-lib-badge code">CODE</span>':"",o==="email"?'<span class="cw-lib-badge template">TEMPLATE</span>':""].join("");m.innerHTML=`
            <div class="cw-lib-card-head">
                <div class="cw-lib-card-title">${U(c.title)}</div>
                <div class="cw-lib-card-badges">${w}</div>
            </div>
            ${x}
            <div class="cw-lib-card-preview${c.isCode?" code":""}">${U(v)}</div>
            <div class="cw-lib-card-foot">
                <div class="cw-lib-icon-btn cw-act-copy cw-tactile" title="Copiar">${xe.copy}</div>
                <div class="cw-lib-icon-btn cw-act-more cw-tactile" title="Mais a\xE7\xF5es">${xe.more}</div>
                <div class="cw-lib-menu">
                    <div class="cw-lib-menu-item cw-act-edit">${xe.edit} Editar</div>
                    <div class="cw-lib-menu-item danger cw-act-del">${xe.delete} Excluir</div>
                </div>
            </div>
        `,m.querySelector(".cw-act-copy").onclick=d=>{d.stopPropagation(),$.playClick(),R(c)};let E=m.querySelector(".cw-act-more"),S=m.querySelector(".cw-lib-menu");return E.onclick=d=>{d.stopPropagation(),$.playClick();let A=S.classList.contains("open");Y(),A||(S.classList.add("open"),i=m)},m.querySelector(".cw-act-edit").onclick=d=>{d.stopPropagation(),$.playClick(),Y(),ee(c)},m.querySelector(".cw-act-del").onclick=async d=>{d.stopPropagation(),$.playClick(),Y(),await ve(`Excluir "${c.title}"?`)&&(Se.delete(c.id),L(),Z("Item exclu\xEDdo."))},m}function R(c){if(c.isRich){let m=new Blob([c.content],{type:"text/html"}),v=document.createElement("div");v.innerHTML=c.content;let x=new Blob([v.innerText],{type:"text/plain"});navigator.clipboard.write([new ClipboardItem({"text/html":m,"text/plain":x})])}else navigator.clipboard.writeText(c.content);Z("Copiado!")}function ee(c=null){n=c?c.id:null,q.innerHTML="",q.appendChild(j("title","T\xEDtulo / Nome",c?c.title:"")),o==="email"&&q.appendChild(j("subject","Assunto do Email",c?c.subject:""));let m="Conte\xFAdo";o==="email"&&(m="Corpo do Email (HTML)"),o==="note"&&(m="Texto da Nota"),q.appendChild(j("content",m,c?c.content:"",{isRich:!0,isCode:c?c.isCode:!1})),oe.textContent=c?"Editar Item":"Novo Item",z.textContent=c?"Salvar Altera\xE7\xF5es":"Salvar",O.classList.add("open"),setTimeout(()=>{let v=q.querySelector("input");v&&v.focus()},350)}function ae(){$.playSwoosh(),O.classList.remove("open"),setTimeout(()=>{n=null},300)}async function te(){V.classList.add("active"),z.disabled=!0;try{let c=q.querySelector("#cw-lib-inp-title"),m=q.querySelector("#cw-lib-inp-content"),v=c.value.trim(),x=m.contentEditable==="true"?m.innerHTML:m.value.trim(),w=m.getAttribute("data-is-code")==="true";if(!v||!x||x==="<br>"){Z("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let E={id:n,type:o,title:v,content:x,isCode:w,isRich:m.contentEditable==="true"};if(o==="email"){let d=q.querySelector("#cw-lib-inp-subject").value.trim();if(!d){Z("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}E.subject=d}let S=await Se.save(E);if(S===!1){Z("N\xE3o foi poss\xEDvel salvar: usu\xE1rio n\xE3o identificado. Recarregue a p\xE1gina e tente de novo.",{error:!0});return}L(),ae(),S.synced===!1?Z("Salvo localmente \u2014 sem conex\xE3o com a nuvem no momento.",{error:!0}):(Z("Salvo e sincronizado!"),$.playSuccess())}catch(c){console.error("Erro ao salvar item da biblioteca:",c),Z("Erro ao salvar item.",{error:!0})}finally{V.classList.remove("active"),z.disabled=!1}}function j(c,m,v,x={}){let w=document.createElement("div");w.className="cw-lib-field";let E=document.createElement("label");E.className="cw-lib-label",E.textContent=m,w.appendChild(E);let S;if(x.isRich){let d=document.createElement("div");d.className="cw-lib-toolbar-mini",d.innerHTML=`
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-bold" title="Negrito">${xe.bold}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-italic" title="It\xE1lico">${xe.italic}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-code" title="Formato c\xF3digo">${xe.code}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-img" title="Inserir imagem">${xe.image}</button>
            `,S=document.createElement("div"),S.className="cw-lib-input cw-lib-editable",S.contentEditable="true",S.innerHTML=v||"",x.isCode&&(S.style.fontFamily="'Roboto Mono', monospace",S.style.background="#F8F9FA",S.setAttribute("data-is-code","true"),d.querySelector(".cw-tb-code").classList.add("active")),d.querySelectorAll(".cw-lib-tb-btn").forEach(A=>{A.onmouseenter=()=>$.playHover(),A.onmousedown=()=>$.playClick()}),d.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),S.focus()},d.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),S.focus()},d.querySelector(".cw-tb-code").onclick=A=>{let H=!(S.getAttribute("data-is-code")==="true");S.setAttribute("data-is-code",String(H)),S.style.fontFamily=H?"'Roboto Mono', monospace":"inherit",S.style.background=H?"#F8F9FA":"#fff",A.currentTarget.classList.toggle("active",H),S.focus()},d.querySelector(".cw-tb-img").onclick=async()=>{let A=await no("Cole a URL da imagem:");A&&(document.execCommand("insertImage",!1,A),S.querySelectorAll("img").forEach(T=>{T.style.maxWidth="100%",T.style.borderRadius="8px"}))},S.onpaste=A=>{let T=(A.clipboardData||A.originalEvent.clipboardData).items;for(let H of T)if(H.kind==="file"&&H.type.startsWith("image/")){A.preventDefault();let N=new FileReader;N.onload=Q=>{document.execCommand("insertHTML",!1,`<img src="${Q.target.result}" style="max-width:100%;border-radius:8px;margin:8px 0;display:block;">`)},N.readAsDataURL(H.getAsFile())}},w.appendChild(d)}else S=document.createElement("input"),S.className="cw-lib-input",S.type="text",S.value=v||"";return S.id=`cw-lib-inp-${c}`,w.appendChild(S),w}function U(c){let m=document.createElement("div");return m.textContent=c||"",m.innerHTML}f.addEventListener("input",c=>{a=c.target.value,y.classList.toggle("visible",a.length>0),L()}),y.onclick=()=>{f.value="",a="",y.classList.remove("visible"),L(),f.focus()};function K(){e=!e,be(e,r,"cw-btn-library"),e?(document.body.style.overflow="hidden",L()):(document.body.style.overflow="",Y())}return K}function Ro(){let t="v1.0",e=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},a="cw-configs-styles";if(!document.getElementById(a)){let y=document.createElement("style");y.id=a,y.innerHTML=`
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
        `,document.head.appendChild(y)}let n=document.createElement("div");n.id="configs-popup",n.classList.add("cw-module-window"),Object.assign(n.style,ye,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r=ge(n,"Configura\xE7\xF5es",t,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:n},()=>f());n.appendChild(r);let s=document.createElement("div");s.className="cw-configs-container",n.appendChild(s);let l=document.createElement("div");l.className="cw-profile-card",l.id="cw-user-profile-section",l.style.display="none",s.appendChild(l);async function u(){l.style.display="flex",l.innerHTML=`
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
        `,setTimeout(async()=>{try{let y=fe(),h=y?y.split("@")[0]:"user",C=await at(h);if(!C){l.innerHTML=`
                <div class="cw-profile-avatar" style="background: #e8eaed; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5f6368; font-weight: bold;">
                    ${h.charAt(0).toUpperCase()}
                </div>
                <div class="cw-profile-info">
                    <h2 class="cw-profile-ldap">@${h}</h2>
                    <div class="cw-profile-badges">
                        <span class="cw-profile-badge">Consultor</span>
                    </div>
                    <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                        Perfil n\xE3o localizado na base de dados.
                    </div>
                </div>
            `;return}l.innerHTML=`
        <img src="https://moma-teams-photos.corp.google.com/photos/${h}?sz=600&type=PLUS"
             class="cw-profile-avatar" alt="User Photo"
             onerror="this.style.display='none'">
        <div class="cw-profile-info">
            <h2 class="cw-profile-ldap">@${C.ldap}</h2>
            <div class="cw-profile-badges">
                <span class="cw-profile-badge">${C.roleCategory||"N/A"}</span>
                <span class="cw-profile-badge">${C.segment||"N/A"}</span>
                <span class="cw-profile-badge">${C.defaultLanguage||"N/A"}</span>
                ${C.isOverhead?'<span class="cw-profile-badge overhead">Gest\xE3o / Overhead</span>':""}
            </div>
            <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                ${C.role||""}
            </div>
        </div>
    `}catch(y){console.warn("Erro ao renderizar perfil:",y),l.style.display="none"}},3e3)}u();let p=document.createElement("div");p.className="cw-configs-section",p.innerHTML=`
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
    `;let g=p.querySelector("#cw-config-sound-toggle");g.onchange=y=>{$.setMuted(!y.target.checked),y.target.checked&&$.playClick()},s.appendChild(p);let b=document.createElement("div");b.className="cw-configs-section",b.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank">Reportar Bug/Sugest\xF5es</a>
            </div>
        </div>
    `,s.appendChild(b);function f(){e=!e,be(e,n,"cw-btn-configs"),e&&$.playClick()}return document.body.appendChild(n),f}var Re={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"};var je="cubic-bezier(0.4, 0, 0.2, 1)",Gs=`all 0.3s ${je}`,Bo=()=>{if(document.getElementById("bau-form-global-styles"))return;let t=document.createElement("style");t.id="bau-form-global-styles",t.textContent=`
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
  `,document.head.appendChild(t)};var Ue={steps:[{id:0,title:"Selecione o tipo de atendimento",isBranching:!0},{id:1,title:"Contexto e Valida\xE7\xE3o",fields:[{id:"advName",name:"advName",label:"Nome do Anunciante",type:"text",placeholder:"Nome do Anunciante",required:!0,isSmart:!0},{id:"cid",name:"cid",label:"CID",type:"text",placeholder:"000-000-0000",required:!0,isSmart:!0,tooltip:"Use o formato 000-000-0000 ou 10 d\xEDgitos",validation:{regex:"^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$",error:"Formato de CID incorreto"}},{id:"amName",name:"amName",label:"Account Manager (AM)",type:"text",placeholder:"Nome do AM",required:!0,isSmart:!0},{id:"website",name:"website",label:"Website",type:"text",placeholder:"https://www.exemplo.com",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!1,isSmart:!0,button:{id:"bau-top-se-search",icon:"wand",title:"Buscar ID automaticamente"}}]},{id:2,title:"Tasks",fields:[{id:"reason",name:"reason",label:"O que deve ser feito em BAU",type:"textarea",placeholder:"Descreva as a\xE7\xF5es esperadas...",required:!0,style:{minHeight:"80px"}},{id:"taskType",name:"taskType",label:"Tasks para BAU (Selecione 1 ou mais)",type:"checkbox-grid",required:!0,tooltip:"Selecione os tipos de implementa\xE7\xE3o t\xE9cnica",options:["Ads Conversion Tracking","Ads Dynamic Remarketing","Ads Enhanced Conversions","Ads Website Call Conversion","Ads Remarketing","Analytics Cross Domain Tracking","Analytics E-Commerce Tracking","Analytics Enhanced E-Commerce Tracking","Analytics Event Tracking","Analytics Health Check","Analytics Remarketing","Analytics Setup","Fix GA4 implementation","Consent Mode","Fix Sitewide Tagging (OGT & CT)","Google Tag Manager Installation","Customer Match"]}]},{id:3,title:"Justificativa e Agendamento",fields:[{id:"nonImplementationReason",name:"nonImplementationReason",label:"Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",type:"select",required:!0,options:[{value:"",text:"Selecione um motivo..."},{value:"Tempo da consultoria esgotado",text:"Tempo da consultoria esgotado"},{value:"Solicita\xE7\xE3o de reagendamento pelo anunciante",text:"Solicita\xE7\xE3o de reagendamento pelo anunciante"},{value:"Falta de acessos ou backup do site",text:"Falta de acessos ou backup do site"},{value:"Anunciante indispon\xEDvel ou n\xE3o preparado",text:"Anunciante indispon\xEDvel ou n\xE3o preparado"},{value:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)",text:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"},{value:"Solicita\xE7\xE3o de tarefas (tasks) adicionais",text:"Solicita\xE7\xE3o de tarefas (tasks) adicionais"},{value:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)",text:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"},{value:"Retorno de contato ap\xF3s prazo de 14 dias expirado",text:"Retorno de contato ap\xF3s prazo de 14 dias expirado"}]},{id:"description",name:"description",label:"Justificativa / Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva detalhadamente o que precisa ser feito...",required:!0},{id:"availability",name:"availability",label:"Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",type:"datetime-group",required:!0,fields:[{name:"availability_1",label:"Op\xE7\xE3o 1 (Prioridade)",required:!0},{name:"availability_2",label:"Op\xE7\xE3o 2 (Opcional)",required:!1},{name:"availability_3",label:"Op\xE7\xE3o 3 (Opcional)",required:!1}]}]},{id:4,title:"Confirma\xE7\xE3o",isConfirmation:!0},{id:5,title:"Solicitar Descarte",fields:[{id:"caseId",name:"caseId",label:"Case ID",type:"text",placeholder:"Case ID",required:!0,isSmart:!0},{id:"language",name:"language",label:"Idioma",type:"text",placeholder:"Idioma",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text",placeholder:"Speakeasy ID",required:!0,isSmart:!0},{id:"description",name:"description",label:"Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva o motivo do descarte...",required:!0},{id:"discardReason",name:"reason",label:"Motivo do Descarte",type:"select",required:!0,groups:[{label:"Live Appointments",options:[{value:"Caso Filho gerado no atendimento",text:"Caso Filho gerado no atendimento"},{value:"3\xAA Tentativa de contato sem sucesso",text:"3\xAA Tentativa de contato sem sucesso"}]},{label:"Live Meet",options:[{value:"Apenas o AM presente",text:"Apenas o AM presente"},{value:"Estouro de tempo para conclus\xE3o",text:"Estouro de tempo para conclus\xE3o"},{value:"Gera\xE7\xE3o de caso BAU (Reagendamento)",text:"Gera\xE7\xE3o de caso BAU (Reagendamento)"}]}]}]}]};var me={add:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',wand:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',check:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path class="bau-check-path" d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',expand:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'};function $o(t){switch(t){case"PENDING_TL_CREATION":return{text:"Aguardando TL",class:"status-yellow",aura:"status-yellow-aura"};case"CREATED":return{text:"Aprovado / Criado",class:"status-green",aura:"status-green-aura"};case"DISCARDED":return{text:"Descartado pelo TL",class:"status-red",aura:"status-red-aura"};case"CANCELED_BY_AGENT":return{text:"Cancelado",class:"status-gray",aura:""};default:return{text:t||"Pendente",class:"status-gray",aura:""}}}function Po(t){let e=document.createElement("div");if(e.className="bau-dynamic-input",e.id=`wrapper-${t.id}`,t.label){let a=document.createElement("label");a.className="bau-label",a.textContent=t.label,t.tooltip&&a.setAttribute("data-tooltip",t.tooltip),e.appendChild(a)}let o;switch(t.type){case"textarea":o=document.createElement("textarea"),o.style.minHeight="80px",e.appendChild(o);break;case"select":o=document.createElement("select"),t.groups?t.groups.forEach(r=>{let s=document.createElement("optgroup");s.label=r.label,r.options.forEach(l=>{let u=document.createElement("option");u.value=l.value,u.textContent=l.text,s.appendChild(u)}),o.appendChild(s)}):t.options&&t.options.forEach(r=>{let s=document.createElement("option");s.value=r.value,s.textContent=r.text,o.appendChild(s)}),e.appendChild(o);break;case"checkbox-grid":return o=document.createElement("div"),o.className="bau-tasks-grid",t.options.forEach(r=>{let s=document.createElement("label");s.className="bau-task-item",s.innerHTML=`<input type="checkbox" name="${t.name}" value="${r}"><span>${r}</span>`,s.addEventListener("click",l=>{l.preventDefault();let u=s.querySelector("input");u.checked=!u.checked,s.classList.toggle("active",u.checked),$.playClick()}),o.appendChild(s)}),e.appendChild(o),e;case"datetime-group":o=document.createElement("div"),o.className="bau-availability-container",t.fields.forEach(r=>{let s=document.createElement("div");s.className="bau-availability-field",s.innerHTML=`
                    <span class="bau-field-hint">${r.label}</span>
                    <input type="datetime-local" name="${r.name}" class="bau-input" ${r.required?"required":""}>
                `,o.appendChild(s)});let a=document.createElement("div");return a.className="bau-availability-disclaimer",a.innerHTML=`
                <div class="bau-disclaimer-text">
                    <strong>Aten\xE7\xE3o:</strong> Para clientes fora do fuso hor\xE1rio do Brasil, o hor\xE1rio inserido deve corresponder sempre ao hor\xE1rio local do cliente, e n\xE3o ao do agente.
                </div>
                <button type="button" class="bau-timezone-link" id="bau-open-timezone">
                    ${me.refresh}
                    Consultar Time Zone
                </button>
            `,a.querySelector("#bau-open-timezone").onclick=()=>{let r=document.getElementById("cw-btn-timezone");r?(r.click(),$.playClick()):Z("M\xF3dulo Time Zone n\xE3o encontrado.",{error:!0})},e.appendChild(o),e.appendChild(a),e;case"text-with-button":let n=document.createElement("div");n.className="bau-input-group",o=document.createElement("input"),o.type="text";let i=document.createElement("button");i.type="button",i.id=t.button.id,i.className="bau-mini-btn-input",i.title=t.button.title,i.innerHTML=me[t.button.icon]||"",n.appendChild(o),n.appendChild(i),e.appendChild(n);break;default:o=document.createElement("input"),o.type="text",e.appendChild(o)}return o&&t.type!=="checkbox-grid"&&t.type!=="datetime-group"&&(o.id=`bau-form-${t.id}`,o.name=t.name,o.className=t.type==="select"?"bau-select":t.type==="textarea"?"bau-textarea":"bau-input",t.placeholder&&(o.placeholder=t.placeholder),t.required&&(o.required=!0)),e}function Ho(){Bo();let t=!1,e="dashboard",o=null,a=0,n="BAU",i=!1,r=null,s=Ue.steps.length,l=document.createElement("div");l.id="bau-form-popup",l.className="bau-popup cw-module-window",l.style.display="none";let u=ge(l,"BAU Central","v2.2.0","Dashboard de Casos BAU",{},()=>K());l.appendChild(u);let p=document.createElement("div");p.className="bau-view-container",l.appendChild(p);let g=document.createElement("div");g.id="bau-view-details",g.className="bau-details-view",p.appendChild(g);let b=document.createElement("div");b.id="bau-view-dashboard",b.className="bau-view active",b.innerHTML=`
        <div class="bau-dashboard-content">
            <div class="bau-dashboard-metrics" id="bau-dashboard-metrics"></div>
            <ul class="bau-case-list" id="bau-case-list-container"></ul>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            ${me.add}
            Novo Caso BAU
        </button>
    `,p.appendChild(b);let f=document.createElement("div");f.id="bau-view-form",f.className="bau-view";let y=document.createElement("div");y.className="bau-view-header",y.innerHTML=`
      <button class="bau-back-btn" id="bau-form-back-btn">
        ${me.back}
        Voltar ao Dashboard
      </button>
    `,f.appendChild(y);let h=document.createElement("div");h.className="bau-content",f.appendChild(h);let C=document.createElement("div");C.className="bau-form-loading-overlay",C.innerHTML=`
        <div class="bau-spinner"></div>
        <div class="bau-loading-text">Configurando Edi\xE7\xE3o...</div>
    `,h.appendChild(C);let I=c=>{C.classList.toggle("active",c)},O=document.createElement("div");O.className="bau-progress-indicator",h.appendChild(O);let _=document.createElement("form");_.id="bau-escalation-form",_.noValidate=!0,h.appendChild(_),Ue.steps.forEach(c=>{let m=document.createElement("div");if(m.className="bau-step"+(c.id===a?" active":""),m.id=`bau-step-${c.id}`,c.isBranching)m.innerHTML=`
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
            `,m.querySelector("#bau-opt-full").onclick=()=>{n="BAU",a=1,_.querySelectorAll(".bau-highlight-panel").forEach(v=>v.classList.remove("discard-theme")),L(),$.playClick()},m.querySelector("#bau-opt-discard").onclick=()=>{n="DISCARD",a=5,_.querySelectorAll(".bau-highlight-panel").forEach(v=>v.classList.add("discard-theme")),L(),$.playClick()};else if(c.isConfirmation)m.innerHTML=`
                <div class="bau-card">
                    <h3 class="bau-step-title">Confirme os dados antes de enviar</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;else{let v=document.createElement("div");if(v.className="bau-card",c.id===1||c.id===5){v.innerHTML=`
                    <div class="bau-vital-highlights bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div class="bau-all-data"></div>
                `;let x=v.querySelector(".bau-dynamic-inputs-container");c.fields.forEach(E=>{x.appendChild(Po(E))});let w=v.querySelector("#wrapper-cid");if(w){let E=document.createElement("div");E.id="bau-cid-error",E.className="bau-cid-error-hint",E.style.display="none",E.textContent="Formato de CID incorreto",w.appendChild(E)}}else c.fields.forEach(x=>{v.appendChild(Po(x))});m.appendChild(v)}_.appendChild(m)});let P=document.createElement("div");P.className="bau-footer";let J=document.createElement("button");J.type="button",J.id="bau-step-back-btn",J.className="bau-btn-secondary",J.textContent="Voltar";let oe=document.createElement("button");oe.type="button",oe.id="bau-step-next-btn",oe.className="bau-btn-primary",oe.textContent="Pr\xF3ximo";let q=document.createElement("button");q.type="submit",q.className="bau-btn-submit",q.innerHTML=`${me.send} Enviar para o TL`,q.style.display="none",P.appendChild(J),P.appendChild(oe),P.appendChild(q),_.appendChild(P),p.appendChild(f);let F=document.createElement("div");F.id="bau-view-success",F.className="bau-view bau-success-view",F.innerHTML=`
        <div class="bau-success-content">
            <div class="bau-success-icon" style="color: ${Re.green};">${me.check}</div>
            <h2 class="bau-success-title">Caso enviado com sucesso!</h2>
            <p class="bau-success-subtitle">Sua solicita\xE7\xE3o foi recebida e ser\xE1 processada em breve.</p>
            <button class="bau-btn-primary" id="bau-success-back-btn">Voltar ao Dashboard</button>
        </div>
    `,p.appendChild(F),document.body.appendChild(l);function z(c){e=c,l.querySelectorAll(".bau-view").forEach(E=>E.classList.remove("active"));let m=l.querySelector(`#bau-view-${c}`);m&&m.classList.add("active");let v=u.querySelector(".cw-module-header-title")||u.querySelector("h2"),x=u.querySelector(".cw-module-header-subtitle")||u.querySelector("p");v&&(c==="form"?v.textContent=i?`Editando Caso #${r}`:"Novo Caso BAU":v.textContent="BAU Central"),x&&(x.textContent=c==="form"?"Preencha os detalhes abaixo":"Dashboard de Casos BAU");let w=_.querySelector(".bau-btn-submit");w&&(w.innerHTML=i?`${me.send} Salvar Altera\xE7\xF5es`:`${me.send} Enviar para o TL`)}function V(){let c=l.querySelector("#bau-case-list-container"),m=l.querySelector("#bau-dashboard-metrics");m&&(m.innerHTML=`
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `),c&&(c.innerHTML=Array(5).fill(0).map(()=>`
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join(""))}async function M(){let c=l.querySelector("#bau-case-list-container"),m=l.querySelector("#bau-dashboard-metrics");if(!(!c||!m)){V();try{let v=await Ut();if(!Array.isArray(v))throw new Error("API response is not a valid array");k(v)}catch(v){console.error("Critical Error loading BAU cases:",v),m&&(m.innerHTML=""),c.innerHTML=`
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
            `,l.querySelector("#bau-retry-btn")?.addEventListener("click",()=>M()),Z("Erro ao carregar Dashboard. Verifique sua conex\xE3o.",{error:!0})}}}function D(c){if(!c)return;let m=$o(c.status),v=(w,E)=>{navigator.clipboard.writeText(w).then(()=>{Z("Copiado para a \xE1rea de transfer\xEAncia!"),$.playClick();let S=E.style.color;E.style.color="#1E8E3E",setTimeout(()=>{E.style.color=S},800)})};g.innerHTML=`
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
                            <span class="bau-details-value">${c.advName||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${me.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Status</span>
                            <span class="bau-case-status-badge ${m.class}">${m.text}</span>
                        </div>
                    </div>
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">CID</span>
                            <span class="bau-details-value">${c.cid||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${me.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Case ID</span>
                            <span class="bau-details-value">${c.caseId||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${me.wand}</button>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Motivo BAU</span>
                            <span class="bau-details-value">${c.reason||"N\xE3o informado"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Tasks solicitadas</span>
                            <span class="bau-details-value">${c.taskType||"Nenhuma"}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Justificativa</span>
                            <span class="bau-details-value">${c.nonImplementationReason||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Descri\xE7\xE3o detalhada</span>
                            <span class="bau-details-value">${c.description||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Disponibilidade</span>
                            <span class="bau-details-value">${it(c.availability)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;let x=g.querySelector(".bau-details-close-btn");x.onclick=()=>{g.classList.remove("active"),$.playSwoosh(),setTimeout(()=>{g.style.display="none"},600)},g.querySelectorAll(".bau-copy-btn").forEach(w=>{w.onclick=E=>{let S=E.target.closest(".bau-details-row").querySelector(".bau-details-value").textContent;v(S,w)}}),g.style.display="flex",requestAnimationFrame(()=>{g.classList.add("active"),$.playClick()})}function Y(c){if(!c)return"";let m=$o(c?.status),v=it(c?.date),x="",w="";if(c?.status==="PENDING_TL_CREATION"&&c?.availability_1){let T=new Date(c.availability_1),H=new Date;(T<=H||T-H<36e5*2)&&(x='<span class="bau-sla-badge">Urgente</span>',w="bau-pulse-attention")}let E=c?.reason&&c.reason.trim()?c.reason:"Nenhum contexto adicional fornecido pelo agente.",d=/^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(c?.cid||""),A=!c?.caseId||c.caseId==="N/A"||!d;return A&&c?.status==="PENDING_TL_CREATION"&&(w="bau-pulse-attention"),`
            <li class="bau-case-card ${m.aura} ${w}" data-case-id="${c?.id||""}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${me.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${c?.advName||"Nome indefinido"}</h3>
                            ${x}
                            <span class="bau-case-date">${v}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="Customer ID do Anunciante">Case: ${c?.caseId||"N/A"}</span> \u2022
                            <span data-tooltip="CID do Anunciante (Formato: 000-000-0000)" class="${d?"":"bau-error-text"}">CID: ${c?.cid||"N/A"}</span> \u2022
                            <span data-tooltip="O que deve ser feito em BAU">Motivo: ${E}</span>
                        </p>
                        ${A?`<div class="bau-data-error-hint">${!c?.caseId||c?.caseId==="N/A"?"Dados Incompletos":"CID Inv\xE1lido"} - Contate o Suporte</div>`:""}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                    <span class="bau-case-status-badge ${m.class}">${m.text}</span>
                    ${c?.status&&c.status.includes("PENDING")?`
                        <button class="bau-case-edit-btn" data-id="${c.id}" title="Editar Solicita\xE7\xE3o">
                            ${me.edit}
                            Editar
                        </button>
                    `:""}
                </div>
            </li>
        `}function k(c){let m=l.querySelector("#bau-case-list-container"),v=l.querySelector("#bau-dashboard-metrics");if(!m||!v)return;let x=Array.isArray(c)?c.filter(Boolean):[];if(x.length===0){v.innerHTML=`
                <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard">
                    ${me.refresh}
                    Atualizar
                </button>
            `,m.innerHTML=`
                <div class="bau-empty-state">
                    ${me.empty}
                    <h3 class="bau-empty-title">Nenhum caso recente</h3>
                    <p class="bau-empty-subtitle">Seus casos BAU aparecer\xE3o aqui</p>
                </div>
            `,l.querySelector("#bau-refresh-dashboard")?.addEventListener("click",()=>M());return}let w=x.filter(T=>T.status==="PENDING_TL_CREATION").length,E=x.filter(T=>T.status==="CREATED").length;v.innerHTML=`
            <div class="bau-metric-card">
                <span class="bau-metric-value">${w}</span>
                <span class="bau-metric-label">Aguardando TL</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${E}</span>
                <span class="bau-metric-label">Criados / Aprovados</span>
            </div>
            <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard" title="Atualizar Dashboard">
                ${me.refresh}
            </button>
        `;let S=v.querySelector("#bau-refresh-dashboard");S?.addEventListener("click",async()=>{S.classList.contains("spinning")||(S.classList.add("spinning"),$.playClick(),await M(),setTimeout(()=>S.classList.remove("spinning"),1e3))}),m.innerHTML="";let d=x.slice(0,5),A=x.slice(5);if(d.forEach(T=>{let H=Y(T),N=document.createElement("div");N.innerHTML=H;let Q=N.firstElementChild;Q.addEventListener("click",se=>{se.target.closest(".bau-case-edit-btn")||D(T)});let X=Q.querySelector(".bau-case-edit-btn");X&&(X.onclick=se=>{se.stopPropagation(),j(T)}),m.appendChild(Q)}),A.length>0){let T=document.createElement("li");T.className="bau-accordion-container";let H=document.createElement("button");H.className="bau-accordion-toggle",H.innerHTML=`${me.expand} <span>Mostrar ${A.length} casos mais antigos</span>`;let N=document.createElement("ul");N.className="bau-case-list bau-accordion-content",N.style.display="none",A.forEach(Q=>{let X=Y(Q),se=document.createElement("div");se.innerHTML=X;let pe=se.firstElementChild;pe.addEventListener("click",Ae=>{Ae.target.closest(".bau-case-edit-btn")||D(Q)});let Ee=pe.querySelector(".bau-case-edit-btn");Ee&&(Ee.onclick=Ae=>{Ae.stopPropagation(),j(Q)}),N.appendChild(pe)}),H.addEventListener("click",()=>{let Q=N.style.display==="none";N.style.display=Q?"block":"none",H.classList.toggle("expanded",Q),H.querySelector("span").textContent=Q?"Esconder casos mais antigos":`Mostrar ${A.length} casos mais antigos`,$.playClick()}),T.appendChild(H),T.appendChild(N),m.appendChild(T)}}function L(){let c=n==="BAU"?[1,2,3,4]:[5,4];_.querySelectorAll(".bau-step").forEach(x=>{let w=parseInt(x.id.replace("bau-step-","")),E=w===a,S=c.includes(w)||w===0;x.classList.toggle("active",E),x.style.display=E?"block":"none",x.querySelectorAll("input, select, textarea").forEach(d=>{d.disabled=!S})});let m=a===0;if(O.style.display=m?"none":"flex",!m){O.innerHTML="";let x=n==="BAU"?[1,2,3,4]:[5,4];x.forEach((w,E)=>{let S=document.createElement("div"),d=w===a,A=x.indexOf(a),T=E<A;S.className=`bau-progress-step ${d?"active":T?"completed":""}`,S.textContent=E+1,O.appendChild(S)})}let v=a===4;J.style.display=a>0?"inline-block":"none",oe.style.display=!m&&!v?"inline-block":"none",q.style.display=v?"flex":"none",v&&te()}function G(c){let m=Ue.steps.find(v=>v.id===c);if(!m||!m.fields||m.isConfirmation)return!0;for(let v of m.fields){let x=_.querySelector(`#bau-step-${c} #wrapper-${v.id}`);if(!(x&&x.style.display==="none")&&v.validation){let w=_.querySelector(`#bau-step-${c} [name="${v.name}"]`);if(w&&w.offsetParent!==null&&w.value.trim())if(new RegExp(v.validation.regex).test(w.value.trim())){w.classList.remove("invalid-cid");let S=_.querySelector("#bau-cid-error");S&&(S.style.display="none")}else{console.warn(`Validation failed for field "${v.name}" in step ${c}: Regex mismatch.`),Z(`Erro: ${v.validation.error}`,{error:!0}),w.classList.add("invalid-cid");let S=_.querySelector("#bau-cid-error");return S&&(S.style.display="flex"),!1}}}return!0}function R(c){if(!_.querySelector(`#bau-step-${c}`))return!1;let v=Ue.steps.find(w=>w.id===c);if(!v||!v.fields||v.isConfirmation)return!0;let x=!0;for(let w of v.fields){let E=_.querySelector(`#bau-step-${c} #wrapper-${w.id}`);if(!(E&&E.style.display==="none")&&w.required){let S=!0,d="";if(w.type==="checkbox-grid")_.querySelector(`#bau-step-${c} input[name="${w.name}"]:checked`)||(d="No option selected in checkbox-grid",Z(`Erro: Selecione pelo menos uma op\xE7\xE3o para "${w.label}".`,{error:!0}),S=!1);else if(w.type==="datetime-group"){let A=_.querySelector(`#bau-step-${c} input[name="${w.fields[0].name}"]`);if(!A||A.offsetParent===null)continue;A.value.trim()||(d="Datetime group first field is empty",Z(`Erro: O campo "${w.fields[0].label}" \xE9 obrigat\xF3rio.`,{error:!0}),S=!1)}else{let A=_.querySelector(`#bau-step-${c} [name="${w.name}"]`);if(!A||A.offsetParent===null)continue;A.value.trim()||(d="Field is empty",Z(`Erro: O campo '${w.label}' \xE9 obrigat\xF3rio.`,{error:!0}),S=!1)}if(!S){console.warn(`Validation failed for required field "${w.name}" in step ${c}: ${d}`),x=!1;break}}}return x}oe.addEventListener("click",()=>{if(G(a)&&R(a)){n==="BAU"?a++:a===5?a=4:a++,L();let c=l.querySelector(".bau-content");c&&(c.scrollTop=0),$.playClick()}}),J.addEventListener("click",()=>{a>0&&(n==="BAU"?a--:a===4?a=5:a===5?a=0:a--,L(),$.playClick())});async function ee(){let c=await Fe()||{};(!c.amName||c.amName==="N/A")&&(c.amName=c.internalEmail||"N/A"),o=c,_.querySelectorAll(".bau-vital-highlights").forEach(x=>{let w=[{label:"Anunciante",value:c.advName},{label:"CID",value:c.cid},{label:"Website",value:c.website||c.site},{label:"Case ID",value:c.caseId}];x.innerHTML=w.map(E=>{let S=E.value&&E.value!=="N/A"&&E.value!=="undefined"&&E.value!=="null"?E.value:"N\xE3o capturado";return`
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${E.label}</span>
                        <span class="bau-highlight-value">${S}</span>
                    </div>
                `}).join("")}),Ue.steps.forEach(x=>{x.fields&&x.fields.forEach(w=>{if(w.isSmart){let E=c[w.id];w.id==="language"&&c.userProfile?.defaultLanguage&&(E=c.userProfile.defaultLanguage);let S=_.querySelector(`#bau-step-${x.id} [name="${w.name}"]`),d=_.querySelector(`#bau-step-${x.id} #wrapper-${w.id}`);if(S&&(S.value=E&&E!=="N/A"?E:"",w.id==="language"&&E&&E!=="N/A"&&(S.readOnly=!0,S.style.background="#F1F3F4",S.style.cursor="not-allowed")),d){let A=E&&E!==""&&E!=="N/A"&&E!=="undefined"&&E!=="null";w.id==="language"?d.style.display="block":d.style.display=A?"none":"block"}}})}),_.querySelectorAll(".bau-all-data").forEach(x=>{let w=[{label:"Anunciante",value:c.advName},{label:"CID",value:c.cid},{label:"AM",value:c.amName},{label:"SE ID",value:c.seId},{label:"Site",value:c.website||c.site},{label:"Email",value:c.email},{label:"Timezone",value:c.timezone},{label:"Case ID",value:c.caseId},{label:"Programa",value:c.salesProgram},{label:"Idioma",value:c.language}];x.innerHTML=`
                <div class="bau-context-badges-grid">
                    ${w.filter(E=>E.value&&E.value!=="N/A"&&E.value!=="---"&&E.value!=="undefined"&&E.value!=="null").map(E=>`
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${E.label}:</span>
                                <span class="bau-badge-value">${E.value}</span>
                            </div>
                        `).join("")}
                </div>
            `})}l.querySelector("#bau-top-se-search")?.addEventListener("click",c=>{c.preventDefault(),ct("bau-form-seId")});let ae=l.querySelector("#bau-form-cid");ae&&ae.addEventListener("input",()=>G(1));function te(){let c=new FormData(_),m=Object.fromEntries(c.entries()),v=l.querySelector("#bau-confirmation-details");if(v){if(n==="BAU"){let x=c.getAll("taskType"),w=x.length>0?x.join(", "):"Nenhuma";v.innerHTML=`
                ${i?`<div class="bau-highlight-panel" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${Re.yellow}; background: rgba(255, 186, 0, 0.05); border-radius: 8px; font-weight: 500;">Voc\xEA est\xE1 editando o caso #<span style="color: ${Re.yellow}">${r}</span></div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Anunciante</span>
                        <input class="bau-confirm-value-input" data-field="advName" data-step="1" value="${m.advName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">CID</span>
                        <input class="bau-confirm-value-input" data-field="cid" data-step="1" value="${m.cid||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">AM</span>
                        <input class="bau-confirm-value-input" data-field="amName" data-step="1" value="${m.amName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Website</span>
                        <input class="bau-confirm-value-input" data-field="website" data-step="1" value="${m.website||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="1" value="${m.seId||""}" placeholder="N\xE3o informado">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">O que deve ser feito</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="reason" data-step="2" placeholder="---">${m.reason||""}</textarea>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Tasks</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="Para editar as tasks, volte ao Passo 2">${w}</span>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Justificativa BAU</span>
                        <select class="bau-confirm-value-input" data-field="nonImplementationReason" data-step="3">
                            <option value="Tempo da consultoria esgotado" ${m.nonImplementationReason==="Tempo da consultoria esgotado"?"selected":""}>Tempo da consultoria esgotado</option>
                            <option value="Solicita\xE7\xE3o de reagendamento pelo anunciante" ${m.nonImplementationReason==="Solicita\xE7\xE3o de reagendamento pelo anunciante"?"selected":""}>Solicita\xE7\xE3o de reagendamento pelo anunciante</option>
                            <option value="Falta de acessos ou backup do site" ${m.nonImplementationReason==="Falta de acessos ou backup do site"?"selected":""}>Falta de acessos ou backup do site</option>
                            <option value="Anunciante indispon\xEDvel ou n\xE3o preparado" ${m.nonImplementationReason==="Anunciante indispon\xEDvel ou n\xE3o preparado"?"selected":""}>Anunciante indispon\xEDvel ou n\xE3o preparado</option>
                            <option value="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)" ${m.nonImplementationReason==="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"?"selected":""}>Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)</option>
                            <option value="Solicita\xE7\xE3o de tarefas (tasks) adicionais" ${m.nonImplementationReason==="Solicita\xE7\xE3o de tarefas (tasks) adicionais"?"selected":""}>Solicita\xE7\xE3o de tarefas (tasks) adicionais</option>
                            <option value="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)" ${m.nonImplementationReason==="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"?"selected":""}>Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)</option>
                            <option value="Retorno de contato ap\xF3s prazo de 14 dias expirado" ${m.nonImplementationReason==="Retorno de contato ap\xF3s prazo de 14 dias expirado"?"selected":""}>Retorno de contato ap\xF3s prazo de 14 dias expirado</option>
                        </select>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Descri\xE7\xE3o</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="3" placeholder="---">${m.description||""}</textarea>
                    </div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Disponibilidade (Prioridade)</span>
                        <input type="datetime-local" class="bau-confirm-value-input" data-field="availability_1" data-step="3" value="${m.availability_1||""}">
                    </div>
                </div>
            `}else v.innerHTML=`
                ${i?`<div class="bau-highlight-panel discard-theme" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${Re.red}; background: rgba(217, 48, 37, 0.05); border-radius: 8px; font-weight: 500;">Voc\xEA est\xE1 editando o descarte do caso #<span style="color: ${Re.red}">${r}</span></div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Case ID</span>
                        <input class="bau-confirm-value-input" data-field="caseId" data-step="5" value="${m.caseId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Idioma</span>
                        <input class="bau-confirm-value-input" data-field="language" data-step="5" value="${m.language||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="5" value="${m.seId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Motivo do Descarte</span>
                        <input class="bau-confirm-value-input" data-field="reason" data-step="5" value="${m.reason||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Descri\xE7\xE3o do Descarte</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="5" placeholder="---">${m.description||""}</textarea>
                    </div>
                </div>
            `;v.querySelectorAll(".bau-confirm-value-input").forEach(x=>{x.addEventListener("input",w=>{let E=w.target.dataset.field,S=w.target.dataset.step;if(!E||!S)return;let d=_.querySelector(`#bau-step-${S} [name="${E}"]`);d&&(d.value=w.target.value,E==="cid"&&G(1))})})}}async function j(c){if(!await ve("Aten\xE7\xE3o: Para editar as informa\xE7\xF5es, voc\xEA deve estar com a p\xE1gina deste Caso espec\xEDfico aberta no sistema. Caso contr\xE1rio, os dados capturados estar\xE3o incorretos.",{confirmText:"Estou na p\xE1gina correta"}))return;I(!0),U(),i=!0,r=c.id,n=c.status==="PENDING_TL_DISCARD"||c.reason&&!c.task?"DISCARD":"BAU",z("form"),await ee(),o={...o,advName:c.advName||o.advName,cid:c.cid||o.cid,caseId:c.caseId||o.caseId,seId:c.seId||o.seId,site:c.site||c.website||o.site||o.website,email:c.advEmail||o.email,timezone:c.timezone||o.timezone,language:c.language||o.language,amName:c.amName||o.amName,salesProgram:c.salesProgram||o.salesProgram};let v=c.availability?c.availability.split("|").map(x=>x.trim()):[];_.querySelectorAll("input, select, textarea").forEach(x=>{let w=x.name,S={advEmail:"advEmail",website:"site",site:"site"}[w]||w;if(w==="taskType"){let d=(c.task||c.taskType||"").split(",").map(A=>A.trim());x.type==="checkbox"&&(x.checked=d.includes(x.value),x.closest(".bau-task-item")?.classList.toggle("active",x.checked))}else if(w.startsWith("availability_")){let d=parseInt(w.split("_")[1])-1,A=v[d];if(A&&x.type==="datetime-local")try{let T=new Date(A);if(!isNaN(T.getTime())){let H=new Date(T.getTime()-T.getTimezoneOffset()*6e4).toISOString().slice(0,16);x.value=H}}catch{}}else c[S]!==void 0?x.value=c[S]:w==="reason"?x.value=c.reason:w==="description"?x.value=c.description:w==="nonImplementationReason"&&(x.value=c.nonImplementationReason||"")}),a=n==="BAU"?1:5,L(),$.playClick(),setTimeout(()=>I(!1),500)}_.onsubmit=async c=>{c.preventDefault();let m=n==="BAU"?[1,2,3]:[5];for(let d of m)if(!Ue.steps.find(T=>T.id===d)?.isConfirmation&&(!G(d)||!R(d))){console.warn(`Form submission blocked by validation failure in step ${d}`),a=d,L();return}let v=l.querySelector(".bau-btn-submit");v.disabled=!0,v.innerHTML="Enviando...";let x=new FormData(_),w=Object.fromEntries(x.entries()),E=o||{},S={...E,...w,requestType:n};if(w.advEmail?S.advEmail=w.advEmail:E.email&&(S.advEmail=E.email),w.website?S.website=w.website:E.website?S.website=E.website:E.site&&(S.website=E.site),n==="BAU"){let d=x.getAll("taskType"),A=[w.availability_1,w.availability_2,w.availability_3].filter(T=>T&&T.trim()!=="").join(" | ");S.taskType=d.join(", "),S.availability=A,i?(w.nonImplementationReason?S.nonImplementationReason=w.nonImplementationReason:delete S.nonImplementationReason,w.description?S.description=w.description:delete S.description):(S.nonImplementationReason=w.nonImplementationReason||"",S.description=w.description||"",S.nonImplementationReason||console.warn("Aviso: Campo 'Justificativa' (nonImplementationReason) est\xE1 saindo vazio."),S.description||console.warn("Aviso: Campo 'Descri\xE7\xE3o detalhada' (description) est\xE1 saindo vazio."))}else S.reason=w.reason,i?(w.description?S.description=w.description:delete S.description,delete S.taskType,delete S.availability,delete S.nonImplementationReason):(S.taskType="",S.availability="",S.nonImplementationReason="",S.description=w.description||"");try{i?await Vt(r,S):await jt(S,E.agentEmail||"anon"),$.playSuccess();let d=l.querySelector(".bau-success-title");d&&(i?d.textContent="Caso atualizado com sucesso!":d.textContent=n==="DISCARD"?"Caso enviado para descarte com sucesso!":"Caso enviado com sucesso!"),z("success")}catch(d){Z("Erro: "+(d.message||"Erro desconhecido"),{error:!0}),console.error("Payload que tentou enviar:",S)}finally{v.disabled=!1,v.innerHTML=`${me.send} Enviar para o TL`}};function U(){_.reset(),a=0,n="BAU",i=!1,r=null,L(),_.querySelectorAll(".bau-task-item.active").forEach(m=>m.classList.remove("active"));let c=_.querySelector('[name="language"]');c&&(c.readOnly=!1,c.style.background="",c.style.cursor="")}l.querySelector("#bau-new-case-btn").addEventListener("click",()=>{U(),z("form"),ee()}),l.querySelector("#bau-form-back-btn").addEventListener("click",()=>z("dashboard")),l.querySelector("#bau-success-back-btn").addEventListener("click",()=>z("dashboard"));async function K(){t=!t,l.style.display=t?"flex":"none",t&&(z("dashboard"),M()),be(t,l,"cw-btn-bauform")}return L(),K}function va(){if(window.techSolInitialized){kt();return}window.techSolInitialized=!0;let t="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{Jt();try{$.initGlobalListeners(),$.playStartup()}catch(p){console.warn("\xC1udio bloqueado:",p)}de.fetchTips(),kt();let e=wo(),o=Ao(),a=To(),n=Io(),i=Do(),r=zo(),s=Ro(),l=Ho(),u=Lo();go({toggleNotes:e,toggleEmail:o,toggleScript:a,toggleLinks:n,toggleTimezone:i,toggleLibrary:r,toggleConfigs:s,toggleBAUForm:l,broadcastControl:u}),setTimeout(()=>{de.logEvent("App","Start","Session Start"),qo(),setTimeout(()=>{_o(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),Z("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}va();})();
