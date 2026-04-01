(()=>{var Ro=Object.defineProperty;var Bo=(t,e)=>()=>(t&&(e=t(t=0)),e);var $o=(t,e)=>{for(var o in e)Ro(t,o,{get:e[o],enumerable:!0})};var st={};$o(st,{NotesState:()=>rt,notesState:()=>Y});var rt,Y,Qe=Bo(()=>{rt=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.excludedFields=new Set,this.activeFields=[];let e=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(e||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(e){this.currentCaseType!==e&&(this.currentCaseType=e,this.isDirty=!0,this.notify())}setLanguage(e){this.currentLang!==e&&(this.currentLang=e,this.notify())}setPortugalCase(e){this.isPortugalCase!==e&&(this.isPortugalCase=e,this.isDirty=!0,this.notify())}setConsent(e){this.consent!==e&&(this.consent=e,this.isDirty=!0,this.notify())}setTagSupportUsed(e){this.tagSupportUsed=e,e||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(e){this.activeFields=[...e],this.isDirty=!0,this.notify()}removeField(e){this.activeFields=this.activeFields.filter(o=>o!==e),this.isDirty=!0,this.notify()}addFieldAt(e,o){this.activeFields.includes(e)||(this.activeFields.splice(o,0,e),this.isDirty=!0,this.notify())}setForcedScreenshots(e){this.forcedScreenshots=new Set(e),this.isDirty=!0,this.notify()}toggleForcedScreenshot(e,o){o?this.forcedScreenshots.add(e):this.forcedScreenshots.delete(e),this.isDirty=!0,this.notify()}setExcludedFields(e){this.excludedFields=new Set(e),this.isDirty=!0,this.notify()}toggleFieldExclusion(e,o){o?this.excludedFields.add(e):this.excludedFields.delete(e),this.isDirty=!0,this.notify()}setStatus(e){this.currentStatus!==e&&(this.currentStatus=e,this.isDirty=!0,this.notify())}setSubStatus(e){this.currentSubStatus!==e&&(this.currentSubStatus=e,this.isDirty=!0,this.notify())}setScreenshotMode(e){this.screenshotMode=e,this.notify()}setActiveTasks(e){this.activeTasks=e,this.isDirty=!0,this.notify()}toggleFavorite(e){this.favorites.has(e)?this.favorites.delete(e):this.favorites.add(e),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(e,o){this.formData[e]!==o&&(this.formData[e]=o,this.isDirty=!0,this.notify())}listeners=[];subscribe(e){return this.listeners.push(e),()=>this.listeners=this.listeners.filter(o=>o!==e)}notify(){this.listeners.forEach(e=>e(this))}},Y=new rt});var Po="https://script.google.com/a/macros/google.com/s/AKfycbxx66yAWDKEXgY5gClR3jIa14lkEWbDlzF8nM4pa6bkM42ff6m6xf-fCmEKkjVluL2feg/exec",Ct="cw_data_broadcast",Bt="cw_data_tips",Ho=["Processando...","Mantenha o foco!","Aguarde..."];function Re(t,e={}){return new Promise((o,a)=>{let n="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script"),r=setTimeout(()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(new Error("Timeout: A API demorou muito para responder. (Apps Script bloqueado ou erro 500)"))},15e3);window[n]=m=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(m)};let s=Object.keys(e).map(m=>encodeURIComponent(m)+"="+encodeURIComponent(e[m])).join("&"),d=`${Po}?op=${t}&callback=${n}&t=${Date.now()}&${s}`;i.src=d,i.onerror=()=>{clearTimeout(r),document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(new Error("Erro de conex\xE3o JSONP."))},document.body.appendChild(i)})}var de={fetchTips:async()=>{try{let t=await Re("tips");t?.tips&&localStorage.setItem(Bt,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await Re("broadcast");if(t?.broadcast)return localStorage.setItem(Ct,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(Ct)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Ct)||"[]"),getRandomTip:()=>{let t=Ho,e=localStorage.getItem(Bt);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await de._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await de._performOp("update_broadcast",o)},deleteBroadcast:async t=>await de._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`Executando ${t}...`,e);let o=await Re(t,e);return o&&o.status==="success"?(console.log("Sucesso:",t),!0):(console.warn("Falha:",o),!1)}catch(o){return console.error("Erro JSONP:",o),!1}},logEvent:(t,e,o="",a=null)=>{try{let n="anon";try{let r=he();r&&(n=r.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:n,version:"v5.1",category:t,action:e,label:o,value:a||""};Re("log",i).catch(r=>{})}catch(n){console.warn("Analytics error",n)}},logUsage:()=>{},sendBAUEscalation:async(t,e)=>{let o={...t,user:e,date:new Date().toISOString()};try{console.log("Executando create_bau...",o);let a=await Re("create_bau",o);if(a&&a.status==="success")return console.log("Sucesso: create_bau"),a;throw new Error(a?.error||a?.message||"Falha na opera\xE7\xE3o BAU")}catch(a){throw console.error("Erro JSONP (BAU):",a),a}},readAgentBAU:async()=>{let t=he();if(!t)return console.warn("Email n\xE3o encontrado. N\xE3o foi poss\xEDvel buscar casos BAU."),[];try{console.log("Buscando casos BAU para:",t);let e=await Re("read_agent_bau",{user:t});if(e&&e.status==="success"&&Array.isArray(e.cases))return e.cases;if(e&&e.status==="error")throw new Error(e.message||"Erro retornado pela API de leitura");return[]}catch(e){throw console.error("Erro ao buscar casos BAU:",e),e}},updateBAUStatus:async(t,e,o={})=>{let a=he();try{console.log(`Atualizando status BAU ${t} para ${e}...`);let n=await Re("update_bau_status",{id:t,status:e,user:a,...o});return n&&n.status==="success"}catch(n){return console.error("Erro ao atualizar status BAU:",n),!1}},fetchUserProfile:async t=>{try{console.log(`Buscando perfil para: ${t}`);let e=await Re("people");if(e&&e.status==="success"&&e.people){let o=e.people.find(a=>a.ldap.toLowerCase()===t.toLowerCase());if(o){let n=["Manager","Lead","TL","Staff"].some(i=>o.roleCategory.includes(i));return{...o,isOverhead:n}}}return null}catch(e){return console.error("Erro ao buscar perfil:",e),null}}},$t=de.sendBAUEscalation,Pt=de.readAgentBAU,ga=de.updateBAUStatus,nt=de.fetchUserProfile;var it="",Ze="",At=null,Ht=t=>new Promise(e=>setTimeout(e,t));async function Et(){if(it&&Ze)return it;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await Ht(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let n=document.querySelector("profile-details img");if(n&&n.src.includes("/photos/")){let i=n.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let a=document.querySelector("profile-details .email");return a&&(Ze=a.textContent.trim(),console.log("TechSol: Identidade confirmada ->",Ze)),t.click(),document.body.click(),it=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function $e(){return it||"Consultor"}function he(){return Ze||null}function jt(t){let e=new Date,o=e.getHours(),a=e.getDay(),n="Ol\xE1",i="";o>=5&&o<12?(n="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(n="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(n="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let r=[];o>=0&&o<5?r=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?a===1?r=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:a===5?r=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:r=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?r=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:r=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(a===0||a===6)&&(r=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let s=r[Math.floor(Math.random()*r.length)];return{prefix:`${n},`,name:t,suffix:s,icon:i,isFriday:a===5}}async function jo(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,a=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');a&&(a.click(),await Ht(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(r=>{let s=r.innerText.trim();return s.includes("@")&&!s.includes("Is this:")&&s.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Go(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function Uo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Google Ads External Customer ID")||n.textContent.includes("Customer ID"));if(e){let n=e.closest("home-data-item")||e.parentElement;if(n){let i=n.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let a=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(a)return a[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"N/A"}function Vo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Account Manager")||o.textContent.includes("AM Name")||o.textContent.includes("Sales Rep"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar AM:",t)}return null}function Wo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("customer time zone")||o.textContent.toLowerCase().includes("time zone")||o.textContent.toLowerCase().includes("timezone"));if(e){let o=e.parentElement;if(o){let a=o.querySelector("sanitized-content");if(a&&a.textContent.trim())return a.textContent.trim();let n=o.querySelector(".data-pair-content")||e.nextElementSibling;if(n&&n.textContent.trim()){let i=n.textContent.trim();if(i&&i!=="---"&&i!=="N/A")return i}}}}catch(t){console.warn("Erro ao capturar Timezone:",t)}return null}async function Yo(){let t="---";try{t=window.location.href.split("/").pop()}catch(e){console.warn("Falha URL:",e)}return t}function Xo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("sales program")||o.textContent.toLowerCase().trim()==="program"||o.textContent.toLowerCase().includes("programa"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector('sanitized-content ng-template[debug-id="html-value"]')||o.querySelector("sanitized-content");if(a)return a.textContent.trim();let n=o.querySelector(".data-pair-content")||o.nextElementSibling;if(n)return n.textContent.trim()}}catch(t){console.warn("Erro ao capturar Sales Program:",t)}return""}function Jo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Language")||o.textContent.includes("Idioma"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar Idioma:",t)}return"N/A"}function Ko(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Speakeasy ID")||n.textContent.includes("SE ID"));if(e){let n=e.closest(".data-pair")||e.parentElement,i=n.querySelector(".data-pair-content")||n.nextElementSibling;if(i&&i.textContent.trim())return i.textContent.trim()}let o=/Speakeasy.*?(P\d{15,25})/i,a=Array.from(document.querySelectorAll("textarea, .preview, .message-body, .notes-content"));for(let n=a.length-1;n>=0;n--){let r=(a[n].value||a[n].innerText||"").match(o);if(r&&r[1])return r[1]}}catch(t){console.warn("Erro ao capturar SE ID:",t)}return"N/A"}async function Se(){Ze||await Et();let t="Cliente",e="";try{let f=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(f&&f.nextElementSibling){let g=f.nextElementSibling.innerText.trim();g&&(t=g)}}catch(x){console.warn("Falha Nome:",x)}try{let f=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(f&&f.nextElementSibling){let g=f.nextElementSibling.innerText.trim();g&&(e=g)}}catch(x){console.warn("Falha URL:",x)}let o=await jo(),a=Go(),n=Uo(),i=Vo(),r=Wo(),s=await Yo(),d=Xo(),m=Jo(),l=Ko(),p=he();if(p&&!At){let x=p.split("@")[0];try{At=await nt(x)}catch(f){console.warn("Falha ao carregar perfil do usu\xE1rio:",f)}}return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:a,cid:n,amName:i,timezone:r,agentName:$e(),agentEmail:he(),caseId:s,userProfile:At,advName:t,site:e,email:o,salesProgram:d,language:m,seId:l}}var He=null,kt=null,Me=.3;var De=localStorage.getItem("cw_sounds_muted")==="true";function Pe(){if(!He){let t=window.AudioContext||window.webkitAudioContext;t&&(He=new t)}return He&&He.state==="suspended"&&He.resume(),He}function Gt(t){if(kt)return kt;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),a=o.getChannelData(0);for(let n=0;n<e;n++)a[n]=Math.random()*2-1;return kt=o,o}var H={setMuted:t=>{De=t,localStorage.setItem("cw_sounds_muted",t)},isMuted:()=>De,playClick:()=>{if(De)return;let t=Pe();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Gt(t);let a=t.createBiquadFilter();a.type="highpass",a.frequency.value=4e3;let n=t.createGain();n.gain.setValueAtTime(Me*.8,e),n.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{if(De)return;let t=Pe();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let a=t.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Me*.1,e+.005),a.gain.linearRampToValueAtTime(0,e+.02),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{if(De)return;let t=Pe();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((a,n)=>{let i=t.createOscillator(),r=t.createGain();i.type="sine",i.frequency.value=a,r.gain.setValueAtTime(0,e),r.gain.linearRampToValueAtTime(Me*.6,e+.05),r.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(r),r.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{if(De)return;let t=Pe();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Gt(t);let a=t.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(100,e),a.frequency.exponentialRampToValueAtTime(800,e+.2);let n=t.createGain();n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(Me*.5,e+.05),n.gain.linearRampToValueAtTime(0,e+.25),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{if(De)return;let t=Pe();if(!t)return;let e=t.currentTime,o=t.createOscillator(),a=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),a.gain.setValueAtTime(Me,e),a.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{if(De)return;let t=Pe();if(!t)return;let e=t.currentTime,o=.12,a=t.createOscillator(),n=t.createGain(),i=t.createBiquadFilter();a.type="square",a.frequency.setValueAtTime(400,e),a.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),n.gain.setValueAtTime(Me*4,e),n.gain.exponentialRampToValueAtTime(.001,e+.1),a.connect(i),i.connect(n),n.connect(t.destination),a.start(e),a.stop(e+.12);let r=t.createOscillator(),s=t.createGain();r.type="sine",r.frequency.setValueAtTime(150,e),r.frequency.exponentialRampToValueAtTime(50,e+.15),s.gain.setValueAtTime(Me*1.5,e),s.gain.exponentialRampToValueAtTime(.001,e+.15),r.connect(s),s.connect(t.destination),r.start(e),r.stop(e+.15),[55,55.4,110.5].forEach(m=>{let l=t.createOscillator(),p=t.createGain(),x=t.createBiquadFilter();l.type="sawtooth",l.frequency.value=m,x.type="lowpass",x.frequency.setValueAtTime(30,e),x.frequency.linearRampToValueAtTime(900,e+o+.2),x.frequency.exponentialRampToValueAtTime(40,e+3),p.gain.setValueAtTime(0,e),p.gain.linearRampToValueAtTime(Me*.6,e+o+.1),p.gain.exponentialRampToValueAtTime(.001,e+3.5),l.connect(x),x.connect(p),p.connect(t.destination),l.start(e),l.stop(e+3.6)})},playNotification:()=>{if(De)return;let t=Pe();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(a=>{let n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(a.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Me*a.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+a.dur),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+a.dur+.1)})},playSwoosh:()=>{H.playGenieOpen()},playReset:()=>{H.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!He)return;let a=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!a||a.contains(o.relatedTarget))return;let n=Date.now();n-t<e||(H.playHover(),t=n)},{passive:!0})}};var Ut=1e4;function Vt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function Z(t,e={}){let o=document.createElement("div"),a=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:a,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?H.playError():H.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function Wt(t,e=null){let o=0,a=0,n=0,i=0,r=e||t;r.style.cursor="grab",r.onmousedown=s;function s(l){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(l.target.tagName)||l.target.closest(".no-drag"))return;l=l||window.event,r.style.cursor="grabbing",t.style.transition="none";let p=t.getBoundingClientRect();t.style.transform="none",t.style.left=p.left+"px",t.style.top=p.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",Ut++,t.style.zIndex=Ut,n=l.clientX,i=l.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=m,document.onmousemove=d}function d(l){l=l||window.event,l.preventDefault(),o=n-l.clientX,a=i-l.clientY,n=l.clientX,i=l.clientY;let p=t.offsetTop-a,x=t.offsetLeft-o,f=16,g=window.innerWidth,u=window.innerHeight,C=t.offsetWidth,F=t.offsetHeight;x<f?x=f:x+C>g-f&&(x=g-C-f),p<f?p=f:p+F>u-f&&(p=u-F-f),t.style.top=p+"px",t.style.left=x+"px"}function m(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var ge={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Tt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Yt={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Xt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Ne=t=>new Promise(e=>setTimeout(e,t));async function Zo(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await Ne(200);for(let a=0;a<e.length;a++){let n=e.charAt(a),i=document.createElement("span");i.textContent=n,o&&o.parentNode===t?o.before(i):t.appendChild(i);let r=Math.floor(Math.random()*60)+30;a===0&&(r=150),a>e.length-3&&(r=30),await Ne(r)}await Ne(600),o&&(o.style.display="none")}async function Ft(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Ne(200);let e=await Et(),o=jt(e),a=t.querySelector("#w-icon"),n=t.querySelector("#p1"),i=t.querySelector("#p2"),r=t.querySelector("#p3"),s=t.querySelector("#p-sextou");a&&(a.innerHTML=o.icon),n&&(n.textContent=o.prefix),r&&(r.textContent=o.suffix),await Ne(300);let d=a?a.querySelector("svg"):null;if(d&&(d.style.opacity="1",d.style.transform="scale(1)"),await Ne(400),n&&(n.style.opacity="1"),H.playStartup(),i&&await Zo(i,o.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),o.isFriday&&s){await Ne(400),s.style.display="block",s.offsetWidth;let m=s.querySelector(".sextou-badge");m&&(m.style.opacity="1",m.style.transform="scale(1)")}await Ne(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Ne(900),t.parentNode&&t.parentNode.removeChild(t)}}function Jt(t){if(!t)return;let e=t.getBoundingClientRect(),o=window.innerWidth,a=window.innerHeight,n=24,i=o-e.width-n,r=a-e.height-n,s=parseFloat(t.style.left)||e.left,d=parseFloat(t.style.top)||e.top,m=Math.max(n,Math.min(s,i)),l=Math.max(n,Math.min(d,r));if(m!==s||l!==d){let p=t.style.transition;t.style.transition="left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",t.style.left=`${m}px`,t.style.top=`${l}px`,setTimeout(()=>{t.style.transition=p},300)}}var Oe={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Le(t,e){e.onmousedown=o;function o(a){a.stopPropagation(),a.preventDefault();let n=t.style.transition;t.style.transition="none";let i=a.clientX,r=a.clientY,s=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),d=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),m=i,l=r,p=!1;function x(u){m=u.clientX,l=u.clientY,p||(window.requestAnimationFrame(()=>{f(),p=!1}),p=!0)}function f(){let u=s+(m-i),C=d+(l-r);u>360&&(t.style.width=u+"px"),C>300&&(t.style.height=C+"px")}function g(){document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",g),setTimeout(()=>{t.style.transition=n},50)}document.addEventListener("mousemove",x),document.addEventListener("mouseup",g)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function Kt(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}function Zt(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),t}function Qt(){let t=document.createElement("div");return Object.assign(t.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),t}function ye(t,e={}){return new Promise(o=>{let a=Zt(),n=Qt(),i=e.danger?"#FF3B30":"#007AFF",r=e.confirmText||(e.danger?"Excluir":"Confirmar");n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${t}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${r}</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)"});let s=l=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(l)},300)},d=n.querySelector("#cw-conf-cancel"),m=n.querySelector("#cw-conf-ok");[d,m].forEach(l=>l.onmouseenter=()=>H.playHover()),d.onclick=()=>{H.playClick(),s(!1)},m.onclick=()=>{H.playClick(),s(!0)}})}function eo(t,e=""){return new Promise(o=>{let a=Zt(),n=Qt();n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${t}</div>
            <input type="text" id="cw-prompt-input" value="${e}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a);let i=n.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let r=m=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(m)},300)},s=n.querySelector("#cw-prompt-cancel"),d=n.querySelector("#cw-prompt-ok");[s,d].forEach(m=>m.onmouseenter=()=>H.playHover()),s.onclick=()=>{H.playClick(),r(null)},d.onclick=()=>{H.playClick(),r(i.value)},i.onkeydown=m=>{m.key==="Enter"&&d.click(),m.key==="Escape"&&s.click()}})}Qe();var Qo={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},to={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function ue(t,e,o,a,n,i){let r=document.createElement("div");Object.assign(r.style,Qo),Wt(t,r);let s=document.createElement("div");if(Object.assign(s.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let F=document.createElement("style");F.id="cw-header-anim",F.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(F)}s.style.animation="cw-header-flow 6s linear infinite",r.appendChild(s),n&&(n.googleLine=s);let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center",gap:"12px"});let m=document.createElement("img");m.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(m.style,{width:"20px",height:"20px",pointerEvents:"none"});let l=document.createElement("span");l.textContent=e,d.appendChild(m),d.appendChild(l);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"4px"});let x='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',f='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',g=document.createElement("div");g.innerHTML=x,Object.assign(g.style,to),g.title="Sobre & Feedback",g.classList.add("no-drag"),g.onmouseenter=()=>{g.style.background="rgba(255,255,255,0.1)",g.style.color="#FFF"},g.onmouseleave=()=>{g.style.color!=="rgb(138, 180, 248)"&&(g.style.background="transparent",g.style.color="#9AA0A6")};let u=document.createElement("div");u.innerHTML=f,Object.assign(u.style,to),u.title="Fechar",u.classList.add("no-drag","cw-header-close"),u.onmouseenter=()=>{u.style.background="rgba(242, 139, 130, 0.2)",u.style.color="#F28B82"},u.onmouseleave=()=>{u.style.background="transparent",u.style.color="#9AA0A6"},u.onmousedown=F=>F.stopPropagation(),g.onmousedown=F=>F.stopPropagation(),u.onclick=i;let C=ea(t,e,o,a);return g.onclick=F=>{F.stopPropagation(),C.style.opacity==="1"?(C.style.opacity="0",C.style.pointerEvents="none",g.style.color="#9AA0A6",g.style.background="transparent"):(C.style.opacity="1",C.style.pointerEvents="auto",g.style.color="#8AB4F8",g.style.background="rgba(138, 180, 248, 0.1)")},p.appendChild(g),p.appendChild(u),r.appendChild(d),r.appendChild(p),r}function ea(t,e,o,a){let n=document.createElement("div");return Object.assign(n.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),n.innerHTML=`
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
    `,setTimeout(()=>{let i=n.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let r=n.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{n.style.opacity="0",n.style.pointerEvents="none"})},0),t.appendChild(n),n}var z={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},pe={small:"8px",medium:"12px",large:"20px",pill:"100px"},ze={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},se="cubic-bezier(0.34, 1.56, 0.64, 1)",ta={width:"100%",padding:"14px 16px",borderRadius:pe.medium,border:`1.5px solid ${z.border}`,backgroundColor:z.bgInput,fontSize:"14px",color:z.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${se}`,outline:"none"},Aa={...ta,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},Ea={fontSize:"12px",fontWeight:"700",color:z.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},ka={display:"block",fontSize:"14px",fontWeight:"600",color:z.text,marginBottom:"10px",marginTop:"20px"},Ta={fontSize:"12px",color:z.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},Ot={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:z.primary},Fa={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:z.text,cursor:"pointer",padding:"16px 20px",backgroundColor:z.surface,border:`1px solid ${z.border}`,borderRadius:pe.large,transition:`all 0.4s ${se}`,userSelect:"none",boxShadow:ze.subtle},Oa={padding:"14px 28px",color:"#fff",backgroundColor:z.primary,border:"none",borderRadius:pe.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${se}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},La={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${z.primary}`,color:z.primary,borderRadius:pe.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${se}`},Ia={background:"transparent",border:`1px solid ${z.border}`,borderRadius:pe.pill,color:z.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${se}`};function oo(t,e){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,ge,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${se}, height 0.4s ${se}, transform 0.4s ${se}, opacity 0.3s ease`,borderRadius:pe.large,boxShadow:ze.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let a={popup:o,googleLine:null},n=ue(o,"Case Notes",t,"Gera notas padronizadas com excel\xEAncia visual.",a,e);o.appendChild(n);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:z.surface}),o.appendChild(i);let r=document.createElement("div");r.textContent="created by lucaste@",Object.assign(r.style,Xt,{padding:"16px 24px",borderTop:`1px solid ${z.bgInput}`,color:z.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),o.appendChild(r);let s=document.createElement("div");return Object.assign(s.style,Oe),s.className="no-drag",o.appendChild(s),Le(o,s),oa(),{popup:o,content:i,header:n,animRefs:a,credit:r}}function oa(){if(document.getElementById("cw-notes-refactor-styles"))return;let t=document.createElement("style");t.id="cw-notes-refactor-styles",t.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${pe.medium} !important;
            border: 1.5px solid ${z.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: all 0.2s ${se} !important;
            box-sizing: border-box !important;
            background: ${z.bgInput} !important;
            color: ${z.text} !important;
            outline: none !important;
            box-shadow: ${ze.subtle} !important;
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
            transition: border-color 0.2s ${se}, background-color 0.2s ${se}, box-shadow 0.2s ${se} !important;
        }

        .cw-input:hover, .cw-textarea:hover, #notes-assistant-popup .cw-select:hover {
            border-color: #bdc1c6 !important;
            background-color: #f1f3f4 !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }

        .cw-input:focus, .cw-textarea:focus, #notes-assistant-popup .cw-select:focus {
            border-color: ${z.primary} !important;
            background-color: #fff !important;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15), 0 2px 8px rgba(0,0,0,0.05) !important;
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${z.textSub};
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
            background: ${z.bgInput};
        }

        .cw-btn-primary {
            background: ${z.primary};
            color: #fff;
            border: none;
            border-radius: ${pe.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${se};
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
            color: ${z.textSub};
            border: 1px solid ${z.border};
            border-radius: ${pe.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${se};
        }
        .cw-btn-secondary:hover {
            background: ${z.bgInput};
            border-color: #bdc1c6;
            color: ${z.text};
        }
    `,document.head.appendChild(t)}var Ce={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} Seguimos com os passos:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evid\xEAncias de Contato",ligacao_1:"Liga\xE7\xE3o 1",ligacao_2:"Liga\xE7\xE3o 2",mensagem_am:"Mensagem para AM"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Pasos ejecutados:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evidencias de Contacto",ligacao_1:"Llamada 1",ligacao_2:"Llamada 2",mensagem_am:"Mensaje para AM"}},Ae={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},Ie={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Ye={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},Xe=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],lt=["CONSIDERACOES","COMENTARIOS"],ct={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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

Irei solicitar descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var Je=t=>new Promise(e=>setTimeout(e,t));function et(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var ao="cw-automation-styles";if(!document.getElementById(ao)){let t=document.createElement("style");t.id=ao,t.innerHTML=`
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
    `,document.head.appendChild(t)}function no(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function dt(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),o="";no(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let a=document.querySelector('material-button[debug-id="dock-item-case-log"]');a&&!a.classList.contains("selected")&&(et(a),await Je(1200));let n=document.querySelector("search-filter dropdown-button .button");if(n&&!(n.innerText||"").includes("All")){et(n),await Je(600);let x=document.querySelector('material-checkbox[debug-id="check-all-box"]');x&&x.getAttribute("aria-checked")!=="true"&&(et(x),await Je(300));let f=document.querySelector('material-button[debug-id="apply-filter"]');f&&(et(f),await Je(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await Je(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let p=r.length-1;p>=0;p--){let x=r[p],f=x.querySelector("i.material-icons-extended"),g=f&&f.innerText.trim()==="phone_in_talk",u=x.innerText||"",C=u.includes("Agent joined")||u.includes("outbound-call")||u.includes("Speakeasy");if(g||C){x.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",x),e&&(e.placeholder="Lendo mensagem..."),et(x),await Je(1e3));break}}let d=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),m=/Speakeasy.*?(P\d{15,25})/i,l=null;for(let p=d.length-1;p>=0;p--){let x=d[p];if(x.offsetParent===null)continue;let f=(x.innerText||"").match(m);if(f&&f[1]){l=f[1];break}}if(e)if(l){try{await navigator.clipboard.writeText(l)}catch{}e.tagName==="INPUT"||e.tagName==="TEXTAREA"?e.value=l:e.textContent=l,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),H.playSuccess(),Z(`ID Localizado: ${l}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else H.playError(),Z("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(a){console.error("Erro na automa\xE7\xE3o:",a),Z("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),no(!1)}}function io(t){t.dataset.bulletEnabled!=="true"&&(t.dataset.bulletEnabled="true",(t.value.trim()===""||t.value.trim()==="\u2022")&&(t.value="\u2022 "),t.addEventListener("keydown",function(e){let o=this.selectionStart,a=this.selectionEnd,n=this.value,i=n.lastIndexOf(`
`,o-1)+1,r=n.substring(i,o);if(e.key==="Enter"){e.preventDefault();let s=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=n.substring(0,i)+`
`+n.substring(a),this.selectionStart=this.selectionEnd=i+1;return}let d=`
`+s;this.value=n.substring(0,o)+d+n.substring(a),this.selectionStart=this.selectionEnd=o+d.length}else if(e.key==="Tab")e.preventDefault(),e.shiftKey?r.startsWith("  ")&&(this.value=n.substring(0,i)+r.substring(2)+n.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=n.substring(0,i)+"  "+r+n.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(e.key==="Backspace"&&o===a&&o>0){let s=n.substring(0,o);s.endsWith("\u2022 ")?(e.preventDefault(),this.value=s.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2):s.endsWith("  ")&&r.trim().startsWith("\u2022")&&(e.preventDefault(),this.value=s.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2)}}))}function Lt(t,e,o){if(e.innerHTML="",!!Ie[t]&&(o.activeFields.forEach(n=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(n))return;let i=`field-${n}`,r=document.createElement("label"),s=p=>Ce[o.currentLang]?.[p]||Ce.pt?.[p]||p;r.textContent=s(n.toLowerCase())!==n.toLowerCase()?s(n.toLowerCase()):n.replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase())+":",Object.assign(r.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:z.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let d=document.createElement("span");if(d.textContent=r.textContent,r.innerHTML="",r.appendChild(d),n==="SPEAKEASY_ID"){let p=document.createElement("button");p.innerHTML="\u2728 Auto Busca",p.style.cssText=`font-size: 11px; font-weight: 700; color: ${z.primary}; background-color: ${z.primaryBg}; border: none; border-radius: ${pe.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${se};`,p.onmouseenter=()=>p.style.backgroundColor="#d2e3fc",p.onmouseleave=()=>p.style.backgroundColor=z.primaryBg,p.onclick=x=>{x.preventDefault(),dt(i)},r.appendChild(p)}let m=document.createElement("button");m.innerHTML="\u2715",m.style.cssText=`font-size: 14px; background: ${z.bgInput}; border: none; color: ${z.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${se};`,m.onmouseenter=()=>{m.style.background=z.error,m.style.color=z.surface},m.onmouseleave=()=>{m.style.background=z.bgInput,m.style.color=z.textSub},m.onclick=async p=>{p.preventDefault(),await ye(`Tem certeza que deseja remover o campo "${d.textContent.replace(":","")}"?`)&&(o.removeField(n),Lt(t,e,o))},r.appendChild(m);let l;Xe.includes(n)?(l=document.createElement("textarea"),l.classList.add("bullet-textarea","cw-textarea"),l.placeholder="Utilize marcadores para detalhar...",io(l)):lt.includes(n)?(l=document.createElement("textarea"),l.classList.add("cw-textarea"),l.placeholder="Descreva as considera\xE7\xF5es..."):(l=document.createElement("input"),l.type="text",l.classList.add("cw-input")),l.id=i,l.value=o.formData[i]||"",l.addEventListener("input",p=>o.updateField(i,p.target.value)),e.appendChild(r),e.appendChild(l)}),o.activeFields.includes("CONSENTIU_GRAVACAO"))){let n=s=>Ce[o.currentLang]?.[s]||Ce.pt?.[s]||s,i=document.createElement("label");i.textContent=n("consentiu_gravacao"),Object.assign(i.style,{display:"block",fontSize:"13px",fontWeight:"700",color:z.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let r=document.createElement("select");r.className="cw-select",r.innerHTML=`
            <option value="false">${n("nao")}</option>
            <option value="true">${n("sim")}</option>
        `,r.value=o.consent?"true":"false",r.onchange=()=>o.setConsent(r.value==="true"),e.appendChild(i),e.appendChild(r)}}function It(t,e,o,a=null){let n=t.currentSubStatus;if(!n)return null;let i=Ie[n],r=Ce[t.currentLang]||Ce.pt,s=l=>r[l]||Ce.pt?.[l]||l,d='style="margin-bottom: 12px; padding-left: 30px;"',m="";if(t.activeFields.forEach(l=>{let p=s(l.toLowerCase()),x="N/A";if(l==="label_substatus")p=s("label_substatus"),x=i.name;else if(l==="TAGS_IMPLEMENTED"){p=s("tags_implemented");let f=[];e.getCheckedElements().forEach(u=>{let C=u.value,F=Ae[C],k=u.count||1,P=C==="ads_conversion_tracking"||C==="ads_enhanced_conversions";t.tagSupportUsed&&P&&!t.forcedScreenshots.has(C)?f.push(`${F.name} - ${s("ts_output_disclaimer")}`):f.push(k>1?`${F.name} (x${k})`:F.name)}),x=f.join(", ")||"N/A"}else if(l==="SCREENSHOTS_LIST"){p=s("screenshots_list");let f="",g=e.screenshotsElement;g&&Array.from(g.querySelectorAll('input[id^="name-"]')).forEach(C=>{let F=C.value,k=C.closest(".cw-screen-card");if(k){let P=k.querySelectorAll('input[id^="screen-"]'),M=!1,J="";P.forEach(ee=>{let O=ee.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",N=ee.value.trim();N&&(J+=`<li>${O} - ${N}</li>`,M=!0)}),M&&(f+=`<div style="margin-bottom: 8px;"><b>${F}</b><ul ${d}>${J}</ul></div>`)}}),x=f||"N/A"}else if(l==="CASO_PORTUGAL")p=s("caso_portugal"),x=s("sim");else if(l==="CONSENTIU_GRAVACAO")p=s("consentiu_gravacao"),x=t.consent?s("sim"):s("nao");else{let f=`field-${l}`,g=t.formData[f],u="";if(i.fieldPrefixes&&i.fieldPrefixes[l]&&(u=i.fieldPrefixes[l]+" "),g&&g.trim()!==""&&g.trim()!=="\u2022"){let C=g.trim();if(Xe.includes(l)){let F=C.split(`
`).map(k=>k.trim()).filter(k=>k!==""&&k!=="\u2022").map(k=>k.startsWith("\u2022 ")?k.substring(2):k).map(k=>`<li>${k}</li>`).join("");x=F?`${u}<ul ${d}>${F}</ul>`:"N/A"}else lt.includes(l)?x=u+C.split(`
`).filter(F=>F.trim()!=="").map(F=>`<p style="margin: 0 0 8px 0;">${F}</p>`).join(""):x=u+C}else u&&(x=u.trim())}m+=`<b>${p}</b><br>${x}<br><br>`}),a){let l="";a.l1&&(l+=`<li>${s("ligacao_1")}: ${a.l1}</li>`),a.l2&&(l+=`<li>${s("ligacao_2")}: ${a.l2}</li>`),a.msg&&(l+=`<li>${s("mensagem_am")}: ${a.msg}</li>`),l&&(m+=`<b>${s("evidencias_contato")}</b><br><ul ${d}>${l}</ul><br>`)}if(i.customFooter&&(m+=`${i.customFooter}<br><br>`),o?.getOutput){let l=o.getOutput();l&&(m+=`${l}<br><br>`)}return m+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",m.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}function ro(t){let e=document.createElement("div");e.className="cw-step-scenarios";let o="Passe o mouse sobre um cen\xE1rio para visualizar o texto...",a=document.createElement("div");Object.assign(a.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let i=document.createElement("span");i.style.transition="opacity 0.2s ease, transform 0.2s ease",i.textContent=o,n.appendChild(i);let r=new Set,s=null;return e.render=(d,m)=>{r.clear();let l=Object.entries(ct).filter(([p,x])=>{let f=!x.type||x.type==="all"||x.type===m,g=!1;return d.startsWith("NI_")?g=p.includes("-ni-")||p.includes("attempted"):d.startsWith("SO_")?g=p.includes("gtm")||p.includes("whatsapp")||p.includes("form")||p.includes("ecw4")||p.includes("ga4")||p.includes("-so-"):d.startsWith("AS_")?g=p.includes("-as-"):d.startsWith("IN_")?g=p.includes("-in-"):d.startsWith("DC_")&&(g=p.includes("-dc-")),f&&g});a.innerHTML="",l.forEach(([p,x])=>{let f=document.createElement("div"),g=p.replace("quickfill-","").replace(/-/g," ");f.textContent=g,f.dataset.id=p,Object.assign(f.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let u=x["field-REASON_COMMENTS"]||x["field-CONTEXTO_CALL"]||p;f.onmouseenter=()=>{s&&clearTimeout(s),r.has(p)||(f.style.background="#f1f3f4"),i.style.opacity="0",i.style.transform="translateY(5px)",s=setTimeout(()=>{i.textContent=u.substring(0,120)+(u.length>120?"...":""),i.style.opacity="1",i.style.transform="translateY(0)"},50)},f.onmouseleave=()=>{s&&clearTimeout(s),r.has(p)||(f.style.background="#ffffff"),s=setTimeout(()=>{r.size===0&&(i.style.opacity="0",setTimeout(()=>{i.textContent=o,i.style.opacity="1"},50))},100)},f.onclick=()=>{H.playClick();let C=!r.has(p);C?(r.add(p),f.style.background="#e8f0fe",f.style.borderColor="#1a73e8",f.style.color="#1967d2"):(r.delete(p),f.style.background="#ffffff",f.style.borderColor="#dadce0",f.style.color="#3c4043"),t(p,C)},a.appendChild(f)}),l.length===0?e.style.display="none":e.style.display="block"},e.appendChild(a),e.appendChild(n),e}var ie={bg:z.bgInput,white:z.surface,border:z.border,textMain:z.text,textSub:z.textSub,blue:z.blue,blueLight:z.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:z.blue,bg:z.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:z.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:z.primary,bg:z.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:z.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},je={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function so(t,e,o){let a={},n="implementation";o&&o.subscribe(()=>{J(),ee()});function i(I){let O=I.toLowerCase();return O.includes("ads")||O.includes("conversion")||O.includes("remarketing")?ie.brands.ads:O.includes("ga4")||O.includes("analytics")?ie.brands.ga4:O.includes("gtm")||O.includes("tag manager")||O.includes("container")?ie.brands.gtm:O.includes("merchant")||O.includes("shopping")||O.includes("feed")?ie.brands.gmc:ie.brands.default}let r=Object.entries(Ae).filter(([I,O])=>O.popular),s={};Object.entries(Ae).forEach(([I,O])=>{if(O.popular)return;let N=i(O.name);s[N.label]||(s[N.label]={brand:N,tasks:[]}),s[N.label].tasks.push({key:I,...O})});let d="cw-zen-tasks";if(!document.getElementById(d)){let I=document.createElement("style");I.id=d,I.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${ie.font}; background: ${ie.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${ie.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${ie.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${ie.white}; 
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
                font-size: 12px; font-weight: 500; color: ${ie.textMain}; line-height: 1.2; 
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
            
            /* Bot\xF5es do Stepper */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 50%; background: #F3F4F6;
                color: ${ie.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${ie.border}; border-radius: 10px; background: ${ie.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${ie.blue}; box-shadow: 0 0 0 3px ${ie.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${ie.border}; border-radius: 10px; background: ${ie.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${ie.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${ie.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${ie.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${ie.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${ie.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${ie.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${ie.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${ie.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${ie.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${ie.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${ie.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${ie.textMain}; }
            
            .cw-footer-icons { display: flex; flex-direction: row-reverse; padding-left: 8px; }
            .cw-mini-icon { 
                width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;
                color: white; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 1px 2px rgba(0,0,0,0.15); position: relative; margin-left: -8px;
            }
            .cw-mini-icon svg { width: 12px; height: 12px; fill: currentColor; }

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
                font-family: ${ie.font}; font-size: 15px; font-weight: 600; color: ${ie.textMain};
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
                border-color: ${ie.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${ie.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${ie.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${ie.brands.ads.color}; text-decoration: none; font-weight: 600; }
            .cw-info-link:hover { text-decoration: underline; }

            /* FOOTER ICONS (Limpo & Original) */
            .cw-mini-icon { 
                width: 26px; height: 26px; border-radius: 50%; 
                background: #FFFFFF; border: 1px solid #E0E0E0;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                margin-left: -8px; position: relative; z-index: 1;
            }
            .cw-mini-icon svg { width: 14px; height: 14px; } 

            /* INPUTS (Campos de Link) */
            .cw-input-group { margin-bottom: 16px; position: relative; }
            .cw-input-group:last-child { margin-bottom: 0; }

            .cw-input-label {
                display: block; font-size: 11px; font-weight: 700; color: ${ie.textSub};
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
        `,document.head.appendChild(I)}let m=document.createElement("div");m.className="cw-zen-container";let l=document.createElement("div");Object.assign(l.style,{display:"none"});let p=document.createElement("div");p.className="cw-screens-container",l.appendChild(p),m.innerHTML=`
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
    `;let x=m.querySelector(".cw-hero-grid"),f=m.querySelector(".cw-acc-container"),g=m.querySelector(".cw-results-container"),u=m.querySelector(".cw-search-input"),C=m.querySelector(".cw-status-bar"),F=m.querySelector(".cw-status-text"),k=m.querySelector(".cw-footer-icons");r.forEach(([I,O])=>{let N=i(O.name),X=document.createElement("div");X.className="cw-hero-card",X.id=`hero-${I}`,X.style.setProperty("--hero-color",N.color),X.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${je[N.icon]}</div>
                <div class="cw-hero-label">${O.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,X.onclick=$=>{if($.target.closest(".cw-step-btn"))return;let T=a[I]?a[I].count:0;M(I,T>0?-T:1,O)},X.querySelector(".minus").onclick=()=>M(I,-1,O),X.querySelector(".plus").onclick=()=>M(I,1,O),X.dataset.color=N.color,x.appendChild(X)});function P(I,O){let N=i(O.name),X=document.createElement("div");return X.className="cw-task-item",X.dataset.id=I,X.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${N.bg}; color:${N.color}">
                    ${je[N.icon]||je.default}
                </div>
                <div class="cw-task-label">${O.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,X.onclick=$=>{if($.target.closest(".cw-step-btn"))return;let T=a[I]?a[I].count:0;M(I,T>0?-T:1,O)},X.querySelector(".minus").onclick=()=>M(I,-1,O),X.querySelector(".plus").onclick=()=>M(I,1,O),X}Object.entries(s).forEach(([I,O])=>{let N=document.createElement("div");N.className="cw-acc-group";let X=document.createElement("div");X.className="cw-acc-header",X.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${O.brand.color}"></div>
                ${I}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,X.onclick=()=>{f.querySelectorAll(".cw-acc-group.open").forEach(T=>{T!==N&&T.classList.remove("open")}),N.classList.toggle("open")};let $=document.createElement("div");$.className="cw-acc-body",O.tasks.forEach(T=>{let R=P(T.key,T);$.appendChild(R)}),N.appendChild(X),N.appendChild($),f.appendChild(N)});function M(I,O,N){a[I]||(a[I]={count:0,data:N,brand:i(N.name)}),a[I].count+=O,a[I].count<=0&&delete a[I],J(),ee(),t&&t()}function J(){let I=o.tagSupportUsed;r.forEach(([T])=>{let R=x.querySelector(`#hero-${T}`);if(!R)return;let q=a[T];q?(R.classList.add("active"),R.querySelector(".cw-step-val").textContent=q.count,R.querySelector(".cw-step-val").style.color=R.dataset.color,I&&(T==="ads_conversion_tracking"||T==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(T)?R.classList.add("ts-success"):R.classList.remove("ts-success")):(R.classList.remove("active"),R.classList.remove("ts-success"))}),m.querySelectorAll(".cw-task-item").forEach(T=>{let R=T.dataset.id,q=a[R];q?(T.classList.add("selected"),T.querySelector(".cw-step-val").textContent=q.count,I&&(R==="ads_conversion_tracking"||R==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(R)?T.classList.add("ts-success"):T.classList.remove("ts-success")):(T.classList.remove("selected"),T.classList.remove("ts-success"))});let N=Object.keys(a),X=0,$=[];if(N.forEach(T=>{let R=a[T];X+=R.count;for(let q=0;q<R.count;q++)$.length<6&&$.push(R.brand)}),X>0){C.classList.add("visible");let T=X>1?"A\xE7\xF5es":"A\xE7\xE3o",R=X>1?"definidas":"definida";F.textContent=`${X} ${T} ${R}`,k.innerHTML="",$.forEach(q=>{let b=document.createElement("div");b.className="cw-mini-icon",b.innerHTML=je[q.icon]||je.default;let c=b.querySelector("svg");c&&(c.style.width="14px",c.style.height="14px"),k.appendChild(b)})}else C.classList.remove("visible")}u.addEventListener("input",I=>{let O=I.target.value.toLowerCase();if(O.length>0){f.style.display="none",g.style.display="block",g.innerHTML="";let N=!1;Object.entries(Ae).forEach(([X,$])=>{if($.name.toLowerCase().includes(O)){N=!0;let T=P(X,$);a[X]&&(T.classList.add("selected"),T.querySelector(".cw-step-val").textContent=a[X].count),g.appendChild(T)}}),N||(g.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else f.style.display="block",g.style.display="none"});function ee(){p.innerHTML="";let I=Object.keys(a),O=!1;if(I.length===0){p.innerHTML=`<div class="cw-empty-state">${e("selecione_tarefas")}</div>`,l.style.display="none";return}let N=o.tagSupportUsed,X=document.createElement("div");X.className="cw-info-banner",X.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,p.appendChild(X),I.forEach($=>{let T=a[$].data,R=a[$].count,q=a[$].brand,c=N&&($==="ads_conversion_tracking"||$==="ads_enhanced_conversions")&&!o.forcedScreenshots.has($),w=o.screenshotMode||"implementation",y=T.screenshots?.[w]||[];if(y.length>0||c){O=!0;for(let E=1;E<=R;E++){let v=document.createElement("div");v.className="cw-screen-card",c&&v.classList.add("ts-success"),v.style.setProperty("--brand-color",q.color),v.style.setProperty("--brand-bg",q.bg),v.style.setProperty("--brand-shadow",q.color+"40");let L=document.createElement("div");L.className="cw-card-header";let S=document.createElement("div");S.className="cw-card-icon",S.innerHTML=je[q.icon]||je.default;let V=document.createElement("div");V.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let _=document.createElement("input");_.className="cw-card-title-input",_.id=`name-${$}-${E}`,_.value=`${T.name}${R>1?" #"+E:""}`,_.title="Clique para renomear esta task";let B=document.createElement("span");if(B.className="cw-edit-hint",B.innerHTML="\u270E Renomear",V.appendChild(_),V.appendChild(B),L.appendChild(S),L.appendChild(V),v.appendChild(L),c){let G=document.createElement("div");G.className="cw-ts-disclaimer-box",G.innerHTML=`
                <span>${e("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${e("incluir_mesmo_assim")}</button>
            `,G.querySelector("button").onclick=()=>{o.toggleForcedScreenshot($,!0)},v.appendChild(G)}else y.forEach((G,A)=>{let K=document.createElement("div");K.className="cw-input-group";let ae=document.createElement("label");ae.className="cw-input-label",ae.textContent=G;let oe=document.createElement("input");oe.className="cw-input-field",oe.id=`screen-${$}-${E}-${A}`,oe.placeholder="Cole o link aqui...",oe.setAttribute("autocomplete","off"),oe.addEventListener("input",()=>{oe.value.trim().length>5?oe.classList.add("filled"):oe.classList.remove("filled")});let h=document.createElement("div");h.className="cw-input-check",h.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',K.appendChild(ae),K.appendChild(oe),K.appendChild(h),v.appendChild(K)});p.appendChild(v)}}}),l.style.display=O?"block":"none"}return{selectionElement:m,screenshotsElement:l,updateSubStatus:()=>ee(),getCheckedElements:()=>Object.keys(a).map(I=>({value:I,count:a[I].count})),setTaskCount:(I,O)=>{a[I]&&delete a[I],O>0&&Ae[I]&&M(I,O,Ae[I])},toggleTask:(I,O=!0)=>{let N=a[I];O&&!N?M(I,1,Ae[I]):!O&&N&&M(I,-N.count,Ae[I])},setLanguage:I=>{e=I;let O=m.querySelector(".js-hero-title");O&&(O.textContent=e("acesso_rapido"));let N=m.querySelector(".cw-search-input");N&&(N.placeholder=e("buscar_catalogo")),ee()},reset:()=>{for(let I in a)delete a[I];u.value="",f.style.display="block",g.style.display="none",J(),ee()}}}var aa={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},na={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},ia={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},ra={display:"flex",gap:"20px",marginBottom:"12px"};function lo(t){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,aa);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=t("utilizou_tag_support"),Object.assign(o.style,Tt,{marginTop:"0"});let a=document.createElement("div");Object.assign(a.style,ra);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,Ot);let i=document.createElement("label");i.textContent="Sim";let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(n),r.appendChild(i);let s=document.createElement("input");s.type="radio",s.name="ts_usage_mod",s.value="N\xE3o",s.checked=!0,Object.assign(s.style,Ot);let d=document.createElement("label");d.textContent="N\xE3o";let m=document.createElement("div");Object.assign(m.style,{display:"flex",alignItems:"center"}),m.appendChild(s),m.appendChild(d),a.appendChild(r),a.appendChild(m);let l=document.createElement("div");l.style.display="block";let p=document.createElement("label");p.className="js-ts-reason-label",p.textContent=t("motivo_ts"),Object.assign(p.style,Tt,{fontSize:"12px"});let x=document.createElement("input");x.type="text",Object.assign(x.style,ia);let f=document.createElement("div");f.className="js-ts-warning",f.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(f.style,na),l.appendChild(p),l.appendChild(x),l.appendChild(f),e.appendChild(o),e.appendChild(a),e.appendChild(l),n.onchange=()=>{l.style.display="none",Promise.resolve().then(()=>(Qe(),st)).then(k=>k.notesState.setTagSupportUsed(!0))},s.onchange=()=>{l.style.display="block",Promise.resolve().then(()=>(Qe(),st)).then(k=>k.notesState.setTagSupportUsed(!1))};function g(k,P){if(e.style.display="none",!k||!P||P.length===0)return;P.some(J=>J==="ads_conversion_tracking"||J==="ads_enhanced_conversions")?e.style.display="block":(F(),Promise.resolve().then(()=>(Qe(),st)).then(J=>J.notesState.setTagSupportUsed(!1)))}function u(){if(e.style.display==="none")return"";let k=`<br><b>Utilizou Tag Support?</b> ${n.checked?"\u2705 Sim":"\u274C N\xE3o"}`;return s.checked&&x.value.trim()!==""&&(k+=`<br><b>Motivo:</b> ${x.value}`),k+="<br>",k}function C(k){t=k,o.textContent=t("utilizou_tag_support"),p.textContent=t("motivo_ts"),f.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`}function F(){e.style.display="none",s.checked=!0,n.checked=!1,l.style.display="block",x.value=""}return{element:e,updateVisibility:g,getOutput:u,setLanguage:C,reset:F}}var qt="cw_notes_parking_lot",pt="cw_notes_emergency_save";var be={getAll:()=>{try{return JSON.parse(localStorage.getItem(qt)||"[]")}catch{return[]}},save:t=>{let e=be.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...t};return e.unshift(o),e.length>5&&e.pop(),localStorage.setItem(qt,JSON.stringify(e)),o},delete:t=>{let e=be.getAll();return e=e.filter(o=>o.id!==t),localStorage.setItem(qt,JSON.stringify(e)),e},getCount:()=>be.getAll().length,saveEmergency:t=>{let e={timestamp:Date.now(),data:t};localStorage.setItem(pt,JSON.stringify(e))},getEmergency:()=>{try{let t=localStorage.getItem(pt);if(!t)return null;let e=JSON.parse(t);return Date.now()-e.timestamp>432e5?(localStorage.removeItem(pt),null):!e.data||!e.data.subStatus?null:e.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(pt)}};var ut=["lucaste","ricardogi"];var re={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},mt=t=>new Promise(e=>setTimeout(e,t));function gt(t){let e=document.getElementById("cw-btn-notes");if(!e)return;let o=e.querySelector(".cw-dot-dirty");t?o||(o=document.createElement("div"),o.className="cw-dot-dirty",e.appendChild(o)):o&&o.remove()}function co(t){let e="cw-command-center-style";if(!document.getElementById(e)){let u=document.createElement("style");u.id=e,u.innerHTML=`
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            .cw-focus-backdrop {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
                z-index: 2147483646; opacity: 0; pointer-events: none;
                transition: opacity 0.4s ease;
            }
            .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

            /* --- PILL PRINCIPAL --- */
            .cw-pill {
                position: fixed; bottom: 10%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 14px;
                padding: 18px 8px;
                
                background: ${re.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${re.glassBorder}; border-radius: 50px;
                box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 2147483647;
                
                opacity: 0; 
                width: 56px;
                
                
                overflow: visible;

                /* ABRIR: A p\xEDlula expande PRIMEIRO */
                transition: 
                    width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    max-height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                    padding 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    opacity 0.3s ease,
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
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

                /* FECHAR: A p\xEDlula colapsa DEPOIS dos \xEDcones (delay 0.3s) */
                transition: 
                    width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s,
                    max-height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s,
                    padding 0.5s ease 0.3s,
                    border-radius 0.5s ease 0.3s,
                    opacity 0.3s ease 0s,
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s !important;
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
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .cw-pill.collapsed .cw-main-logo { 
                opacity: 1; 
                transform: rotate(0) scale(1);
                /* Aparece depois que a p\xEDlula colapsou */
                transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s;
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
                /* Aparece depois que a p\xEDlula expandiu */
                transition:
                    opacity 0.3s ease 0.4s,
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s,
                    visibility 0s linear 0.4s,
                    filter 0.3s ease 0.4s;
            }
            .cw-pill.collapsed > *:not(.cw-main-logo) {
                opacity: 0; pointer-events: none; visibility: hidden;
                transform: scale(0.5); filter: blur(8px);
                /* Desaparece imediatamente */
                transition:
                    opacity 0.2s ease 0s,
                    transform 0.2s ease 0s,
                    filter 0.2s ease 0s,
                    visibility 0s linear 0.2s;
            }

            /* --- CASCATAS DE ENTRADA --- */
            .cw-pill:not(.collapsed) > *:nth-child(2) { transition-delay: 0.40s; } /* Grip */
            .cw-pill:not(.collapsed) > *:nth-child(3) { transition-delay: 0.43s; } /* Notes */
            .cw-pill:not(.collapsed) > *:nth-child(4) { transition-delay: 0.46s; } /* Email */
            .cw-pill:not(.collapsed) > *:nth-child(5) { transition-delay: 0.49s; } /* Script */
            .cw-pill:not(.collapsed) > *:nth-child(6) { transition-delay: 0.52s; } /* Links */
            .cw-pill:not(.collapsed) > *:nth-child(7) { transition-delay: 0.55s; } /* Library */
            .cw-pill:not(.collapsed) > *:nth-child(8) { transition-delay: 0.58s; } /* Timezone */
            .cw-pill:not(.collapsed) > *:nth-child(9) { transition-delay: 0.61s; } /* Configs */
            .cw-pill:not(.collapsed) > *:nth-child(10) { transition-delay: 0.64s; } /* Sep */
            .cw-pill:not(.collapsed) > *:nth-child(11) { transition-delay: 0.67s; } /* Broadcast */

            /* --- ESTILOS DOS BOT\xD5ES --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${re.iconIdle};
                flex-shrink: 0;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn:hover {
                background: ${re.glassHighlight};
                color: ${re.iconActive};
                transform: scale(1.18) translateY(-2px) !important;
            }

            .cw-btn.notes.active { color: ${re.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${re.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${re.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${re.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${re.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${re.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${re.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${re.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${re.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${re.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${re.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${re.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${re.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${re.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${re.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${re.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${re.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

            .cw-btn::before {
                content: ''; position: absolute; bottom: 2px; left: 50%; width: 4px; height: 4px; border-radius: 50%;
                background-color: currentColor; box-shadow: 0 0 6px currentColor;
                transform: translateX(-50%) scale(0); opacity: 0; visibility: hidden;
                transition: transform 0.3s, opacity 0.2s; pointer-events: none;
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
            .cw-pill.side-right .cw-btn::after { right: 55px; transform-origin: right center; }
            .cw-pill.side-left .cw-btn::after { left: 55px; transform-origin: left center; }

            .cw-badge { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #d93025; border-radius: 50%; border: 1px solid #fff; pointer-events: none; box-shadow: 0 1px 2px rgba(0,0,0,0.2); z-index: 10; animation: popIn 0.3s; }
            @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

            .cw-sep { width: 20px; height: 1px; background: rgba(255,255,255,0.2); margin: 4px 0; }
            .cw-sep.visible { opacity: 1; }
            .cw-pill.collapsed .cw-sep { opacity: 0; transition: opacity 0.1s ease 0s; }

            .cw-grip { width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; cursor: grab; margin-bottom: 2px; }
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${re.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-pill.dragging .cw-grip-bar { background-color: ${re.blue}; width: 16px; opacity: 1; }

            .cw-pill.dragging {
                box-shadow:
                    0 8px 32px rgba(0,0,0,0.3),
                    0 0 20px rgba(138, 180, 248, 0.4);
                filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
                transform: scale(1.02) !important;
                transition: box-shadow 0.2s ease, filter 0.2s ease, transform 0.2s ease !important;
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
                animation: fadeIn 0.4s ease forwards 0.1s; 
                position: relative; 
            }
            
            .cw-center-dots { display: flex; gap: 8px; margin-bottom: 4px; }
            .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
            .cw-center-dots span:nth-child(1) { background-color: ${re.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${re.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${re.green}; }
            
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
                animation: textSlideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; 
                animation-delay: 0.2s; 
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
                transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: none;
                z-index: 20;
                white-space: nowrap;
            }
            .cw-pill:not(.collapsed) .cw-admin-badge.visible {
                transform: translateX(-50%) scale(1);
            }
            
            .cw-center-success { display: none; color: ${re.green}; margin-bottom: 10px; }
            .cw-center-success svg { width: 48px; height: 48px; }
            .cw-center-success.show { display: block; animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            
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
        `,document.head.appendChild(u)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>'},a=document.createElement("div");a.id="cw-floating-trigger",a.className="cw-pill side-right collapsed",a.innerHTML=`
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
    `;let n=document.createElement("div");n.className="cw-focus-backdrop",document.body.appendChild(n),document.body.appendChild(a);let i=(u,C)=>{H.playClick(),a.querySelector(`.${u}`).classList.toggle("active"),C()};if(a.querySelector(".notes").onclick=u=>{u.stopPropagation(),i("notes",t.toggleNotes)},a.querySelector(".bauform").onclick=u=>{u.stopPropagation(),i("bauform",t.toggleBAUForm)},a.querySelector(".email").onclick=u=>{u.stopPropagation(),i("email",t.toggleEmail)},a.querySelector(".script").onclick=u=>{u.stopPropagation(),i("script",t.toggleScript)},a.querySelector(".links").onclick=u=>{u.stopPropagation(),i("links",t.toggleLinks)},a.querySelector(".library").onclick=u=>{u.stopPropagation(),i("library",t.toggleLibrary)},a.querySelector(".timezone").onclick=u=>{u.stopPropagation(),i("timezone",t.toggleTimezone)},a.querySelector(".configs").onclick=u=>{u.stopPropagation(),i("configs",t.toggleConfigs)},a.querySelector(".broadcast").onclick=u=>{u.stopPropagation(),i("broadcast",()=>{let C=u.currentTarget.querySelector(".cw-badge");C&&C.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},a.querySelectorAll(".cw-btn").forEach(u=>{u.addEventListener("mouseenter",()=>H.playHover())}),t.broadcastControl&&t.broadcastControl.hasUnread){let u=document.createElement("div");u.className="cw-badge",a.querySelector(".broadcast").appendChild(u)}let r=null;a.onmouseleave=()=>{a.querySelector(".cw-btn.active")||a.classList.contains("processing-center")||(r=setTimeout(()=>{a.classList.add("collapsed")},3e3))},a.onmouseenter=()=>{r&&clearTimeout(r)},(async function(){let C=()=>{let k=he();if(k){let P=k.split("@")[0].toLowerCase();if(ut.includes(P)){let M=a.querySelector("#cw-admin-tag");M&&M.classList.add("visible")}}else setTimeout(C,2e3)};C(),await mt(2800),a.classList.add("docked"),await mt(300);let F=a.querySelectorAll(".cw-btn");a.querySelectorAll(".cw-sep").forEach(k=>k.classList.add("visible"));for(let k=0;k<F.length;k++)F[k].classList.add("popped"),await mt(90);await mt(200),a.classList.add("system-check")})();let s=!1,d,m,l,p,x=3;a.onmousedown=u=>{if(u.target.closest("button"))return;u.preventDefault(),d=u.clientX,m=u.clientY;let C=a.getBoundingClientRect();l=C.left,p=C.top,document.addEventListener("mousemove",f),document.addEventListener("mouseup",g)};function f(u){let C=u.clientX-d,F=u.clientY-m;!s&&Math.sqrt(C*C+F*F)>x&&(s=!0,a.classList.add("dragging"),a.style.transition="none",r&&clearTimeout(r)),s&&(a.style.left=`${l+C}px`,a.style.top=`${p+F}px`,a.style.right="auto",a.style.bottom="auto",a.style.transform="none")}function g(u){if(document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",g),s){s=!1,a.classList.remove("dragging");let C=window.innerWidth,F=window.innerHeight,k=a.getBoundingClientRect(),P=k.left+k.width/2,M;P<C/2?(M=24,a.classList.remove("side-right"),a.classList.add("side-left")):(M=C-k.width-24,a.classList.remove("side-left"),a.classList.add("side-right"));let J=Math.max(24,Math.min(k.top,F-k.height-24));setTimeout(()=>{a.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),a.style.left=`${M}px`,a.style.top=`${J}px`,a.style.bottom="auto",a.style.transform=""},10),setTimeout(()=>{a.style.transition="",a.style.removeProperty("transition")},700)}else{let C=a.querySelector(".cw-btn.active"),F=u.target.closest("button");if(a.classList.contains("collapsed")){let k=a.getBoundingClientRect(),P=window.innerHeight,M=k.top>P/2;if(a.style.setProperty("transition","none","important"),M){let J=P-k.bottom;a.style.top="auto",a.style.bottom=`${J}px`}else a.style.bottom="auto",a.style.top=`${k.top}px`;a.offsetWidth,a.style.removeProperty("transition"),a.classList.remove("collapsed"),H.playGenieOpen()}else!C&&!F&&(a.classList.add("collapsed"),H.playGenieOpen());F&&(F.style.transform="scale(0.9)",setTimeout(()=>F.style.transform="",150))}}}function tt(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${de.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let a=document.createElement("div");a.className="cw-abort-btn",a.textContent="Cancelar",a.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,Z("Cancelado!",{duration:3e3}),o.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},o.appendChild(a),t.appendChild(o);let n=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(o))return;let r=Date.now()-n,s=Math.max(0,2e3-r);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(o))return;let d=o.querySelector(".cw-center-dots"),m=o.querySelector(".cw-center-text"),l=o.querySelector(".cw-center-success"),p=o.querySelector(".cw-abort-btn");d&&(d.style.display="none"),m&&(m.style.display="none"),p&&(p.style.display="none"),l&&l.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{o.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},s)}}function po(t){let{onSaveCurrent:e,onLoadDraft:o,t:a}=t,n=document.createElement("button");n.className="js-btn-park",n.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${a("guardar")}</span>
    `,n.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${pe.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${z.surface};
        color: ${z.textSub};
        border: 1px solid ${z.border};
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ${se};
        box-shadow: ${ze.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,n.onmouseenter=()=>{n.style.backgroundColor="#F8F9FA",n.style.borderColor="#202124",n.style.color="#202124",n.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",n.style.transform="translateY(-1px)"},n.onmouseleave=()=>{n.style.backgroundColor="#FFFFFF",n.style.borderColor="#DADCE0",n.style.color="#5F6368",n.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",n.style.transform="translateY(0)"},n.onmousedown=()=>n.style.transform="scale(0.96)",n.onmouseup=()=>n.style.transform="scale(1) translateY(-1px)",n.onclick=async()=>{if(await ye("Deseja guardar o rascunho atual e limpar os campos?"))try{let u=await e();u?(be.save(u),f(),s(),H.playSuccess(),Z("Rascunho salvo com sucesso!")):Z("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(u){console.error("Erro ao salvar rascunho:",u),Z("Erro ao salvar.",{error:!0})}};let i=document.createElement("div");i.title="Meus Rascunhos",i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let r=document.createElement("div");r.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(r),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=g=>{g.stopPropagation(),x()};function s(){let g=be.getCount();gt(g>0),g>0?(r.style.display="block",r.textContent=g,r.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):r.style.display="none"}let d=document.createElement("div");d.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${z.surface}; z-index: 100;
        border-radius: ${pe.large} ${pe.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${se};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let m=document.createElement("div");m.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",m.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${a("rascunhos_salvos")}</span>`;let l=document.createElement("button");l.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',l.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",l.onmouseenter=()=>l.style.background="#F1F3F4",l.onmouseleave=()=>l.style.background="transparent",l.onclick=()=>x(!1),m.appendChild(l);let p=document.createElement("div");p.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",d.appendChild(m),d.appendChild(p);function x(g){let u=d.style.transform==="translateY(0%)";(g!==void 0?g:!u)?(f(),d.style.transform="translateY(0%)"):d.style.transform="translateY(110%)"}function f(){let g=be.getAll();if(p.innerHTML="",g.length===0){p.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${z.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${a("nenhum_rascunho")}</div>
                </div>`;return}g.forEach(u=>{let C=document.createElement("div");C.style.cssText=`
                background: ${z.surface}; padding: 20px; border-radius: ${pe.large};
                border: 1.5px solid ${z.bgInput}; box-shadow: ${ze.subtle};
                position: relative; transition: all 0.3s ${se};
            `;let k=new Date(u.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),P="";u.summaryTags&&u.summaryTags.length>0&&(P=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${u.summaryTags.slice(0,3).join(", ")+(u.summaryTags.length>3?"...":"")}</div>`),C.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${u.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${k}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${u.cid||"---"}</span>
                    <span style="display:block; color:${u.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${u.subStatus||u.status||"Sem Status"}</span>
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
            `;let M=C.querySelector(".cw-resume-btn");M.onclick=async()=>{await ye("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(u),be.delete(u.id),f(),s(),x(!1),H.playSwoosh(),Z("Rascunho carregado."))};let J=C.querySelector(".cw-del-btn");J.onclick=async()=>{await ye("Excluir este rascunho?",{danger:!0})&&(be.delete(u.id),f(),s())},p.appendChild(C)})}return s(),{parkButton:n,historyBtnWrapper:i,drawer:d}}var uo=t=>new Promise(e=>setTimeout(e,t));function bt(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function ot(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let a=window.getSelection();a.removeAllRanges(),a.addRange(o);try{document.execCommand("copy")}catch{Z("Falha ao copiar",{error:!0})}a.removeAllRanges(),document.body.removeChild(e)}function ft(t){["input","change","keydown","keyup"].forEach(o=>{let a=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(a)})}function mo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function xt(){console.log("Iniciando processo de Nova Nota...");let t=mo(),e=t.length,a=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(a){let r=a.closest("material-fab")||a.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),bt(r)):bt(a)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let s=r.querySelector(".trigger");s?(s.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),bt(s)):r.click(),await uo(800);let m=Array.from(document.querySelectorAll("i.material-icons-extended")).find(l=>l.innerText.trim()==="description");m&&bt(m)}}let n=null,i=0;for(;!n&&i<20;){await uo(300);let r=mo();if(r.length>e)n=r.find(s=>!t.includes(s)),n||(n=r[r.length-1]);else if(i>10){let s=r.filter(d=>d.offsetParent!==null);s.length>0&&(n=s[s.length-1])}i++}return n}function go(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let a=document.createElement("div");a.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(a),e.appendChild(o),o.addEventListener("scroll",()=>{a.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let n={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function r({id:P,label:M,type:J="text",placeholder:ee="",required:I=!1,parent:O=o}){let N=document.createElement("div");N.style.cssText=n.inputWrapper;let X=document.createElement("label");X.style.cssText=n.label,X.innerHTML=`${M} ${I?'<span style="color:#D93025">*</span>':""}`;let $;return J==="textarea"?($=document.createElement("textarea"),$.style.cssText=n.input+n.textarea):($=document.createElement("input"),$.type=J,$.style.cssText=n.input),$.id=P,$.placeholder=ee,$.addEventListener("focus",()=>{$.style.borderColor="#1a73e8",$.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),$.addEventListener("blur",()=>{$.style.borderColor="#DADCE0",$.style.boxShadow="none",I&&$.value.trim()!==""&&($.style.backgroundColor="#FFF")}),i[P]={input:$,wrapper:N,required:I},N.appendChild(X),N.appendChild($),O.appendChild(N),N}function s({id:P,label:M,options:J=["Yes","No"],defaultValue:ee="No",onChange:I=null}){let O=document.createElement("div");O.style.cssText=n.inputWrapper;let N=document.createElement("label");N.style.cssText=n.label,N.textContent=M,O.appendChild(N);let X=document.createElement("div");X.style.cssText=n.radioGroup;let $=document.createElement("input");return $.type="hidden",$.id=P,$.value=ee,O.appendChild($),J.forEach(T=>{let R=document.createElement("div");R.textContent=T,R.style.cssText=n.radioLabel,T===ee&&(R.style.cssText+=n.radioActive),R.onclick=()=>{Array.from(X.children).forEach(b=>b.style.cssText=n.radioLabel),R.style.cssText+=n.radioActive,$.value=T,I&&I(T)},X.appendChild(R)}),i[P]={input:$,wrapper:O,required:!1},O.appendChild(X),o.appendChild(O),O}let d=document.createElement("div");d.style.cssText=n.banner,d.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(d);let m=document.createElement("div");m.style.marginBottom="24px";let l=document.createElement("button");l.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",l.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",l.onmouseover=()=>l.style.background="#E1EFFF",l.onmouseout=()=>l.style.background="#F0F7FF",m.appendChild(l),o.appendChild(m);let p=document.createElement("div");p.style.cssText=n.section,p.innerHTML=`<div style="${n.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(p),r({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:p}),r({id:"ga4",label:"GA4 Property ID",parent:p}),r({id:"gtm",label:"GTM Container ID",parent:p});let x=document.createElement("div");x.style.cssText=n.hiddenField,p.appendChild(x),s({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:P=>{P==="Yes"?x.style.cssText=n.visibleField+"margin-bottom:14px;":(x.style.cssText=n.hiddenField,i.accessEmail.input.value="")}}),r({id:"accessEmail",label:"User Access Email",parent:x}),s({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let f=document.createElement("div");f.style.cssText=n.section,f.innerHTML=`<div style="${n.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(f),r({id:"name",label:"Advertiser Name",required:!0,parent:f}),r({id:"url",label:"Website URL",parent:f}),r({id:"phone",label:"Phone Number",parent:f}),r({id:"email",label:"Contact Email",parent:f}),r({id:"callback",label:"Preferred Callback Time (Timezone)",parent:f}),r({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:f}),r({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:f}),r({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:f});let g=document.createElement("div");g.style.cssText=n.section,g.innerHTML=`<div style="${n.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(g),r({id:"cc_adv",label:"Advertiser Contact",parent:g}),r({id:"cc_am",label:"Account Manager",parent:g});let u=document.createElement("div");u.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let C=document.createElement("button");C.innerHTML="Voltar",C.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",C.onclick=t;let F=document.createElement("button");F.textContent="Gerar Nota",F.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",u.appendChild(C),u.appendChild(F),e.appendChild(u),l.onclick=async()=>{let P=l.innerHTML;l.innerHTML="\u23F3 Buscando dados...";try{let M=await Se(),J=0,ee=(N,X)=>{let $=i[N];X&&$&&$.input.value===""&&($.input.value=X,$.input.style.backgroundColor="#E6F4EA",$.input.style.borderColor="#34A853",setTimeout(()=>{$.input.style.backgroundColor="#FFF",$.input.style.borderColor="#DADCE0"},1e3),J++)};ee("name",M.advertiserName),ee("url",M.websiteUrl),M.clientEmail&&(ee("email",M.clientEmail),ee("cc_adv",M.clientEmail));let O=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);O&&ee("cid",O[0]),J>0?Z(`${J} campos preenchidos!`):Z("Nenhum dado novo encontrado.")}catch(M){console.error(M),Z("Erro ao ler p\xE1gina.")}finally{l.innerHTML=P}};let k=()=>{let P=!0,M=null;return Object.values(i).forEach(J=>{J.required&&!J.input.value.trim()&&(P=!1,J.input.style.cssText+=n.inputError,J.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),M||(M=J.input))}),M&&M.scrollIntoView({behavior:"smooth",block:"center"}),P};return F.onclick=async()=>{if(!k()){Z("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let P=N=>i[N].input.value||"N/A",M=P("hasAccess"),J=M==="Yes"?P("accessEmail"):"N/A",I=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${P("cid")}
<b>GA4 ID:</b> ${P("ga4")}
<b>GTM ID:</b> ${P("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${M==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${J}
<b>Ghosting Access Available (Y/N):</b> ${P("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${P("name")}
<b>Website:</b> ${P("url")}
<b>Phone Number:</b> ${P("phone")}
<b>Preferred Callback:</b> ${P("callback")}
<b>Email Address:</b> ${P("email")}

<b>Detailed Issue Description:</b>
${P("desc")}

<b>Uncropped screenshots:</b>
${P("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${P("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${P("cc_adv")}
<b>Account Manager:</b> ${P("cc_am")}
`.replace(/\n/g,"<br>");ot(I);let O=await xt();O?(O.innerText.trim()===""&&(O.innerHTML=""),document.execCommand("insertHTML",!1,I),ft(O),Z("Nota gerada e inserida!")):Z("Copiado! Abra uma nota para colar.")},e}var fe=t=>new Promise(e=>setTimeout(e,t));function we(t,e="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,o[e]||o.info)}function qe(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function ht(t,e){if(!t)return;let o=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,a=document.getElementById(o);a&&a.remove();let n=t.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
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
    `;let r=i.querySelector(".cw-close-btn");r.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&r.click()},25e3)}async function yt(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await fe(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await fe(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function _t(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let a=o.offsetParent!==null,n=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return a&&!n&&i});return e&&we("Editor visualmente detectado.","success"),e}async function bo(){we("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="email");if(o&&o.offsetParent!==null){we("Bot\xE3o de email direto encontrado.");let p=o.closest("material-button")||o.closest("material-fab")||o;qe(p),t=!0}else{we("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let p=document.querySelector("material-fab-speed-dial");if(p){let x=p.querySelector(".trigger");if(x){qe(x),await fe(800);let g=Array.from(document.querySelectorAll("i.material-icons-extended")).find(u=>u.innerText.trim()==="email");g&&(qe(g),t=!0)}}}if(!t)return Z("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;we("\u{1F680} FASE 2: Verificando rascunhos...");let a=null,n=0,i=20;for(;n<i;){await fe(250);let p=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(a=Array.from(p).find(x=>x.offsetParent!==null),a){we("\u26A0\uFE0F Rascunho detectado!","warn");break}n++}if(a){we("\u{1F5D1}\uFE0F Descartando..."),qe(a),a.click();let p=null,x=0;for(;x<15;){await fe(300);let f=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(p=Array.from(f).find(g=>g.offsetParent!==null),p)break;x++}p&&(qe(p),Z("Limpando rascunho antigo...",{duration:2e3}),await fe(2500))}we("\u{1F680} FASE 3: Buscando editor final...");let r=0,s=null;for(;r<20&&(s=_t(),!s);)await fe(250),r++;if(!s)return Z("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let d=s.closest('[id="email-body-content-top"]'),l=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(d){if(l){let x=l.closest('[aria-hidden="true"]');x&&x.removeAttribute("aria-hidden"),l.focus(),qe(l)}await fe(300),d.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let p=d.querySelector("#cases-body-field");if(p){let x=document.createRange();x.selectNodeContents(p),x.collapse(!0);let f=window.getSelection();f.removeAllRanges(),f.addRange(x)}return!0}return!1}async function vt(t){if(!t||!await bo())return;let o=await Se();we("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let a=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(a&&(a.click(),await fe(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await yt(i,o.clientEmail),ht(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await yt(i,o.internalEmail),ht(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await fe(500);let n=document.querySelector('material-button[debug-id="canned_response_button"]');if(n){qe(n),await fe(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){qe(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),we("\u23F3 Buscando resultado da Canned Response...","info");let r=null,s=0,d=15e3,m=500;for(;s<d&&(r=document.querySelector("material-select-dropdown-item"),!r);)await fe(m),s+=m;if(r){qe(r),await fe(1500);let l=_t();if(l){let x=Array.from(l.querySelectorAll("span.field")).filter(g=>g.innerText.includes("{Requested Task Type}"));if(x.length>0){let g=x.map(C=>C.closest("tr")).filter(C=>C!==null),u=[...new Set(g)];if(u.length>0){let F=u[0].querySelector('td[width="100%"]');F&&(F.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let k=1;k<u.length;k++)u[k].remove()}}let f=l.innerHTML;o.advertiserName&&f.includes("{%ADVERTISER_NAME%}")&&(f=f.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),f.includes("{%^79285%}")&&(f=f.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),l.innerHTML=f}Z("Canned Response aplicada!")}else we(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),Z(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else Z("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function fo(t){if(we(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await bo())return;let o=await Se(),a=$e();await fe(600);let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await fe(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await yt(s,o.clientEmail),ht(s,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await yt(s,o.internalEmail),ht(s,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await fe(300));let r=_t();if(r){let d=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');d&&(d.focus(),qe(d));let m=new Date;m.setDate(m.getDate()+3);let l=m.getDay();l===6?m.setDate(m.getDate()+2):l===0&&m.setDate(m.getDate()+1);let p=m.toLocaleDateString("pt-BR"),x=t.body;x=x.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),x=x.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),x=x.replace(/\[URL\]/g,o.websiteUrl||"seu site"),x=x.replace(/\[Seu Nome\]/g,a),x=x.replace(/\[MM\/DD\/YYYY\]/g,p),document.execCommand("insertHTML",!1,x),d&&(d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0}))),Z("Email preenchido com sucesso!",{duration:2e3}),we("\u2705 Processo finalizado com sucesso.","success")}else Z("Erro ao focar no editor.",{error:!0})}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function me(t,e,o){let a=document.getElementById(o);if(!e)return;let n=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(a){let l=a.getBoundingClientRect();i.x=l.left+l.width/2,i.y=l.top+l.height/2}let r,s;if(!n)r=window.innerWidth/2,s=window.innerHeight/2;else{let l=e.getBoundingClientRect();r=l.left+l.width/2,s=l.top+l.height/2,r===0&&s===0&&(r=window.innerWidth/2,s=window.innerHeight/2)}let d=i.x-r,m=i.y-s;t?(H.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",n?e.style.transform=`translate(${d}px, ${m}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${d}px), calc(-50% + ${m}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),a&&a.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",n?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof xo=="function"&&xo(e,o)):(H.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",n?e.style.transform=`translate(${d}px, ${m}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${d}px), calc(-50% + ${m}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),a&&a.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof Mt=="function"&&Mt(e))}function xo(t,e){Mt(t);let o=a=>{if(!t.classList.contains("open"))return;let n=t.contains(a.target),i=document.querySelector(".cw-pill"),r=i&&i.contains(a.target);n?(t.classList.remove("idle"),t.style.zIndex="2147483648"):r||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function Mt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}function ho(){let t="v4.0.0",{popup:e,content:o,header:a,animRefs:n,credit:i}=oo(t,X),r=lo(A),s=so(()=>{w(),Y.setActiveTasks(s.getCheckedElements())},A,Y),d=document.createElement("div");d.style.display="none";let m=ro((h,D)=>{y(h,D)});d.appendChild(m);let l=document.createElement("div");l.id="evidence-container",Object.assign(l.style,{display:"none",marginTop:"16px",padding:"16px",background:z.bgInput,border:`1px solid ${z.border}`,borderRadius:pe.medium,boxShadow:ze.subtle});let p=document.createElement("div");p.className="cw-section-title",p.textContent=A("evidencias_contato"),l.appendChild(p);let x={},f=(h,D)=>{let W=document.createElement("div");W.style.marginBottom="12px";let Q=document.createElement("label");Q.textContent=D,Q.setAttribute("for",h),Q.style.cssText=`display: block; font-size: 11px; font-weight: 700; color: ${z.textSub}; margin-bottom: 6px; text-transform: uppercase;`;let j=document.createElement("input");return j.type="text",j.id=h,j.className="cw-input",j.placeholder="https://screenshot.googleplex.com/...",j.style.marginBottom="0",W.appendChild(Q),W.appendChild(j),x[h]=j,W};l.appendChild(f("evidence-l1",A("ligacao_1"))),l.appendChild(f("evidence-l2",A("ligacao_2"))),l.appendChild(f("evidence-msg",A("mensagem_am")));let g=po({onSaveCurrent:async()=>{let h=await _();return V(),h},onLoadDraft:h=>{G(h)},t:h=>A(h)}),u=T(),C=R(),F=document.createElement("div"),k=ae(),P=E(g,A);o.appendChild(u),o.appendChild(C),o.appendChild(k),o.appendChild(d),o.appendChild(F),o.appendChild(l),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none";let M=document.createElement("button");M.id="manual-task-toggle",M.textContent=A("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",M.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${z.primary}; background: ${z.surface}; color: ${z.primary}; border-radius: ${pe.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${se}; text-transform: uppercase; letter-spacing: 0.5px;`,M.onmouseenter=()=>{M.style.background=z.primaryBg},M.onmouseleave=()=>{M.style.background=z.surface},M.onclick=()=>{s.selectionElement.style.display="block",s.screenshotsElement.style.display="block",M.style.display="none"},o.appendChild(M),o.appendChild(s.selectionElement),o.appendChild(r.element),o.appendChild(s.screenshotsElement),o.appendChild(P);let J=document.createElement("div");J.style.display="none",J.style.flexGrow="1",J.style.minHeight="0",J.style.overflow="hidden";let ee=go(()=>$());ee.style.height="100%",J.appendChild(ee),e.insertBefore(J,i);let I=a.lastElementChild;I&&(I.insertBefore(g.historyBtnWrapper,I.firstChild),I.insertBefore(K(),I.firstChild)),e.appendChild(g.drawer);let O=null;Y.subscribe(h=>{oe(h),N(),h.isDirty?(O&&clearTimeout(O),O=setTimeout(async()=>{let D=await _(!0);D.subStatus?be.saveEmergency(D):be.clearEmergency(),h.isDirty=!1},2e3)):O&&(clearTimeout(O),O=null)});function N(){let h=be.getCount()>0,D=!!Y.currentSubStatus;gt(h||D)}function X(){Y.visible=!Y.visible,me(Y.visible,e,"cw-btn-notes")}function $(){Y.isSplitView=!Y.isSplitView,Y.isSplitView?(o.style.display="none",J.style.display="flex",J.style.flexDirection="column",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",J.style.display="none",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function T(){let h=document.createElement("div");if(h.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-idioma" style="font-size: 10px; margin-bottom: 6px;">${A("idioma")}</div>
                    <div class="cw-segmented-control" id="lang-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-lang="pt" class="active" style="z-index:2">PT</button>
                        <button data-lang="es" style="z-index:2">ES</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${A("fluxo")}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${A("caso_portugal")}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${A("nao")}</button>
                        <button data-val="true" style="z-index:2">${A("sim")}</button>
                    </div>
                </div>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let W=document.createElement("style");W.id="cw-segmented-styles",W.innerHTML=`
                .cw-segmented-control {
                    display: flex;
                    background: ${z.bgInput};
                    padding: 3px;
                    border-radius: 100px;
                    gap: 2px;
                    border: 1px solid ${z.border};
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
                    transition: all 0.3s ${se};
                    color: ${z.textSub};
                    position: relative;
                }
                .cw-segmented-control button.active {
                    color: #fff;
                }
                .cw-segmented-control button:hover:not(.active) {
                    background: rgba(0,0,0,0.03);
                    color: ${z.text};
                }
                .cw-segmented-indicator {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    bottom: 3px;
                    width: calc(50% - 4px);
                    background: ${z.primary};
                    border-radius: 100px;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }
            `,document.head.appendChild(W)}let D=(W,Q)=>{let te=h.querySelector(`#${W}`).querySelector(".cw-segmented-indicator");te&&(te.style.transform=`translateX(${Q*100}%) translateX(${Q*2}px)`)};return h.querySelectorAll("#lang-selector button").forEach((W,Q)=>{W.onclick=()=>{Y.setLanguage(W.dataset.lang),h.querySelectorAll("#lang-selector button").forEach(j=>j.classList.remove("active")),W.classList.add("active"),D("lang-selector",Q),H.playHover(),Y.currentSubStatus&&c(Y.currentSubStatus)}}),h.querySelectorAll("#type-selector button").forEach((W,Q)=>{W.onclick=()=>{Y.setCaseType(W.dataset.type),h.querySelectorAll("#type-selector button").forEach(j=>j.classList.remove("active")),W.classList.add("active"),D("type-selector",Q),H.playHover(),Y.currentSubStatus&&c(Y.currentSubStatus)}}),h.querySelectorAll("#portugal-selector button").forEach((W,Q)=>{W.onclick=()=>{Y.setPortugalCase(W.dataset.val==="true"),h.querySelectorAll("#portugal-selector button").forEach(j=>j.classList.remove("active")),W.classList.add("active"),D("portugal-selector",Q),H.playHover(),Y.currentSubStatus&&c(Y.currentSubStatus)}}),h}function R(){let h=document.createElement("div");h.className="cw-status-section",h.style.cssText="display: flex; flex-direction: column; gap: 8px;",h.innerHTML=`
            <div class="cw-section-title js-label-status" style="margin-top: 8px;">${A("status_principal")}</div>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${A("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <div class="cw-section-title js-label-substatus" style="margin-top: 8px;">${A("substatus")}</div>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${A("select_substatus")}</option>
            </select>
        `;let D=h.querySelector("#main-status-select"),W=h.querySelector("#sub-status-select");return D.onchange=()=>{Y.setStatus(D.value),b(D.value,W),Y.setSubStatus(""),c("")},W.onchange=()=>{Y.setSubStatus(W.value),c(W.value)},h}function q(){return l.style.display==="none"?null:{l1:x["evidence-l1"]?.value.trim()||"",l2:x["evidence-l2"]?.value.trim()||"",msg:x["evidence-msg"]?.value.trim()||""}}function b(h,D){if(D.innerHTML=`<option value="">${A("select_substatus")}</option>`,!h){D.disabled=!0;return}for(let W in Ie)if(Ie[W].status===h){let Q=document.createElement("option");Q.value=W,Q.textContent=Ie[W].name,D.appendChild(Q)}D.disabled=!1}function c(h){let D=Ie[h],W=h==="NI_Attempted_Contact"||D&&D.name&&D.name.toLowerCase().includes("attempted contact");if(m.render&&m.render(h,Y.currentCaseType),!h){l.style.display="none",x["evidence-l1"]&&(x["evidence-l1"].value=""),x["evidence-l2"]&&(x["evidence-l2"].value=""),x["evidence-msg"]&&(x["evidence-msg"].value=""),d.style.display="none",F.style.display="none";let ce=document.getElementById("manual-task-toggle");ce&&(ce.style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",k.style.display="flex",k.style.opacity="1",P.style.display="none";return}W?l.style.display="block":(l.style.display="none",x["evidence-l1"]&&(x["evidence-l1"].value=""),x["evidence-l2"]&&(x["evidence-l2"].value=""),x["evidence-msg"]&&(x["evidence-msg"].value="")),k.style.opacity="0",setTimeout(()=>{Y.currentSubStatus&&(k.style.display="none")},400),P.style.display="grid",D&&D.templateFields&&Y.setActiveFields(D.templateFields),S(),Lt(h,F,Y),F.style.display="block",d.style.display="block";let Q=h.startsWith("SO_"),j=h==="NI_Awaiting_Validation",te=document.getElementById("manual-task-toggle");Q||j?(s.selectionElement.style.display="block",te.style.display="none"):(s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",te.style.display="block");let U=h==="SO_Education_Only"?"education":"implementation";Y.setScreenshotMode(U),Y.currentCaseType==="lm"?Y.toggleFieldExclusion("field-ON_CALL",!0):Y.toggleFieldExclusion("field-ON_CALL",!1),s.updateSubStatus(h),w();let ne=document.getElementById("email-automation-toggle-row");ne&&(ne.style.display=Ye[h]?"flex":"none")}function w(){let h=s.getCheckedElements().map(D=>D.value);r.updateVisibility(Y.currentSubStatus,h)}function y(h,D){let W=ct[h];if(W){for(let Q in W)if(Q==="linkedTask")s.toggleTask(W.linkedTask,D);else if(Q==="activeTasks")W.activeTasks.forEach(j=>{D?s.setTaskCount(j.value,j.count):s.setTaskCount(j.value,0)});else if(Q.startsWith("field-")){let j=Q,te=W[Q],U=document.getElementById(j);if(U){let ne=Xe.includes(j.replace("field-",""));if(D)if(ne){let ce=U.value.trim();ce.includes(te.trim())||(U.value=ce?ce+`
`+te.trim():te.trim())}else U.value=te;else if(ne){let ce=U.value.trim(),Te=te.trim();ce.includes(Te)&&(U.value=ce.replace(Te,"").trim().replace(/\n{3,}/g,`

`))}else U.value.trim()===te.trim()&&(U.value="");Y.updateField(j,U.value),U.dispatchEvent(new Event("input"))}}}}function E(h,D){let W=document.createElement("div");if(W.className="cw-actions-section",W.style.cssText=`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${z.bgInput};
            border-radius: 12px;
            border: 1px solid ${z.border};
        `,!document.getElementById("cw-actions-hover-styles")){let ce=document.createElement("style");ce.id="cw-actions-hover-styles",ce.innerHTML=`
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
                    border-color: ${z.primary} !important;
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
                    color: ${z.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.05) !important;
                    transform: translateY(-1px);
                }
            `,document.head.appendChild(ce)}let Q=document.createElement("div");Q.id="email-automation-toggle-row",Q.style.cssText="grid-column: span 2; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",Q.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${z.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${z.primary};">
                <span class="js-label-email-toggle">${D("preencher_email_automaticamente")}</span>
            </label>
        `;let j=h.parkButton;j.classList.add("js-btn-park"),j.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let te=document.createElement("button");te.className="cw-btn-secondary js-btn-reset",te.textContent=D("limpar"),te.style.cssText=`width: 100%; height: 34px; background: ${z.surface}; color: ${z.textSub}; border: 1px solid ${z.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,te.onclick=()=>V();let U=document.createElement("button");U.className="cw-btn-secondary js-btn-copy",U.textContent=D("copiar"),U.style.cssText=`width: 100%; height: 34px; background: ${z.surface}; color: ${z.primary}; border: 1px solid ${z.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,U.onclick=()=>v();let ne=document.createElement("button");return ne.className="cw-btn-primary js-btn-generate",ne.textContent=D("preencher"),ne.style.cssText=`width: 100%; height: 38px; background: ${z.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: span 2; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,ne.onclick=()=>L(),W.appendChild(Q),W.appendChild(j),W.appendChild(te),W.appendChild(U),W.appendChild(ne),W}async function v(){if(!Y.currentSubStatus){Z(A("select_substatus"),{error:!0});return}let h=It(Y,s,r,q());h?(ot(h),Z(A("copiado_sucesso")),H.playClick()):Z(A("select_substatus"),{error:!0})}async function L(){if(!Y.currentSubStatus){Z(A("select_substatus"),{error:!0});return}let h=It(Y,s,r,q());ot(h),X();let D=tt(),W=await xt();if(W){W.focus(),document.execCommand("insertHTML",!1,h),ft(W);let Q=document.getElementById("email-automation-checkbox");(!Q||Q.checked)&&Y.currentSubStatus&&Ye[Y.currentSubStatus]&&await vt(Ye[Y.currentSubStatus]),Z(A("inserido_copiado")),H.playSuccess(),V()}D()}function S(){if(Y.currentSubStatus){if(Y.currentCaseType==="lm")Y.removeField("ON_CALL");else{let h=Ie[Y.currentSubStatus];h&&h.templateFields.includes("ON_CALL")&&Y.addFieldAt("ON_CALL",1)}Y.isPortugalCase?(Y.addFieldAt("CASO_PORTUGAL",1),Y.addFieldAt("CONSENTIU_GRAVACAO",2)):(Y.removeField("CASO_PORTUGAL"),Y.removeField("CONSENTIU_GRAVACAO"))}}function V(){Y.reset(),s.reset(),r.reset(),N(),be.clearEmergency(),o.querySelectorAll("select").forEach(D=>D.value=""),o.querySelector("#sub-status-select").disabled=!0;let h=document.getElementById("email-automation-toggle-row");h&&(h.style.display="none"),F.innerHTML="",d.style.display="none",k.style.display="flex",k.style.opacity="1",P.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",l.style.display="none",x["evidence-l1"]&&(x["evidence-l1"].value=""),x["evidence-l2"]&&(x["evidence-l2"].value=""),x["evidence-msg"]&&(x["evidence-msg"].value="")}async function _(h=!1){let D={};F.querySelectorAll("input, textarea, select").forEach(U=>{(U.id.startsWith("field-")||U.id==="consent-select")&&(D[U.id]=U.value)});let W="Cliente",Q="---";if(!h)try{let U=await Se();W=U.advertiserName,Q=U.cid}catch(U){console.warn("Erro ao coletar pageData:",U)}let j=s.getCheckedElements().map(U=>({key:U.value,count:U.count})),te=j.map(U=>{let ne=Ae[U.key];return ne?ne.name:U.key});return{currentCaseType:Y.currentCaseType,currentLang:Y.currentLang,isPortugalCase:Y.isPortugalCase,consent:Y.consent,tagSupportUsed:Y.tagSupportUsed,forcedScreenshots:[...Y.forcedScreenshots],excludedFields:[...Y.excludedFields],activeFields:Y.activeFields,status:Y.currentStatus,subStatus:Y.currentSubStatus,formData:D,activeTasks:j,summaryTags:te,clientName:W,cid:Q,timestamp:new Date().toISOString()}}let B=h=>new Promise(D=>setTimeout(D,h));async function G(h){Y.setLanguage(h.currentLang||"pt"),Y.setCaseType(h.currentCaseType||"bau"),Y.setPortugalCase(h.isPortugalCase||!1),Y.setConsent(h.consent||!1),Y.setExcludedFields(h.excludedFields||[]),h.activeFields&&Y.setActiveFields(h.activeFields);let D=o.querySelector(`#lang-selector button[data-lang="${Y.currentLang}"]`);D&&D.classList.add("active"),o.querySelectorAll("#lang-selector button").forEach(j=>{j!==D&&j.classList.remove("active")});let W=o.querySelector(`#type-selector button[data-type="${Y.currentCaseType}"]`);W&&W.classList.add("active"),o.querySelectorAll("#type-selector button").forEach(j=>{j!==W&&j.classList.remove("active")});let Q=o.querySelector(`#portugal-selector button[data-val="${Y.isPortugalCase}"]`);if(Q&&Q.classList.add("active"),o.querySelectorAll("#portugal-selector button").forEach(j=>{j!==Q&&j.classList.remove("active")}),h.status){let j=o.querySelector("#main-status-select");j.value=h.status,Y.setStatus(h.status);let te=o.querySelector("#sub-status-select");if(b(h.status,te),await B(50),h.subStatus){if(te.value=h.subStatus,Y.setSubStatus(h.subStatus),c(h.subStatus),await B(100),h.tagSupportUsed!==void 0){Y.setTagSupportUsed(h.tagSupportUsed);let U=r.element.querySelector('input[value="Sim"]'),ne=r.element.querySelector('input[value="N\xE3o"]');h.tagSupportUsed&&U?U.checked=!0:ne&&(ne.checked=!0),r.element.querySelector("div:last-child").style.display=h.tagSupportUsed?"none":"block"}h.forcedScreenshots&&Y.setForcedScreenshots(h.forcedScreenshots);for(let U in h.formData){let ne=document.getElementById(U);ne&&(ne.value=h.formData[U],Y.updateField(U,ne.value))}h.activeTasks&&(h.activeTasks.forEach(U=>s.setTaskCount(U.key,U.count)),Y.setActiveTasks(s.getCheckedElements()))}}Y.isDirty=!1}function A(h){return Ce[Y.currentLang]?.[h]||Ce.pt?.[h]||h}function K(){let h=document.createElement("div");return h.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',h.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",h.onclick=D=>{D.stopPropagation(),$()},h.title="Alternar para Split & Transfer",h}function ae(){let h=document.createElement("div");return h.id="notes-empty-state",h.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${se};
        `,h.innerHTML=`
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
                <div style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${z.text}; margin-bottom: 4px;">
                    ${A("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${z.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${A("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,h}function oe(h){let D=o.querySelector(".js-label-idioma");D&&(D.textContent=A("idioma"));let W=o.querySelector(".js-label-fluxo");W&&(W.textContent=A("fluxo"));let Q=o.querySelector(".js-label-portugal");Q&&(Q.textContent=A("caso_portugal"));let j=o.querySelector(".js-label-status");j&&(j.textContent=A("status_principal"));let te=o.querySelector(".js-label-substatus");te&&(te.textContent=A("substatus"));let U=o.querySelector(".js-btn-copy");U&&(U.textContent=A("copiar"));let ne=o.querySelector(".js-btn-generate");ne&&(ne.textContent=A("preencher"));let ce=o.querySelector(".js-btn-reset");ce&&(ce.textContent=A("limpar"));let Te=document.getElementById("manual-task-toggle");Te&&(Te.textContent=A("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let Ee=o.querySelector(".js-btn-park span");Ee&&(Ee.textContent=A("guardar")),p.textContent=A("evidencias_contato");let Fe=l.querySelector('label[for="evidence-l1"]');Fe&&(Fe.textContent=A("ligacao_1"));let We=l.querySelector('label[for="evidence-l2"]');We&&(We.textContent=A("ligacao_2"));let xe=l.querySelector('label[for="evidence-msg"]');xe&&(xe.textContent=A("mensagem_am"));let le=e.querySelector(".js-drawer-title");le&&(le.textContent=A("rascunhos_salvos"));let _e=o.querySelector(".js-label-email-toggle");_e&&(_e.textContent=A("preencher_email_automaticamente")),r&&r.setLanguage&&r.setLanguage(A),s&&s.setLanguage&&s.setLanguage(A)}return k.style.display="flex",P.style.display="none",Y.setLanguage("pt"),Y.setCaseType("bau"),N(),setTimeout(async()=>{let h=be.getEmergency();h&&(await ye("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?")?(G(h),Z("Sess\xE3o restaurada!")):be.clearEmergency())},3e3),document.body.appendChild(e),X}var yo=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule2",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email nas pr\xF3ximas 48 horas o caso ser\xE1 encerrado.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}];var vo={_templates:null,async getTemplates(){return this._templates?this._templates:(this._templates=yo,this._templates)}};var wo="cw_personal_library_v1",Ke=!1,ve={getSnippets:(t="all")=>{let e=ve._loadFromLocal(),o=he();return o&&o.includes("@")&&!Ke&&ve._syncWithServer(o),t==="all"?e:e.filter(a=>a.type===t)},save:async t=>{let e=he();if(!e)return Z("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;Ke=!0;let o=ve._loadFromLocal(),a=new Date().toISOString(),n={id:t.id||"local_"+Date.now(),type:t.type||"general",title:t.title||"Sem t\xEDtulo",content:t.content||"",subject:t.subject||"",isCode:t.isCode||!1,isRich:t.isRich||!1,updated:a},i=o.filter(r=>r.id!==n.id);return i.unshift(n),ve._saveToLocal(i),de.saveSnippet(n,e).then(r=>{r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais."),setTimeout(()=>{Ke=!1},2e3)}),n},delete:async t=>{let e=he();Ke=!0;let a=ve._loadFromLocal().filter(n=>n.id!==t);return ve._saveToLocal(a),e?de.deleteSnippet(t,e).then(()=>{setTimeout(()=>{Ke=!1},2e3)}):Ke=!1,!0},_syncWithServer:async t=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let e=await de.getUserSnippets(t);if(e&&e.status==="success"&&Array.isArray(e.snippets)){let o=e.snippets,a=ve._loadFromLocal(),n=JSON.stringify(o),i=JSON.stringify(a);n!==i&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),ve._saveToLocal(o))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(wo)||"[]")}catch{return[]}},_saveToLocal:t=>{localStorage.setItem(wo,JSON.stringify(t))}};function So(){let t="v6.0.0",e=!1,o=[],a=null,n="",i="Todos",r=new Set,s={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"},d=document.createElement("div");d.id="email-assistant-popup",d.classList.add("cw-module-window");let m=document.createElement("style");m.textContent=`
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
    `,document.head.appendChild(m),Object.assign(d.style,ge,{width:"850px",height:"650px",display:"none",flexDirection:"column",fontFamily:"'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",borderRadius:"12px",overflow:"hidden"});let l=ue(d,"Email Assistant",t,"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",{popup:d},()=>R()),p=document.createElement("div");Object.assign(p.style,{display:"flex",flex:"1",overflow:"hidden",backgroundColor:s.bgApp});let x=document.createElement("div");Object.assign(x.style,{width:"320px",backgroundColor:"#EFEFF0",borderRight:`1px solid ${s.borderSubtle}`,display:"flex",flexDirection:"column",flexShrink:"0"});let f=document.createElement("div");Object.assign(f.style,{padding:"16px",borderBottom:`1px solid ${s.borderSubtle}`,position:"relative"});let g=document.createElement("input");g.placeholder="Buscar templates...",Object.assign(g.style,{width:"100%",padding:"10px 14px 10px 36px",borderRadius:"10px",border:"1.5px solid transparent",backgroundColor:"#E3E3E8",fontSize:"15px",outline:"none",boxSizing:"border-box",color:s.textPrimary,backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",transition:"all 0.2s ease-in-out"}),g.onfocus=()=>{g.style.backgroundColor="#FFFFFF",g.style.borderColor=s.primary,g.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)",g.style.transform="scale(1.02)"},g.onblur=()=>{g.style.backgroundColor="#E3E3E8",g.style.borderColor="transparent",g.style.boxShadow="none",g.style.transform="scale(1)"};let u=document.createElement("div");u.id="email-template-list",Object.assign(u.style,{flex:"1",overflowY:"auto",padding:"8px",scrollBehavior:"smooth"});let C=document.createElement("div");C.innerHTML="\u2715",Object.assign(C.style,{position:"absolute",right:"26px",top:"50%",transform:"translateY(-50%)",fontSize:"10px",color:"#fff",cursor:"pointer",display:"none",backgroundColor:"#C7C7CC",width:"16px",height:"16px",borderRadius:"50%",textAlign:"center",lineHeight:"16px",fontWeight:"bold"}),C.onclick=()=>{g.value="",n="",C.style.display="none",b(),g.focus()},f.appendChild(g),f.appendChild(C),x.appendChild(f),x.appendChild(u);let F=document.createElement("div");Object.assign(F.style,{flex:"1",display:"flex",flexDirection:"column",overflow:"hidden",backgroundColor:s.bgApp,transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"});let k=document.createElement("div");Object.assign(k.style,{padding:"20px",borderBottom:`1px solid ${s.borderSubtle}`,backgroundColor:s.bgSurface,maxHeight:"250px",overflowY:"auto",display:"none"});let P=document.createElement("div");Object.assign(P.style,{flex:"1",display:"flex",flexDirection:"column",padding:"20px",backgroundColor:s.bgApp,overflow:"hidden"});let M=document.createElement("div");Object.assign(M.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"});let J=document.createElement("span");J.textContent="Preview do E-mail",Object.assign(J.style,{fontSize:"12px",fontWeight:"600",color:s.textSecondary,textTransform:"uppercase",letterSpacing:"0.5px"});let ee=document.createElement("div");Object.assign(ee.style,{display:"flex",gap:"8px"});let I=(v,L=!1)=>{let S=document.createElement("button");return S.textContent=v,Object.assign(S.style,{padding:"8px 14px",borderRadius:"10px",border:L?"none":`1.5px solid ${s.primary}`,background:L?s.primary:"transparent",color:L?"#fff":s.primary,fontSize:"13px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 1, 0.5, 1)",boxShadow:L?"0 4px 12px rgba(0, 122, 255, 0.3)":"none"}),S.onmouseenter=()=>{L?(S.style.backgroundColor="#0062CC",S.style.transform="translateY(-1px)",S.style.boxShadow="0 6px 16px rgba(0, 122, 255, 0.4)"):S.style.backgroundColor="rgba(0, 122, 255, 0.05)"},S.onmouseleave=()=>{L?(S.style.backgroundColor=s.primary,S.style.transform="translateY(0)",S.style.boxShadow="0 4px 12px rgba(0, 122, 255, 0.3)"):(S.style.backgroundColor="transparent",S.style.transform="translateY(0)")},S.onmousedown=()=>S.style.transform="scale(0.94)",S.onmouseup=()=>S.style.transform="scale(1)",S},O=I("Copiar HTML"),N=I("Preencher no CRM",!0),X=I("Smart CR");X.style.borderColor="#E67E22",X.style.color="#E67E22",X.style.display="none",ee.appendChild(X),ee.appendChild(O),ee.appendChild(N),M.appendChild(J),M.appendChild(ee);let $=document.createElement("div");$.contentEditable="true",Object.assign($.style,{flex:"1",backgroundColor:s.bgSurface,border:`1px solid ${s.borderSubtle}`,borderRadius:"8px",padding:"20px",fontSize:"15px",lineHeight:"1.6",color:s.textPrimary,overflowY:"auto",outline:"none",boxShadow:"inset 0 1px 2px rgba(0,0,0,0.02)"}),P.appendChild(M),P.appendChild($),E(),F.appendChild(k),F.appendChild(P),p.appendChild(x),p.appendChild(F),d.appendChild(l),d.appendChild(p);let T=document.createElement("div");Object.assign(T.style,Oe),d.appendChild(T),Le(d,T),document.body.appendChild(d);function R(){e=!e,e?(d.style.display="flex",Jt(d),o.length===0&&q()):d.style.display="none",me(e,d,"cw-btn-email")}async function q(){u.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',o=await vo.getTemplates(),b()}function b(){u.innerHTML="";let v=o.filter(B=>B.name.toLowerCase().includes(n.toLowerCase())||B.category.toLowerCase().includes(n.toLowerCase())),L=Object.entries(Ye).filter(([B,G])=>G&&(B.toLowerCase().includes(n.toLowerCase())||G.toLowerCase().includes(n.toLowerCase()))).map(([B,G])=>({id:B,name:B.replace(/_/g," "),category:"\u26A1 Smart CRs",code:G,isSmartCR:!0})),S=ve.getSnippets("email").filter(B=>B.title.toLowerCase().includes(n.toLowerCase())||B.subject&&B.subject.toLowerCase().includes(n.toLowerCase())).map(B=>{let G=[],A=B.content.match(/\[([^\]]+)\]/g);return A&&[...new Set(A)].forEach(K=>{G.push({key:K,label:K.replace("[","").replace("]",""),type:K.toLowerCase().includes("data")?"date":"text",auto:K.toLowerCase().includes("nome")&&K.toLowerCase().includes("seu")?"agentName":null})}),{id:B.id||`snippet-${Math.random()}`,name:B.title,category:"\u{1F464} Pessoal",subject:B.subject||"Sem Assunto",template:B.content,placeholders:G}}),V=[...v,...L,...S];if(V.length===0){u.innerHTML=`
                <div style="padding: 40px 20px; text-align: center; color: ${s.textSecondary}; opacity: 0.6;">
                    <div style="font-size: 32px; margin-bottom: 12px;">\u{1F50D}</div>
                    <div style="font-size: 14px; font-weight: 500;">Nenhum resultado para "${n}"</div>
                </div>`;return}[...new Set(V.map(B=>B.category))].sort((B,G)=>B.localeCompare(G)).forEach(B=>{let G=r.has(B)||n.length>0,A=V.filter(W=>W.category===B),K=document.createElement("div");Object.assign(K.style,{padding:"12px 16px 12px 24px",fontSize:"11px",fontWeight:"700",color:s.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",position:"sticky",top:"-8px",backgroundColor:"rgba(239, 239, 240, 0.9)",zIndex:"10",backdropFilter:"blur(20px)",margin:"0 -8px 8px -8px",borderBottom:`0.5px solid ${s.borderSubtle}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none",transition:"background-color 0.2s ease"}),K.onmouseenter=()=>K.style.backgroundColor="rgba(230, 230, 232, 0.9)",K.onmouseleave=()=>K.style.backgroundColor="rgba(239, 239, 240, 0.9)";let ae=document.createElement("span");ae.textContent=B,K.appendChild(ae);let oe=document.createElement("span");oe.textContent=A.length,Object.assign(oe.style,{backgroundColor:"rgba(0, 0, 0, 0.05)",padding:"2px 8px",borderRadius:"10px",fontSize:"10px",color:s.textSecondary});let h=document.createElement("span");h.innerHTML=G?"\u{10012A}":"\u{10012B}",h.innerHTML=G?"\u25BE":"\u25B8",h.style.marginLeft="8px",h.style.transition="transform 0.3s ease";let D=document.createElement("div");D.style.display="flex",D.style.alignItems="center",D.appendChild(oe),D.appendChild(h),K.appendChild(D),K.onclick=()=>{r.has(B)?r.delete(B):r.add(B),b()},u.appendChild(K),G&&A.forEach(W=>{let Q=a&&a.id===W.id,j=document.createElement("div");if(Object.assign(j.style,{padding:"12px 14px",fontSize:"14px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",borderRadius:"10px",color:s.textPrimary,margin:"4px 6px",display:"flex",alignItems:"center",gap:"12px",backgroundColor:Q?s.primary:s.bgSurface,boxShadow:Q?"0 4px 12px rgba(0, 122, 255, 0.3)":"0 1px 2px rgba(0,0,0,0.05)",border:Q?"none":`1px solid ${s.borderSubtle}`,position:"relative",overflow:"hidden"}),Q){let ne=document.createElement("div");Object.assign(ne.style,{position:"absolute",left:"0",top:"0",bottom:"0",width:"4px",backgroundColor:"#fff",borderRadius:"0 4px 4px 0"}),j.appendChild(ne)}let te=document.createElement("span");te.innerHTML=W.isSmartCR?"\u26A1":W.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}",te.style.fontSize="12px",te.style.opacity="0.7",te.style.flexShrink="0",j.appendChild(te);let U=document.createElement("span");U.textContent=W.name,U.style.overflow="hidden",U.style.textOverflow="ellipsis",U.style.whiteSpace="nowrap",U.style.flex="1",j.appendChild(U),Q&&(j.style.color="#fff",j.style.fontWeight="600",te.style.opacity="1"),j.onmouseenter=()=>{Q||(j.style.backgroundColor="#f8f8f9",j.style.transform="translateY(-1px) scale(1.01)",j.style.boxShadow="0 4px 8px rgba(0,0,0,0.08)",j.style.borderColor="rgba(0, 122, 255, 0.2)")},j.onmouseleave=()=>{Q||(j.style.backgroundColor=s.bgSurface,j.style.transform="translateY(0) scale(1)",j.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",j.style.borderColor=s.borderSubtle)},j.onmousedown=()=>{j.style.transform=Q?"scale(0.97)":"scale(0.98)"},j.onmouseup=()=>{j.style.transform=Q?"scale(1)":"translateY(-1px) scale(1.01)"},j.onclick=()=>{w(W)},u.appendChild(j)})})}let c=null;async function w(v){a?.id!==v.id&&(a=v,c&&clearTimeout(c),F.style.opacity="0",F.style.transform="translateY(5px)",c=setTimeout(()=>{X.style.display=v.isSmartCR?"block":"none",N.style.display=v.isSmartCR?"none":"block",O.style.display=v.isSmartCR?"none":"block",b(),y(),E(),F.style.opacity="1",F.style.transform="translateY(0)",c=null},150))}function y(){if(k.innerHTML="",!a||a.isSmartCR){a?.isSmartCR?(k.style.display="block",k.innerHTML=`<div style="padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):k.style.display="none";return}let v=a.placeholders&&a.placeholders.length>0;if(k.style.display=v?"block":"none",!v)return;let L=document.createElement("div");Object.assign(L.style,{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}),(a.placeholders||[]).forEach(S=>{let V=document.createElement("div"),_=document.createElement("label");_.textContent=S.label,Object.assign(_.style,{display:"block",fontSize:"11px",fontWeight:"700",color:s.textSecondary,marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.5px"});let B=document.createElement("input");B.type=S.type||"text",B.dataset.key=S.key,Object.assign(B.style,{width:"100%",padding:"10px 12px",borderRadius:"8px",border:`1.5px solid ${s.borderSubtle}`,backgroundColor:"#FBFBFD",fontSize:"14px",boxSizing:"border-box",transition:"all 0.2s ease",outline:"none"}),B.onfocus=()=>{B.style.borderColor=s.primary,B.style.backgroundColor="#FFFFFF",B.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)"},B.onblur=()=>{B.style.borderColor=s.borderSubtle,B.style.backgroundColor="#FBFBFD",B.style.boxShadow="none"},S.auto==="agentName"&&(B.value=$e().split(" ")[0]),B.addEventListener("input",E),V.appendChild(_),V.appendChild(B),L.appendChild(V)}),k.appendChild(L)}function E(){if(!a){$.innerHTML=`
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
                </div>`;return}if(a.isSmartCR){$.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${a.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let v=a.template;(k.querySelectorAll("input")||[]).forEach(S=>{let V=S.dataset.key,_=S.value;if(S.type==="date"&&_){let[G,A,K]=_.split("-");_=`${A}/${K}/${G}`}_=_||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${V}</span>`;let B=V.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");v=v.replace(new RegExp(B,"g"),_)}),$.innerHTML=v}return g.addEventListener("input",v=>{n=v.target.value,C.style.display=n?"block":"none",b()}),O.onclick=()=>{let v=$.innerHTML,L=new Blob([v],{type:"text/html"}),S=$.innerText,V=[new ClipboardItem({"text/html":L,"text/plain":new Blob([S],{type:"text/plain"})})];navigator.clipboard.write(V).then(()=>Z("E-mail copiado com sucesso!"),()=>Z("Erro ao copiar e-mail",{error:!0}))},N.onclick=async()=>{if(!a)return;let v=tt(),L={...a,body:$.innerHTML};try{await fo(L),R()}catch{Z("Erro ao preencher e-mail",{error:!0})}finally{v()}},X.onclick=async()=>{if(!a||!a.isSmartCR)return;let v=tt();try{await vt(a.code),R()}catch{Z("Erro ao aplicar Smart CR",{error:!0})}finally{v()}},R}var Co={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]},"EN BAU":{inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function Ao(){let t="v3.0.0",e={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",success:"#34A853"},o="csa-local-styles";if(!document.getElementById(o)){let A=document.createElement("style");A.id=o,A.innerHTML=`
        @keyframes csa-pulse-green {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .csa-live-dot {
            width: 8px; height: 8px; 
            background: #10B981; border-radius: 50%;
            animation: csa-pulse-green 2s infinite;
        }
        .csa-data-pill {
            background: #F8F9FA; border: 1px solid transparent;
            border-radius: 10px; padding: 8px 12px;
            cursor: pointer; position: relative; overflow: hidden;
            transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .csa-data-pill:hover {
            background: #FFFFFF; border-color: #DADCE0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            transform: translateY(-1px);
        }
        .csa-data-pill:active { transform: scale(0.98); }
        
        .csa-data-pill.copied {
            background: #E6F4EA !important;
            border-color: #34A853 !important;
        }
        .csa-copy-hint {
            position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #1E8E3E; font-weight: 700; text-transform: uppercase;
            opacity: 0; transition: opacity 0.2s; pointer-events: none;
        }
        .csa-data-pill.copied .csa-copy-hint { opacity: 1; }
        .csa-data-pill.copied .csa-data-value { opacity: 0.3; }

        /* Segmented Control (Tabs) */
        .csa-segmented-control {
            display: flex;
            background: #E3E3E8;
            padding: 2px;
            border-radius: 10px;
            gap: 2px;
            position: relative;
            margin-bottom: 16px;
        }
        .csa-segmented-control button {
            flex: 1;
            border: none;
            background: transparent;
            padding: 8px 4px;
            font-size: 12px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #6E6E73;
            position: relative;
            z-index: 2;
        }
        .csa-segmented-control button.active {
            color: #1D1D1F;
        }
        .csa-segmented-indicator {
            position: absolute;
            top: 2px;
            left: 2px;
            bottom: 2px;
            background: #FFFFFF;
            border-radius: 8px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* Strikethrough Animation */
        .csa-item-text {
            position: relative;
            display: inline-block;
            transition: color 0.3s ease;
        }
        .csa-item-text.completed {
            color: #6E6E73;
        }
        .csa-item-text::after {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 0;
            height: 1.5px;
            background: #6E6E73;
            transition: width 0.3s ease;
        }
        .csa-item-text.completed::after {
            width: 100%;
        }

        /* Shimmer Progress Bar */
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        .csa-progress-fill {
            background: linear-gradient(90deg, #007AFF, #00C6FF, #007AFF);
            background-size: 200% 100%;
            animation: shimmer 2s infinite linear;
        }
      `,document.head.appendChild(A)}let a={progressBarContainer:{height:"6px",background:e.borderSubtle,width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 3px 3px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:e.bgApp,scrollBehavior:"smooth"},card:{background:e.bgSurface,border:`1px solid ${e.borderSubtle}`,borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:e.shadowCard},cardTitle:{fontSize:"11px",fontWeight:"700",color:e.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"10px",transition:"all 0.2s ease",color:e.textPrimary,fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{background:"rgba(0, 0, 0, 0.02)"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"50%",border:`2px solid ${e.borderSubtle}`,marginRight:"12px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},n={},i="PT",r="BAU",s=!1,d=document.createElement("div");d.id="call-script-popup",d.classList.add("cw-module-window"),Object.assign(d.style,ge,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let m={popup:d,googleLine:null},l=null;function p(){s&&Se().then(A=>{let K=d.querySelector("#cw-ctx-name"),ae=d.querySelector("#cw-ctx-cid"),oe=d.querySelector("#cw-ctx-email");if(K&&(K.textContent=A.advertiserName||"Cliente Desconhecido"),ae){let h=A.cid||"---";ae.textContent!==h&&(ae.textContent=h)}if(oe){let h=A.clientEmail||"N\xE3o encontrado";oe.textContent!==h&&(oe.textContent=h,oe.title=h)}})}function x(){Se().then(A=>{let K=new Date().toLocaleDateString("pt-BR"),ae=d.querySelector("#cw-am-message-area"),oe=d.querySelector("#cw-am-review-container"),h=`Ol\xE1. Bom dia!

Estou com um caso do seu cliente (${A.advertiserName||"Cliente"}) em andamento hoje (${K}). Fiz a primeira tentativa de contato agora h\xE1 pouco, mas n\xE3o tive sucesso.

Farei uma nova tentativa em alguns minutos. Caso ele n\xE3o atenda novamente, seguirei com o e-mail padr\xE3o de reagendamento/no-show e te mantenho no radar.

Dados do caso para seu controle:

Cliente: ${A.advertiserName||"---"}
CID: ${A.cid||"---"}
Case ID: ${A.caseId||"---"}
E-mail: ${A.clientEmail||"---"}`;ae&&(ae.value=h),oe&&(oe.style.display="block",oe.style.maxHeight="300px",oe.style.opacity="1",oe.scrollIntoView({behavior:"smooth",block:"end"}))})}function f(){s=!s,me(s,d,"cw-btn-script"),s?(p(),l||(l=setInterval(p,2e3))):l&&(clearInterval(l),l=null)}let g=ue(d,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",m,()=>{f()});d.appendChild(g);let u=document.createElement("div");Object.assign(u.style,a.contextBanner),u.innerHTML=`
      <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px;">
              <div class="csa-live-dot" title="Monitoramento Ativo"></div>
              <span id="cw-ctx-name" style="font-family:'Google Sans'; font-size:16px; font-weight:500; color:#202124;">Carregando...</span>
          </div>
          <div style="font-size:10px; font-weight:700; color:#1A73E8; background:#E8F0FE; padding:2px 8px; border-radius:4px; text-transform:uppercase;">Live</div>
      </div>
      
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div class="csa-data-pill" id="cw-pill-cid">
              <div style="font-size:9px; font-weight:700; color:#5F6368; text-transform:uppercase; margin-bottom:2px; letter-spacing:0.5px;">CID (Conta)</div>
              <div id="cw-ctx-cid" class="csa-data-value" style="font-family:'Roboto Mono', monospace; font-size:13px; font-weight:500; color:#1A73E8;">---</div>
              <div class="csa-copy-hint">Copiado!</div>
          </div>
          
          <div class="csa-data-pill" id="cw-pill-email">
              <div style="font-size:9px; font-weight:700; color:#5F6368; text-transform:uppercase; margin-bottom:2px; letter-spacing:0.5px;">Email de Contato</div>
              <div id="cw-ctx-email" class="csa-data-value" style="font-family:'Roboto', sans-serif; font-size:13px; color:#3C4043; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">---</div>
              <div class="csa-copy-hint">Copiado!</div>
          </div>
      </div>

      <div id="csa-more-options" style="margin-top: 8px;">
          <button id="csa-toggle-options" style="width: 100%; background: transparent; border: none; padding: 4px 0; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #9AA0A6; transition: color 0.2s;">
              <svg id="csa-options-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.3s ease;"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>

          <div id="csa-options-content" style="max-height: 0; overflow: hidden; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); opacity: 0; padding: 0 4px;">
              <div style="padding: 12px; background: #F8F9FA; border: 1px solid #DADCE0; border-radius: 12px; margin-bottom: 8px;">
                  <button id="cw-pill-message" style="width: 100%; background: #FFFFFF; border: 1px solid #DADCE0; border-radius: 10px; padding: 10px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                      <div style="background: #E8F0FE; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <div style="text-align: left;">
                          <div style="font-size:11px; font-weight:700; color:#3C4043;">Mensagem AM</div>
                          <div style="font-size:10px; color:#5F6368;">Gerar aviso de insucesso</div>
                      </div>
                  </button>

                  <div id="cw-am-review-container" style="display: none; transition: all 0.3s ease; opacity: 0; max-height: 0; overflow: hidden; margin-top: 12px;">
                      <textarea id="cw-am-message-area" style="width: 100%; height: 120px; border: 1px solid #DADCE0; border-radius: 8px; padding: 10px; font-family: 'Roboto', sans-serif; font-size: 13px; color: #3C4043; outline: none; resize: none; box-sizing: border-box; background: #FFFFFF; line-height: 1.4;"></textarea>
                      <button id="cw-am-copy-final" style="width: 100%; margin-top: 8px; padding: 10px; background: #007AFF; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;">
                          Copiar Mensagem Final
                      </button>
                  </div>
              </div>
          </div>
      </div>
  `;let C=u.querySelector("#csa-toggle-options"),F=u.querySelector("#csa-options-content"),k=u.querySelector("#csa-options-arrow"),P=!1;C.onclick=()=>{P=!P,k.style.transform=P?"rotate(180deg)":"rotate(0deg)",F.style.maxHeight=P?"400px":"0",F.style.opacity=P?"1":"0",F.style.marginTop=P?"8px":"0",H.playClick()};let M=u.querySelector("#cw-pill-message"),J=u.querySelector("#cw-am-copy-final"),ee=u.querySelector("#cw-am-message-area");M.onmouseenter=()=>{M.style.borderColor="#007AFF",M.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},M.onmouseleave=()=>{M.style.borderColor="#DADCE0",M.style.boxShadow="0 1px 2px rgba(0,0,0,0.02)"},M.addEventListener("click",()=>{x()}),J.addEventListener("click",()=>{ee.value&&(navigator.clipboard.writeText(ee.value),Z("Mensagem copiada!"),H.playSuccess(),J.style.background="#34A853",J.textContent="Copiado!",setTimeout(()=>{J.style.background="#1A73E8",J.textContent="Copiar Mensagem Final"},2e3))});let I=(A,K)=>{let ae=u.querySelector(A),oe=u.querySelector(K);ae.onclick=()=>{let h=oe.textContent;!h||h.includes("---")||h.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(h),H.playSuccess(),ae.classList.add("copied"),setTimeout(()=>ae.classList.remove("copied"),1500))}};d.appendChild(u);let O=document.createElement("div");Object.assign(O.style,a.progressBarContainer);let N=document.createElement("div");N.className="csa-progress-fill",Object.assign(N.style,a.progressBarFill),O.appendChild(N),d.appendChild(O);let X=document.createElement("div");X.id="csa-content",Object.assign(X.style,a.contentArea),d.appendChild(X);let $=document.createElement("div");Object.assign($.style,a.footer);let T=document.createElement("span");T.textContent="by lucaste@",Object.assign(T.style,{fontSize:"10px",color:"#bdc1c6"});let R=document.createElement("button");R.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(R.style,a.resetBtn),R.onmouseenter=()=>R.style.background="#fce8e6",R.onmouseleave=()=>R.style.background="transparent",R.onclick=()=>{R.style.transform="scale(0.9)",setTimeout(()=>R.style.transform="scale(1)",150);for(let A in n)delete n[A];_()},$.appendChild(T),$.appendChild(R),d.appendChild($);let q=document.createElement("div");Object.assign(q.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"16px"});let b=document.createElement("div");b.className="csa-segmented-control",b.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `;let c=document.createElement("div");c.className="csa-segmented-control",c.innerHTML=`
      <div class="csa-segmented-indicator" id="lang-indicator" style="width: calc(33.33% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-lang="PT">PT</button>
      <button data-lang="ES">ES</button>
      <button data-lang="EN">EN</button>
  `,q.appendChild(b),q.appendChild(c),X.appendChild(q);let w=b.querySelectorAll("button"),y=b.querySelector("#type-indicator");w.forEach((A,K)=>{A.onclick=()=>{w.forEach(ae=>ae.classList.remove("active")),A.classList.add("active"),y.style.transform=`translateX(${K*(b.offsetWidth/2-2)}px)`,r=A.dataset.type,H.playClick(),_()}});let E=c.querySelectorAll("button"),v=c.querySelector("#lang-indicator");E.forEach((A,K)=>{A.onclick=()=>{E.forEach(ae=>ae.classList.remove("active")),A.classList.add("active"),v.style.transform=`translateX(${K*(c.offsetWidth/3-1)}px)`,i=A.dataset.lang,H.playClick(),_()}});let L=document.createElement("div");L.id="csa-checklist-area",X.appendChild(L);let S=document.createElement("div");Object.assign(S.style,Oe),S.className="no-drag",S.title="Redimensionar",d.appendChild(S),Le(d,S),document.body.appendChild(d),I("#cw-pill-cid","#cw-ctx-cid"),I("#cw-pill-email","#cw-ctx-email");function V(A){return A}function _(){L.innerHTML="";let A=`${i} ${r}`,K=Co[A];if(!K){L.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',N.style.width="0%";return}let ae=e.primary,oe=0,h=0;["inicio","meio","fim"].forEach(D=>{K[D]&&(oe+=K[D].length)}),["inicio","meio","fim"].forEach((D,W)=>{let Q=K[D];if(!Q||Q.length===0)return;let j=document.createElement("div");Object.assign(j.style,a.card);let te=document.createElement("div");Object.assign(te.style,a.cardTitle);let U="";D==="inicio"?i.includes("ES")?U="Apertura":i.includes("EN")?U="Opening":U="Abertura":D==="meio"?i.includes("ES")?U="Implementaci\xF3n":i.includes("EN")?U="Implementation":U="Implementa\xE7\xE3o (Tag Support)":D==="fim"&&(i.includes("ES")?U="Cierre":i.includes("EN")?U="Closing":U="Fechamento"),te.textContent=U;let ne=document.createElement("span");ne.style.fontSize="11px",ne.style.opacity="0.7",ne.style.fontWeight="500",ne.style.background="#f1f3f4",ne.style.padding="2px 8px",ne.style.borderRadius="10px",te.appendChild(ne),j.appendChild(te);let ce=0;Q.forEach((Te,Ee)=>{let Fe=`${A}-${D}-${Ee}`,We=!!n[Fe];We&&(h++,ce++);let xe=document.createElement("div");Object.assign(xe.style,a.itemRow);let le=document.createElement("div");Object.assign(le.style,a.checkbox);let _e=document.createElement("span");_e.className="csa-item-text"+(We?" completed":""),_e.innerHTML=Te,_e.style.flex="1",We?(Object.assign(xe.style,a.itemCompleted),le.style.background=ae,le.style.borderColor=ae,le.style.transform="scale(1)",le.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(le.style.background="transparent",le.style.borderColor=e.borderSubtle,le.style.transform="scale(1)",le.innerHTML=""),xe.onclick=()=>{let Rt=!n[Fe];n[Fe]=Rt,H.playClick(),Rt?(le.style.transform="scale(1.15)",setTimeout(()=>le.style.transform="scale(1)",150),Object.assign(xe.style,a.itemCompleted),_e.classList.add("completed"),le.style.background=ae,le.style.borderColor=ae,le.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(xe.style.background="transparent",_e.classList.remove("completed"),le.style.background="transparent",le.style.borderColor=e.borderSubtle,le.innerHTML=""),B(A,K)},xe.onmouseenter=()=>{n[Fe]||(xe.style.background="rgba(0, 0, 0, 0.03)",le.style.borderColor=ae)},xe.onmouseleave=()=>{n[Fe]||(xe.style.background="transparent",le.style.borderColor=e.borderSubtle)},xe.appendChild(le),xe.appendChild(_e),j.appendChild(xe)}),ce===Q.length&&Q.length>0&&(ne.style.color="#1e8e3e",ne.style.background="#e6f4ea",j.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),ne.textContent=`${ce}/${Q.length}`,L.appendChild(j)}),G(oe,h)}function B(A,K){let ae=0,oe=0;["inicio","meio","fim"].forEach(h=>{let D=K[h]||[];ae+=D.length,D.forEach((W,Q)=>{n[`${A}-${h}-${Q}`]&&oe++})}),G(ae,oe),setTimeout(()=>_(),200)}function G(A,K){let ae=A===0?0:K/A*100;N.style.width=`${ae}%`,ae===100?(N.style.background=e.success,N.classList.remove("csa-progress-fill")):(N.style.background="",N.classList.add("csa-progress-fill"))}return _(),f}var at={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Ge={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},wt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},Dt="cw_link_history_v4";function Eo(t,e){try{let o=JSON.parse(localStorage.getItem(Dt)||"[]");o=o.filter(a=>a.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(Dt,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function sa(){try{return JSON.parse(localStorage.getItem(Dt)||"[]")}catch{return[]}}function ko(){let t="v4.6",e="",o=!1,a=null,n=!1,i={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},r=document.createElement("div");r.id="links-popup",r.classList.add("cw-module-window"),Object.assign(r.style,ge,{right:"100px",width:"600px",height:"650px",background:i.bgApp,overflow:"hidden"});let d=ue(r,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:r,googleLine:null},()=>$());r.appendChild(d);let m=document.createElement("div");m.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",r.appendChild(m);let l=document.createElement("div");l.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${i.bgSidebar};
      border-right: 1px solid ${i.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,m.appendChild(l);let p=document.createElement("div");p.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",m.appendChild(p);let x=document.createElement("div");x.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let f=document.createElement("div");f.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let g=document.createElement("div");g.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',g.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let u=document.createElement("input");u.type="text",u.placeholder="Buscar ferramenta ou SOP...",u.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${i.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,u.onfocus=()=>{f.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",f.style.border="1px solid #1a73e8"},u.onblur=()=>{f.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",f.style.border="1px solid transparent"},f.appendChild(g),f.appendChild(u),x.appendChild(f),p.appendChild(x);let C=document.createElement("div");C.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",p.appendChild(C);let F=null;function k(){if(F)return;F=document.createElement("div"),F.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let T=document.createElement("div");T.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",T.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let R=document.createElement("button");R.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',R.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",R.onclick=()=>{M(),n=!1,O()},T.appendChild(R),F.appendChild(T);let q=document.createElement("div");q.id="cw-history-list",q.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",F.appendChild(q),p.appendChild(F)}function P(){F||k();let T=F.querySelector("#cw-history-list");T.innerHTML="";let R=sa();R.length===0?T.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':R.forEach(q=>{let b=X(q,Ge[q._originalCat],!0,q._originalCat);T.appendChild(b)}),requestAnimationFrame(()=>F.style.transform="translateY(0)")}function M(){F&&(F.style.transform="translateY(100%)")}function J(){l.innerHTML="";let T=ee("history","Recentes",Ge.history);T.id="cw-sidebar-btn-history",T.onclick=()=>{H.playClick(),n=!n,n?P():M(),O()},l.appendChild(T);let R=document.createElement("div");R.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",l.appendChild(R),Object.keys(at).forEach(q=>{let b=at[q],c=ee(q,b.label,Ge[q]);c.id=`cw-sidebar-btn-${q}`,c.onclick=()=>{H.playClick(),n&&(n=!1,M()),I(q)},l.appendChild(c)})}function ee(T,R,q){let b=document.createElement("div");b.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${i.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,b.title=R,b.dataset.key=T;let c=document.createElement("div");c.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",c.innerHTML=q||Ge.tasks;let w=document.createElement("div");return w.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",w.textContent=R,b.appendChild(c),b.appendChild(w),b.onmouseenter=()=>{a!==T&&!(T==="history"&&n)&&(b.style.background="#F1F3F4",c.style.transform="scale(1.1)")},b.onmouseleave=()=>{a!==T&&!(T==="history"&&n)&&(b.style.background="transparent",c.style.transform="scale(1)")},b}function I(T){let R=document.getElementById(`cat-anchor-${T}`);R&&(R.scrollIntoView({behavior:"smooth",block:"start"}),a=T,O())}function O(){Object.keys(at).forEach(R=>{let q=l.querySelector(`#cw-sidebar-btn-${R}`);if(q)if(a===R&&!n){let b=wt[R];q.style.background=b.bg,q.style.color=b.color,q.querySelector("div:first-child").style.transform="scale(1.1)"}else q.style.background="transparent",q.style.color=i.textSecondary,q.querySelector("div:first-child").style.transform="scale(1)"});let T=l.querySelector("#cw-sidebar-btn-history");T&&(n?(T.style.background="#3C4043",T.style.color="#FFFFFF"):(T.style.background="transparent",T.style.color=i.textSecondary))}function N(){if(C.innerHTML="",e.trim()!==""){let R=[];if(Object.entries(at).forEach(([b,c])=>{let w=c.links.filter(y=>y.name.toLowerCase().includes(e.toLowerCase())||y.desc.toLowerCase().includes(e.toLowerCase()));R.push(...w.map(y=>({...y,_cat:b})))}),R.length===0){C.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let q=document.createElement("div");q.innerHTML="Resultados da busca",q.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",C.appendChild(q),R.forEach(b=>{let c=X(b,Ge[b._cat],!1,b._cat);C.appendChild(c)});return}Object.entries(at).forEach(([R,q])=>{let b=wt[R],c=document.createElement("div"),w=document.createElement("div");w.id=`cat-anchor-${R}`,w.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${b.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,w.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${b.color};"></div>
            ${q.label}
          `,c.appendChild(w);let y=document.createElement("div");y.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",q.links.forEach(E=>{let v=X(E,Ge[R],!1,R);y.appendChild(v)}),c.appendChild(y),C.appendChild(c)});let T=document.createElement("div");T.style.height="80px",C.appendChild(T)}function X(T,R,q,b){let c=document.createElement("div"),w=wt[b]||wt.history;c.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let y=document.createElement("div");y.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${w.bg}; color: ${w.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,y.innerHTML=R||Ge.tasks;let E=y.querySelector("svg");E&&(E.style.width="22px",E.style.height="22px");let v=document.createElement("div");v.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let L=document.createElement("div");L.style.cssText=`font-size: 14px; font-weight: 600; color: ${i.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,L.textContent=T.name;let S=document.createElement("div");S.style.cssText=`font-size: 12px; color: ${i.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,S.textContent=T.desc,v.appendChild(L),v.appendChild(S);let V=document.createElement("div");return V.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',V.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,V.title="Copiar URL",c.onmouseenter=()=>{c.style.transform="translateY(-2px)",c.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",c.style.borderColor="rgba(0,0,0,0.05)",c.style.borderLeft=`4px solid ${w.color}`,V.style.opacity="1",V.style.background="#F1F3F4"},c.onmouseleave=()=>{c.style.transform="translateY(0)",c.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",c.style.border="1px solid transparent",V.style.opacity="0",V.style.background="transparent"},c.onclick=()=>{!q&&b&&Eo(T,b),window.open(T.url,"_blank")},V.onclick=_=>{_.stopPropagation(),H.playClick(),navigator.clipboard.writeText(T.url),!q&&b&&Eo(T,b),Z("Link copiado!")},c.appendChild(y),c.appendChild(v),c.appendChild(V),c}u.addEventListener("input",T=>{e=T.target.value,N()});function $(){o=!o,me(o,r,"cw-btn-links")}return document.body.appendChild(r),J(),N(),$}var Be=[];function Nt(t){Be=t}var la=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function To(){let t="v4.9",e=!1,o=null,a=null;function n(b){if(!b)return"";try{let c=new Date(b);return isNaN(c.getTime())?String(b):c.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(b)}}if(!document.getElementById("cw-broadcast-hd-css")){let b=document.createElement("style");b.id="cw-broadcast-hd-css",b.innerHTML=`
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
      `,document.head.appendChild(b)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},r={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function s(b){return b?Object.entries(b).map(([c,w])=>`${c.replace(/[A-Z]/g,y=>"-"+y.toLowerCase())}:${w}`).join(";"):""}function d(b){if(!b||typeof b!="string")return"";let c=b;return c=c.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),c=c.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),c=c.replace(/_(.*?)_/g,"<i>$1</i>"),c=c.replace(/\n/g,"<br>"),c=Kt(c),c}let m=document.createElement("div");m.id="broadcast-popup",m.classList.add("cw-module-window"),Object.assign(m.style,ge,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let l={popup:m,googleLine:null};function p(){if(e=!e,me(e,m,"cw-btn-broadcast"),e){let b=document.getElementById("cw-btn-broadcast");b&&b.classList.remove("has-new"),I()}}let x=ue(m,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",l,()=>p()),f=x.querySelector(".cw-header-actions")||x.lastElementChild,g=null;function u(){let b=null;try{b=he()}catch{console.warn("TechSol: Auth Pending")}if(b){let c=b.split("@")[0].toLowerCase(),w=ut.includes(c);if(window._cwIsAdmin=w,window._cwCurrentUser=c,w&&f&&!f.querySelector("#cw-admin-btn")){let y=document.createElement("div");y.id="cw-admin-btn",y.className="cw-btn-interactive",y.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(y.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),y.title="Novo Aviso",y.onclick=E=>{E.stopPropagation(),k()},f.insertBefore(y,f.firstChild),g||F(),N()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(u,2e3))}if(f){let b=document.createElement("button");b.textContent="Limpar",b.className="cw-btn-interactive",Object.assign(b.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),b.onclick=c=>{c.stopPropagation(),H.playSuccess();let w=Be.map(y=>y.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(w)),N(),O()},f.insertBefore(b,f.firstChild)}m.appendChild(x);let C=document.createElement("div");C.id="cw-update-status",C.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",m.appendChild(C);function F(){g=document.createElement("div"),g.className="cw-editor-overlay",g.innerHTML=`
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
      `,g.querySelectorAll('input[name="cw-bc-type"]').forEach(y=>{y.addEventListener("change",()=>{g.querySelectorAll(".cw-radio-option").forEach(E=>E.classList.remove("checked")),y.parentElement.classList.add("checked")})}),setTimeout(()=>{let y=g.querySelector(".cw-radio-option.info");y&&y.classList.add("checked")},100);let b=g.querySelector("#cw-bc-cancel"),c=g.querySelector("#cw-bc-close-x"),w=g.querySelector("#cw-bc-send");b.onclick=P,c.onclick=P,w.onclick=M,m.appendChild(g)}function k(b=null){if(!g)return;let c=g.querySelector("#cw-editor-title-label"),w=g.querySelector("#cw-bc-title"),y=g.querySelector("#cw-bc-text"),E=g.querySelector("#cw-bc-send");if(b){a=b.id,c.textContent="Editar Aviso",w.value=b.title||"",y.value=b.text||"",E.textContent="Salvar Altera\xE7\xF5es";let v=b.type||"info",L=g.querySelector(`input[name="cw-bc-type"][value="${v}"]`);L&&L.click()}else{a=null,c.textContent="Novo Aviso",w.value="",y.value="",E.textContent="Publicar";let v=g.querySelector('input[name="cw-bc-type"][value="info"]');v&&v.click()}g.classList.add("active"),setTimeout(()=>w.focus(),300)}function P(){g&&g.classList.remove("active"),a=null}async function M(){let b=g.querySelector("#cw-bc-send"),c=g.querySelector("#cw-bc-title"),w=g.querySelector("#cw-bc-text"),y=g.querySelector('input[name="cw-bc-type"]:checked'),E=y?y.value:"info";if(!c.value.trim()||!w.value.trim()){Z("Preencha todos os campos!",{error:!0});return}b.textContent="Salvando...",b.style.opacity="0.7";let v=!1;a?v=await de.updateBroadcast(a,{title:c.value,text:w.value,type:E}):v=await de.sendBroadcast({title:c.value,text:w.value,type:E,author:window._cwCurrentUser||"admin"}),v?(Z(a?"Atualizado!":"Publicado!"),H.playSuccess(),P(),setTimeout(()=>I(),1500)):(Z("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),b.textContent=a?"Salvar Altera\xE7\xF5es":"Publicar",b.style.opacity="1")}async function J(b){if(await ye("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await de.deleteBroadcast(b)){Z("Aviso removido."),H.playClick();let y=Be.findIndex(E=>E.id===b);y>-1&&Be.splice(y,1),N(),setTimeout(()=>I(),1500)}else Z("Erro ao excluir.",{error:!0})}let ee=document.createElement("div");ee.className="cw-nice-scroll",Object.assign(ee.style,i.feedContainer),m.appendChild(ee);async function I(){e&&(C.style.display="block",C.innerHTML="\u{1F504} Sincronizando...");try{let b=await de.fetchData();b&&b.broadcast&&(Nt(b.broadcast),O(),e&&(N(),C.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{C.style.display="none"},1500)))}catch{e&&(C.innerHTML="\u26A0\uFE0F Offline")}}function O(){let b=document.getElementById("cw-btn-broadcast");if(!b)return;let c=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Be.some(y=>!c.includes(y.id))){if(b.classList.add("has-new"),!b.querySelector(".cw-badge")){let y=document.createElement("div");y.className="cw-badge",Object.assign(y.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),b.appendChild(y)}}else{b.classList.remove("has-new");let y=b.querySelector(".cw-badge");y&&y.remove()}}function N(){ee.innerHTML="";let b=m.querySelector("#cw-bau-widget");b&&b.remove();let c=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),w=[...Be].sort((S,V)=>{let _=new Date(S.date).getTime()||0;return(new Date(V.date).getTime()||0)-_}),y=w.findIndex(S=>S.title&&S.title.toLowerCase().includes("disponibilidade bau"));if(y!==-1){let S=w[y];w.splice(y,1);let V=document.createElement("div");V.id="cw-bau-widget",Object.assign(V.style,i.bauContainer);let _=[],B=(S.text||"").split(`
`),G=/\d{1,2}\/\d{1,2}/,A="\u{1F4C5}";if(B.forEach(D=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(D)?A="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(D)&&(A="\u{1F1EA}\u{1F1F8}");let W=D.match(G);if(W){let Q=W[0],j=A;/🇧🇷|🇵🇹|PT|BR/i.test(D)?j="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(D)&&(j="\u{1F1EA}\u{1F1F8}"),_.some(U=>U.flag===j&&U.date===Q)||_.push({flag:j,date:Q})}}),_.length===0){let D=(S.text||"").match(/\d{1,2}\/\d{1,2}/g);D&&[...new Set(D)].forEach(W=>_.push({flag:"\u{1F4C5}",date:W}))}let K="",ae='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(ae=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${ae}
              `),_.length>0?K=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${_.map(W=>`
                  <div style="${s(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${s(i.bauFlag)}">${W.flag}</span>
                      <span style="${s(i.bauDate)}">${W.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${ae}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${d(S.text)}</div>
              `:K=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${d(S.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,V.innerHTML=`
              <div style="${s(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${s(i.liveIndicator)}">
                      <div style="${s(i.pulseDot)}"></div>
                      <span style="${s(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${n(S.date)}</div>
              </div>
              ${K}
          `,C.after(V);let oe=V.querySelector("#cw-bau-toggle-btn"),h=V.querySelector("#cw-bau-full");if(oe&&h&&(oe.onclick=()=>{let D=h.style.display==="none";h.style.display=D?"block":"none",oe.textContent=D?"Ocultar":"Detalhes"}),window._cwIsAdmin){let D=V.querySelector(".cw-bau-edit");D&&(D.onclick=()=>k(S))}}let E=w.sort((S,V)=>{let _=c.includes(S.id),B=c.includes(V.id);return _===B?0:_?1:-1});if(E.length===0&&!y){let S=document.createElement("div");Object.assign(S.style,i.emptyState),S.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,ee.appendChild(S)}let v=E.filter(S=>!c.includes(S.id)),L=E.filter(S=>c.includes(S.id));if(v.forEach(S=>ee.appendChild(X(S,!1))),L.length>0){let S=document.createElement("div");Object.assign(S.style,i.historyDivider),S.innerHTML=`<span>Hist\xF3rico (${L.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let V=document.createElement("div");Object.assign(V.style,i.historyContainer),L.forEach(B=>V.appendChild(X(B,!0)));let _=!1;S.onclick=()=>{H.playClick(),_=!_,V.style.display=_?"flex":"none",S.querySelector("svg").style.transform=_?"rotate(180deg)":"rotate(0deg)"},ee.appendChild(S),ee.appendChild(V)}}function X(b,c){let w=document.createElement("div");Object.assign(w.style,c?i.cardHistory:i.card);let y=r[b.type]||r.info,E=document.createElement("div");Object.assign(E.style,i.cardHeader);let v=document.createElement("div");Object.assign(v.style,i.typeTag,{color:y.color,background:y.bg}),v.innerHTML=`${y.icon} <span>${b.type}</span>`;let L=document.createElement("span");if(Object.assign(L.style,i.dateTag),L.textContent=n(b.date),E.appendChild(v),c)E.appendChild(L);else{let G=document.createElement("button");G.className="cw-btn-interactive",Object.assign(G.style,i.dismissBtn),G.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',G.onmouseenter=()=>{G.style.color="#1e8e3e",G.style.background="#e6f4ea",G.style.borderColor="#1e8e3e"},G.onmouseleave=()=>{G.style.color="#5f6368",G.style.background="#fff",G.style.borderColor="rgba(0,0,0,0.1)"},G.onclick=A=>{A.stopPropagation(),H.playClick(),w.style.transform="translateX(20px)",w.style.opacity="0",setTimeout(()=>{let K=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");K.push(b.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(K)),N(),O()},200)},E.appendChild(G)}let S=document.createElement("div");Object.assign(S.style,i.cardContent);let V=document.createElement("div");Object.assign(V.style,i.msgTitle),V.textContent=b.title;let _=document.createElement("div");Object.assign(_.style,i.msgBody),_.innerHTML=d(b.text);let B=document.createElement("div");if(Object.assign(B.style,i.msgMeta),B.innerHTML=`Publicado por <b>${b.author||"Sistema"}</b>`,c||(B.innerHTML+=` \u2022 ${n(b.date)}`),S.appendChild(V),S.appendChild(_),S.appendChild(B),w.appendChild(E),w.appendChild(S),window._cwIsAdmin){let G=document.createElement("div");G.className="cw-card-actions";let A=document.createElement("button");A.className="cw-action-btn edit",A.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',A.onclick=()=>k(b);let K=document.createElement("button");K.className="cw-action-btn delete",K.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',K.onclick=()=>J(b.id),G.appendChild(A),G.appendChild(K),w.appendChild(G)}return w}let $=de.getCachedBroadcasts();$.length>0&&(Nt($),N()),setTimeout(u,500),I(),o||(o=setInterval(I,la));let T=document.createElement("div");Object.assign(T.style,Oe),T.className="no-drag",m.appendChild(T),Le(m,T),document.body.appendChild(m);let R=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),q=Be.some(b=>!R.includes(b.id));return{toggle:p,hasUnread:q}}function Fo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},a=document.createElement("div");Object.assign(a.style,o.overlay);let n=document.createElement("div");Object.assign(n.style,o.card);let i=document.createElement("div");Object.assign(i.style,o.icon);let r=document.createElement("div");Object.assign(r.style,o.title);let s=document.createElement("div");Object.assign(s.style,o.text);let d=document.createElement("div");Object.assign(d.style,o.dotsContainer);let m=document.createElement("div");Object.assign(m.style,o.btnContainer);let l=document.createElement("button");l.textContent="Pular",Object.assign(l.style,o.btn,o.btnSkip),l.onmouseover=()=>l.style.color="#202124",l.onmouseout=()=>l.style.color="#5f6368";let p=document.createElement("button");p.textContent="Pr\xF3ximo",Object.assign(p.style,o.btn,o.btnNext),p.onmouseover=()=>p.style.transform="scale(1.05)",p.onmouseout=()=>p.style.transform="scale(1)",m.appendChild(l),m.appendChild(p),n.appendChild(i),n.appendChild(r),n.appendChild(s),n.appendChild(d),n.appendChild(m),a.appendChild(n),document.body.appendChild(a);function x(g){let u=t[g];i.textContent=u.icon,r.textContent=u.title,s.textContent=u.text,d.innerHTML="",t.forEach((C,F)=>{let k=document.createElement("div");Object.assign(k.style,o.dot),F===g&&Object.assign(k.style,o.dotActive),d.appendChild(k)}),u.isLast?(l.style.display="none",p.textContent="Come\xE7ar \u{1F680}",p.style.width="100%"):(l.style.display="block",p.textContent="Pr\xF3ximo",p.style.width="auto")}function f(){localStorage.setItem("cw_onboarding_seen_v1","true"),a.style.opacity="0",n.style.transform="translateY(20px)",setTimeout(()=>a.remove(),400),H.playSuccess(),Z("Tudo pronto! Use o menu flutuante.")}p.onclick=()=>{H.playClick(),e<t.length-1?(e++,x(e)):f()},l.onclick=async()=>{await ye("Pular o tutorial?")&&f()},x(0),requestAnimationFrame(()=>{a.style.opacity="1",n.style.transform="translateY(0)"})}var Oo={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function Lo(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&ca(t)}function ca(t){let e=Oo.slides,o=0,a={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,a.overlay);let i=document.createElement("div");Object.assign(i.style,a.card);let r=document.createElement("div");Object.assign(r.style,a.badge),r.textContent=`Atualiza\xE7\xE3o ${t}`;let s=document.createElement("div");Object.assign(s.style,a.icon);let d=document.createElement("div");Object.assign(d.style,a.title);let m=document.createElement("div");Object.assign(m.style,a.text);let l=document.createElement("div");Object.assign(l.style,a.dotsContainer);let p=document.createElement("button");Object.assign(p.style,a.btn),p.onmouseover=()=>p.style.transform="scale(1.02)",p.onmouseout=()=>p.style.transform="scale(1)",i.appendChild(r),i.appendChild(s),i.appendChild(d),i.appendChild(m),i.appendChild(l),i.appendChild(p),n.appendChild(i),document.body.appendChild(n);function x(g){let u=e[g];s.textContent=u.icon,d.textContent=u.title,m.textContent=u.text,l.innerHTML="",e.forEach((C,F)=>{let k=document.createElement("div");Object.assign(k.style,a.dot),F===g&&Object.assign(k.style,a.dotActive),l.appendChild(k)}),g===e.length-1?p.textContent="Entendi, vamos l\xE1! \u{1F44D}":p.textContent="Pr\xF3ximo"}function f(){localStorage.setItem("cw_last_version",t),n.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>n.remove(),400),H.playSuccess(),Z(`TechSol atualizado para ${t}!`)}p.onclick=()=>{H.playClick(),o<e.length-1?(o++,x(o)):f()},x(0),requestAnimationFrame(()=>{n.style.opacity="1",i.style.transform="translateY(0)"})}var Io="cw_timezone_pinned",zt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],da=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function qo(){let t="v2.2 Pro",e=!1,o=null,a="mx",n=JSON.parse(localStorage.getItem(Io)||"[]"),i="",r="all",s=new Date;s.setHours(14,0,0,0);let d={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},m={container:{display:"flex",flexDirection:"column",height:"100%",background:d.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:d.surface,borderBottom:`1px solid ${d.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:d.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:d.primary,borderBottomColor:d.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:d.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:d.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${d.border}`,background:d.surface,color:d.textSub,transition:"all 0.2s"},chipActive:{background:d.primaryBg,color:d.primary,borderColor:d.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:d.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${d.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:d.surface,border:`1px solid ${d.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:d.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},l=document.createElement("div");l.id="timezone-popup",l.classList.add("cw-module-window"),Object.assign(l.style,ge,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let x=ue(l,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:l},()=>c());l.appendChild(x);let f=document.createElement("div");Object.assign(f.style,m.container),l.appendChild(f);let g=document.createElement("div");Object.assign(g.style,m.tabHeader);let u=document.createElement("div");u.textContent="Monitoramento",Object.assign(u.style,m.tabBtn,m.tabActive);let C=document.createElement("div");C.textContent="Planejador",Object.assign(C.style,m.tabBtn),g.appendChild(u),g.appendChild(C),f.appendChild(g);let F=document.createElement("div");Object.assign(F.style,m.toolbar);let k=document.createElement("div");Object.assign(k.style,m.searchInputWrapper);let P=document.createElement("div");P.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(P.style,m.searchIcon);let M=document.createElement("input");M.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(M.style,m.searchInput),M.onfocus=()=>{M.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",M.style.borderColor="rgba(26,115,232,0.3)"},M.onblur=()=>{M.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",M.style.borderColor="transparent"},M.oninput=w=>{i=w.target.value.toLowerCase(),T()},k.appendChild(P),k.appendChild(M),F.appendChild(k);let J=document.createElement("div");Object.assign(J.style,m.chipsRow),da.forEach(w=>{let y=document.createElement("div");y.textContent=w.label,y.id=`tz-filter-${w.id}`,Object.assign(y.style,m.chip),w.id===r&&Object.assign(y.style,m.chipActive),y.onclick=()=>{H.playClick(),r=w.id,Array.from(J.children).forEach(E=>{Object.assign(E.style,m.chip)}),Object.assign(y.style,m.chipActive),T()},J.appendChild(y)}),F.appendChild(J),f.appendChild(F);let ee=document.createElement("div");Object.assign(ee.style,m.listContainer);let I=document.createElement("style");I.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",f.appendChild(I);let O=document.createElement("div");Object.assign(O.style,m.plannerWrapper,{display:"none"}),f.appendChild(ee),f.appendChild(O),u.onclick=()=>N("live"),C.onclick=()=>N("plan");function N(w){H.playClick(),w==="live"?(Object.assign(u.style,m.tabActive),Object.assign(C.style,m.tabBtn),C.style.borderBottomColor="transparent",ee.style.display="flex",F.style.display="flex",O.style.display="none",q()):(Object.assign(C.style,m.tabActive),Object.assign(u.style,m.tabBtn),u.style.borderBottomColor="transparent",O.style.display="flex",ee.style.display="none",F.style.display="none",b(),R())}function X(w){return w>=9&&w<17?{color:d.success,bg:d.successBg,label:"Aberto",icon:"\u{1F7E2}"}:w>=8&&w<9?{color:d.warning,bg:d.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:w>=17&&w<19?{color:d.warning,bg:d.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:d.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function $(w){n.includes(w)?n=n.filter(y=>y!==w):n.push(w),localStorage.setItem(Io,JSON.stringify(n)),T(),H.playClick()}function T(){ee.innerHTML="";let w=new Date,y=zt.filter(v=>{let L=v.name.toLowerCase().includes(i)||v.label.toLowerCase().includes(i),S=r==="all"||v.region===r;return L&&S});if(y.sort((v,L)=>{let S=n.includes(v.id),V=n.includes(L.id);return S&&!V?-1:!S&&V?1:v.name.localeCompare(L.name)}),y.length===0){ee.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}y.forEach(v=>{let L=n.includes(v.id),S=w.toLocaleTimeString("pt-BR",{timeZone:v.zone,hour:"2-digit",minute:"2-digit"}),V=parseInt(S.split(":")[0]),_=X(V),B=V<6||V>18,G=document.createElement("div");Object.assign(G.style,m.hubCard),L&&Object.assign(G.style,m.hubCardPinned);let A=L?"\u2605":"\u2606",K=L?"#F9AB00":"#DADCE0";G.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${K}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${A}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${v.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${d.text}; letter-spacing:-0.2px;">${v.name}</div>
                        <div style="font-size:12px; color:${d.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${B?"\u{1F319}":"\u2600\uFE0F"} ${v.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${d.text}; font-family:'Google Sans', sans-serif;">${S}</div>
                    <div style="font-size:11px; font-weight:600; color:${_.color}; background:${_.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${_.label}
                    </div>
                </div>
            `,G.onmouseenter=()=>{G.style.transform="translateY(-2px)",G.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},G.onmouseleave=()=>{G.style.transform="translateY(0)",G.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let ae=G.querySelector(".cw-pin-btn");ae.onmouseenter=()=>{ae.style.backgroundColor="#F1F3F4"},ae.onmouseleave=()=>{ae.style.backgroundColor="transparent"},ae.onclick=oe=>{oe.stopPropagation(),$(v.id)},G.onclick=()=>{a=v.id,N("plan")},ee.appendChild(G)});let E=document.createElement("div");E.style.height="20px",E.style.width="100%",ee.appendChild(E)}function R(){O.innerHTML="";let w=document.createElement("div"),y=document.createElement("label");y.textContent="Onde est\xE1 o cliente?",y.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let E=document.createElement("select");Object.assign(E.style,Yt),E.style.padding="14px",[...zt].sort((te,U)=>te.name.localeCompare(U.name)).forEach(te=>{let U=document.createElement("option");U.value=te.id,U.textContent=`${te.flag} ${te.name} (${te.zone})`,te.id===a&&(U.selected=!0),E.appendChild(U)}),E.onchange=te=>{a=te.target.value,j(),H.playClick()},w.appendChild(y),w.appendChild(E),O.appendChild(w);let L=document.createElement("div");Object.assign(L.style,m.timeComparisonRow);let S=document.createElement("div");Object.assign(S.style,m.timeCard),S.style.backgroundColor="#F8FAFF",S.style.borderColor="#E8F0FE",S.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let V=document.createElement("div");Object.assign(V.style,m.timeCard),V.style.backgroundColor="#FFF8E1",V.style.borderColor="#FEF7E0",V.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,L.appendChild(S),L.appendChild(V),O.appendChild(L);let _=document.createElement("div");_.id="cw-planner-status",Object.assign(_.style,m.statusBadge),O.appendChild(_);let B=document.createElement("div");Object.assign(B.style,{padding:"0 4px",marginTop:"12px"});let G=document.createElement("div");G.textContent="Arraste para simular o hor\xE1rio:",G.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let A=document.createElement("div");Object.assign(A.style,m.timelineContainer);let K=document.createElement("div");Object.assign(K.style,m.timelineTrack);let ae=document.createElement("div");Object.assign(ae.style,m.dayZone),K.appendChild(ae);let oe=document.createElement("input");oe.type="range",oe.min="0",oe.max="1439",oe.step="15",oe.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let h=document.createElement("div");h.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",h.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",A.appendChild(K),A.appendChild(oe),A.appendChild(h),B.appendChild(G),B.appendChild(A),O.appendChild(B);let D=S.querySelector("#cw-time-input-br"),W=V.querySelector("#cw-time-display-client"),Q=V.querySelector("#cw-client-label");function j(){let te=zt.find(Fe=>Fe.id===a);Q.textContent=`${te.flag} ${te.label} (${te.zone})`;let U=s.getHours(),ne=s.getMinutes(),ce=`${String(U).padStart(2,"0")}:${String(ne).padStart(2,"0")}`;D.value=ce,oe.value=U*60+ne;let Te=s.toLocaleTimeString("pt-BR",{timeZone:te.zone,hour:"2-digit",minute:"2-digit"});W.textContent=Te;let Ee=parseInt(Te.split(":")[0]);Ee>=9&&Ee<17?(_.style.background=d.successBg,_.style.color=d.success,_.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):Ee>=8&&Ee<9||Ee>=17&&Ee<19?(_.style.background=d.warningBg,_.style.color=d.warning,_.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(_.style.background=d.errorBg,_.style.color=d.error,_.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}oe.oninput=te=>{let U=parseInt(te.target.value);s.setHours(Math.floor(U/60)),s.setMinutes(U%60),j()},D.oninput=te=>{let[U,ne]=te.target.value.split(":");U&&ne&&(s.setHours(parseInt(U)),s.setMinutes(parseInt(ne)),j())},j()}function q(){T(),o||(o=setInterval(T,6e4))}function b(){o&&(clearInterval(o),o=null)}function c(){e=!e,me(e,l,"cw-btn-timezone"),e?N("live"):b()}return document.body.appendChild(l),c}function _o(){let t="v1.1",e=!1,o="general",a=null,n=null,i={tabs:{general:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>',email:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0 1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'},actions:{copy:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',delete:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',add:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'},toolbar:{bold:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',italic:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',code:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',image:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'},empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(26, 115, 232, 0.2)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>',media:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'};if(!document.getElementById("cw-lib-styles")){let q=document.createElement("style");q.id="cw-lib-styles",q.innerHTML=`
            @keyframes geminiAura {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            .cw-aura-card {
                transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
                background: rgba(255, 255, 255, 0.7) !important;
                backdrop-filter: blur(16px) !important;
                border: 1px solid rgba(255, 255, 255, 0.4) !important;
                position: relative;
                z-index: 1;
            }
            .cw-aura-card::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: linear-gradient(135deg, rgba(138, 180, 248, 0.15), rgba(197, 138, 249, 0.15), rgba(242, 139, 130, 0.15));
                background-size: 400% 400%;
                z-index: -1;
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            .cw-aura-card:hover {
                transform: translateY(-6px) scale(1.01);
                box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
                border-color: rgba(255, 255, 255, 0.8) !important;
            }
            .cw-aura-card:hover::before {
                opacity: 1;
                animation: geminiAura 8s ease infinite;
            }
            .cw-tactile { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.96) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 10px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #474747; }
            .cw-toolbar-btn:hover { background: rgba(0,0,0,0.04); color: #1a73e8; }
            .cw-toolbar-btn.active { background: rgba(26, 115, 232, 0.1); color: #1a73e8; border-color: rgba(26, 115, 232, 0.2); }
            .cw-shimmer {
                background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
            }
        `,document.head.appendChild(q)}let r={bg:"linear-gradient(180deg, #F8FAFD 0%, #EEF2F8 100%)",surface:"rgba(255, 255, 255, 0.85)",glass:"rgba(255, 255, 255, 0.7)",primary:"#1a73e8",primaryLight:"rgba(26, 115, 232, 0.1)",text:"#1f1f1f",textSub:"#474747",border:"rgba(0, 0, 0, 0.06)",danger:"#d93025"},s={container:{display:"flex",flexDirection:"column",height:"100%",background:r.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"16px 24px 0 24px",background:"transparent",borderBottom:`1px solid ${r.border}`,gap:"8px"},tabBtn:{flex:1,padding:"14px 16px",textAlign:"center",cursor:"pointer",fontSize:"14px",fontWeight:"500",color:r.textSub,borderBottom:"3px solid transparent",transition:"all 0.3s ease",userSelect:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",borderRadius:"12px 12px 0 0"},tabActive:{color:r.primary,borderBottomColor:r.primary,fontWeight:"600",background:"rgba(26, 115, 232, 0.04)"},listContainer:{flex:1,overflowY:"auto",padding:"24px",display:"flex",flexDirection:"column",gap:"16px"},emptyState:{padding:"60px 24px",textAlign:"center",color:r.textSub,display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},card:{background:r.surface,borderRadius:"24px",padding:"20px",border:`1px solid ${r.border}`,boxShadow:"0 4px 12px rgba(0,0,0,0.03)",transition:"all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",cursor:"default",position:"relative"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},cardTitle:{fontSize:"15px",fontWeight:"600",color:r.text,letterSpacing:"-0.01em"},cardPreview:{fontSize:"13px",color:r.textSub,lineHeight:"1.6",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"16px",paddingTop:"16px",borderTop:`1px solid ${r.border}`},actionBtn:{padding:"8px 14px",borderRadius:"10px",fontSize:"13px",fontWeight:"500",cursor:"pointer",border:"none",background:"transparent",transition:"all 0.2s",display:"flex",alignItems:"center",gap:"6px"},fab:{position:"absolute",bottom:"32px",right:"32px",width:"64px",height:"64px",borderRadius:"20px",background:`linear-gradient(135deg, ${r.primary}, #0059c1)`,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.9)",backdropFilter:"blur(30px) saturate(180%)",webkitBackdropFilter:"blur(30px) saturate(180%)",zIndex:20,transform:"translateY(100%)",transition:"transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"24px 32px",background:"transparent",borderBottom:`1px solid ${r.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"32px",overflowY:"auto"},inputGroup:{marginBottom:"24px"},label:{display:"block",fontSize:"13px",fontWeight:"600",color:r.textSub,marginBottom:"10px",letterSpacing:"0.02em"},input:{width:"100%",padding:"14px 18px",borderRadius:"14px",border:`1px solid ${r.border}`,fontSize:"15px",fontFamily:"inherit",outline:"none",background:r.surface,transition:"all 0.2s ease",boxSizing:"border-box"}},d=document.createElement("div");d.id="library-popup",d.classList.add("cw-module-window"),Object.assign(d.style,ge,{right:"auto",left:"50%",width:"400px",height:"600px",transform:"translateX(-50%) scale(0.05)"});let l=ue(d,"Minha Biblioteca",t,"Gerencie seus snippets, textos e templates.",{popup:d},()=>R());d.appendChild(l);let p=document.createElement("div");Object.assign(p.style,s.container),d.appendChild(p);let x=document.createElement("div");Object.assign(x.style,s.tabHeader);let f=[{id:"general",label:"Geral",icon:i.tabs.general},{id:"note",label:"Notas",icon:i.tabs.note},{id:"email",label:"Emails",icon:i.tabs.email}];f.forEach(q=>{let b=document.createElement("div");b.innerHTML=`${q.icon} <span>${q.label}</span>`,b.id=`lib-tab-${q.id}`,Object.assign(b.style,s.tabBtn),q.id===o&&Object.assign(b.style,s.tabActive),b.onmouseenter=()=>H.playHover(),b.onclick=()=>ee(q.id),x.appendChild(b)}),p.appendChild(x);let g=document.createElement("div");Object.assign(g.style,s.listContainer),p.appendChild(g);let u=document.createElement("div");u.className="cw-fab cw-tactile",Object.assign(u.style,s.fab),u.innerHTML=i.actions.add,u.onmouseenter=()=>{u.style.transform="scale(1.1)",u.style.boxShadow="0 12px 32px rgba(26, 115, 232, 0.5)"},u.onmouseleave=()=>{u.style.transform="scale(1)",u.style.boxShadow="0 8px 24px rgba(26, 115, 232, 0.4)"},u.onclick=()=>O(),p.appendChild(u),a=document.createElement("div"),Object.assign(a.style,s.editorOverlay);let C=document.createElement("div");Object.assign(C.style,s.editorHeader),C.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let F=document.createElement("button");F.innerHTML="Cancelar",F.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",F.onclick=N,C.appendChild(F),a.appendChild(C);let k=document.createElement("div");Object.assign(k.style,s.editorBody),a.appendChild(k);let P=document.createElement("div");P.style.cssText="padding:24px 32px; border-top:1px solid rgba(0,0,0,0.06); background:transparent; display:flex; justify-content:flex-end;";let M=document.createElement("button");M.textContent="Salvar",M.style.cssText="padding:12px 32px; background:linear-gradient(135deg, #1a73e8, #0059c1); color:white; border:none; border-radius:14px; font-weight:600; cursor:pointer; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition: all 0.2s;",M.onclick=X,P.appendChild(M),a.appendChild(P),p.appendChild(a);let J=document.createElement("div");Object.assign(J.style,Oe),J.className="no-drag",d.appendChild(J),Le(d,J),document.body.appendChild(d);function ee(q){H.playClick(),o=q,f.forEach(b=>{let c=document.getElementById(`lib-tab-${b.id}`);b.id===q?Object.assign(c.style,s.tabActive):Object.assign(c.style,s.tabBtn)}),I()}function I(){g.innerHTML="";let q=ve.getSnippets(o);if(q.length===0){g.innerHTML=`
                <div style="${T(s.emptyState)}">
                    <div style="opacity:0.8;">${i.empty}</div>
                    <div style="font-weight:600; font-size:16px; color:${r.text};">Nada aqui ainda.</div>
                    <div style="font-size:14px; opacity:0.7;">Clique no bot\xE3o de adicionar para come\xE7ar sua cole\xE7\xE3o.</div>
                </div>
            `;return}q.forEach(b=>{let c=document.createElement("div");c.className="cw-aura-card",Object.assign(c.style,s.card),b.isCode&&(c.style.borderLeft=`4px solid ${r.primary}`,c.style.background="rgba(26, 115, 232, 0.02)");let w=b.content,y="";if(b.isRich){let E=document.createElement("div");E.innerHTML=b.content;let v=E.querySelector("img");w=E.innerText.substring(0,150)+(E.innerText.length>150?"...":""),v&&(y=`<span style="display:inline-flex; align-items:center; background:rgba(26, 115, 232, 0.1); color:#1a73e8; padding:2px 8px; border-radius:10px; font-size:11px; margin-bottom:8px; font-weight:600;">${i.media} Media</span>`)}c.innerHTML=`
                <div style="${T(s.cardHeader)}">
                    <div style="${T(s.cardTitle)}">${b.title}</div>
                    <div style="display:flex; gap:6px;">
                        ${b.isCode?'<span style="font-size:10px; background:rgba(0,0,0,0.05); color:#474747; padding:3px 8px; border-radius:6px; font-family:monospace; font-weight:700;">CODE</span>':""}
                        ${o==="email"?'<span style="font-size:10px; background:rgba(26, 115, 232, 0.1); color:#1a73e8; padding:3px 8px; border-radius:6px; font-weight:700;">TEMPLATE</span>':""}
                    </div>
                </div>
                ${y}
                <div style="${T(s.cardPreview)}; ${b.isCode?"font-family:'Roboto Mono', monospace; font-size:12px; background:rgba(0,0,0,0.02); padding:12px; border-radius:12px;":""}">${w}</div>
                <div style="${T(s.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${T(s.actionBtn)}; color:#1a73e8;">
                        ${i.actions.copy}
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${T(s.actionBtn)}; color:#474747;">
                        ${i.actions.edit}
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${T(s.actionBtn)}; color:#d93025;">
                        ${i.actions.delete}
                        <span>Excluir</span>
                    </button>
                </div>
            `,c.onmouseenter=()=>{H.playHover()},c.querySelector(".cw-act-copy").onclick=E=>{if(E.stopPropagation(),H.playClick(),b.isRich){let v=new Blob([b.content],{type:"text/html"}),L=document.createElement("div");L.style.whiteSpace="pre-wrap",L.innerHTML=b.content;let S=new Blob([L.innerText],{type:"text/plain"}),V=[new ClipboardItem({"text/html":v,"text/plain":S})];navigator.clipboard.write(V)}else navigator.clipboard.writeText(b.content);Z("Copiado!")},c.querySelector(".cw-act-edit").onclick=E=>{E.stopPropagation(),H.playClick(),O(b)},c.querySelector(".cw-act-del").onclick=async E=>{E.stopPropagation(),H.playClick(),await ye("Excluir este item?")&&(ve.delete(b.id),I(),Z("Item exclu\xEDdo."))},g.appendChild(c)})}function O(q=null){n=q?q.id:null,k.innerHTML="",k.appendChild($("title","T\xEDtulo / Nome",q?q.title:"")),o==="email"&&k.appendChild($("subject","Assunto do Email",q?q.subject:""));let b="Conte\xFAdo";o==="email"&&(b="Corpo do Email (HTML)"),o==="note"&&(b="Texto da Nota (Reason)"),k.appendChild($("content",b,q?q.content:"",{isRich:!0,isCode:q?q.isCode:!1})),C.querySelector("span").textContent=q?"Editar Item":"Novo Item",a.style.transform="translateY(0)",setTimeout(()=>{let c=k.querySelector("input");c&&c.focus()},300)}function N(){a.style.transform="translateY(100%)",setTimeout(()=>n=null,300)}async function X(){let q=k.querySelector("#cw-inp-title"),b=k.querySelector("#cw-inp-content"),c=q.value.trim(),w=b.contentEditable==="true"?b.innerHTML:b.value.trim(),y=b.getAttribute("data-is-code")==="true";if(!c||!w||w==="<br>"){Z("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let E={id:n,type:o,title:c,content:w,isCode:y,isRich:b.contentEditable==="true"};if(o==="email"){let v=k.querySelector("#cw-inp-subject").value.trim();if(!v){Z("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}E.subject=v}M.textContent="Salvando...",await ve.save(E),M.textContent="Salvar",N(),I(),Z("Salvo com sucesso!"),H.playSuccess()}function $(q,b,c,w={}){let y=document.createElement("div");Object.assign(y.style,s.inputGroup);let E=document.createElement("label");E.textContent=b,Object.assign(E.style,s.label);let v;if(w.isRich){let L=document.createElement("div");L.style.cssText="display:flex; gap:8px; margin-bottom:14px; background:rgba(255, 255, 255, 0.5); padding:8px; border-radius:14px; border:1px solid rgba(0,0,0,0.06); backdrop-filter: blur(10px); width: fit-content;",L.innerHTML=`
                <button type="button" class="cw-toolbar-btn cw-tb-bold cw-tactile" title="Negrito">
                    ${i.toolbar.bold}
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-italic cw-tactile" title="It\xE1lico">
                    ${i.toolbar.italic}
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-code cw-tactile" title="Formato C\xF3digo">
                    ${i.toolbar.code}
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-img cw-tactile" title="Inserir Imagem">
                    ${i.toolbar.image}
                </button>
            `,v=document.createElement("div"),v.contentEditable="true",Object.assign(v.style,s.input,{minHeight:"180px",maxHeight:"350px",overflowY:"auto",whiteSpace:"pre-wrap",lineHeight:"1.6",outline:"none"}),v.innerHTML=c||"",w.isCode&&(v.style.fontFamily="'Roboto Mono', monospace",v.style.backgroundColor="#F8F9FA",v.setAttribute("data-is-code","true")),L.querySelectorAll(".cw-toolbar-btn").forEach(S=>{S.onmouseenter=()=>H.playHover(),S.onmousedown=()=>H.playClick()}),L.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),v.focus()},L.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),v.focus()},L.querySelector(".cw-tb-code").onclick=S=>{let _=!(v.getAttribute("data-is-code")==="true");v.setAttribute("data-is-code",_),v.style.fontFamily=_?"'Roboto Mono', monospace":"inherit",v.style.backgroundColor=_?"rgba(0, 122, 255, 0.03)":r.surface,_?S.currentTarget.classList.add("active"):S.currentTarget.classList.remove("active"),v.focus()},L.querySelector(".cw-tb-img").onclick=async()=>{let S=await eo("Cole a URL da imagem:");S&&(document.execCommand("insertImage",!1,S),v.querySelectorAll("img").forEach(_=>{_.style.maxWidth="100%",_.style.borderRadius="8px"}))},v.onpaste=S=>{let V=(S.clipboardData||S.originalEvent.clipboardData).items;for(let _ of V)if(_.kind==="file"&&_.type.startsWith("image/")){S.preventDefault();let B=_.getAsFile(),G=new FileReader;G.onload=A=>{let K=`<img src="${A.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;document.execCommand("insertHTML",!1,K)},G.readAsDataURL(B)}},y.appendChild(E),y.appendChild(L)}else v=document.createElement("input"),v.type="text",Object.assign(v.style,s.input),v.value=c||"",y.appendChild(E);return v.id=`cw-inp-${q}`,v.onfocus=()=>{v.style.borderColor=r.primary,v.style.boxShadow=`0 0 0 2px ${r.primaryBg}`},v.onblur=()=>{v.style.borderColor=r.border,v.style.boxShadow="none"},y.appendChild(v),y}function T(q){return Object.entries(q).map(([b,c])=>`${b.replace(/[A-Z]/g,w=>"-"+w.toLowerCase())}:${c}`).join(";")}function R(){e=!e,me(e,d,"cw-btn-library"),e&&I()}return R}function Mo(){let t="v1.0",e=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},a="cw-configs-styles";if(!document.getElementById(a)){let g=document.createElement("style");g.id=a,g.innerHTML=`
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
        `,document.head.appendChild(g)}let n=document.createElement("div");n.id="configs-popup",n.classList.add("cw-module-window"),Object.assign(n.style,ge,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r=ue(n,"Configura\xE7\xF5es",t,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:n},()=>f());n.appendChild(r);let s=document.createElement("div");s.className="cw-configs-container",n.appendChild(s);let d=document.createElement("div");d.className="cw-profile-card",d.id="cw-user-profile-section",d.style.display="none",s.appendChild(d);async function m(){d.style.display="flex",d.innerHTML=`
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
        `;try{let g=$e(),u=g?g.split("@")[0]:"user",C=await nt(u);if(!C){d.innerHTML=`
                    <div class="cw-profile-avatar" style="background: #e8eaed; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5f6368; font-weight: bold;">
                        ${u.charAt(0).toUpperCase()}
                    </div>
                    <div class="cw-profile-info">
                        <h2 class="cw-profile-ldap">@${u}</h2>
                        <div class="cw-profile-badges">
                            <span class="cw-profile-badge">Consultor</span>
                        </div>
                        <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                            Perfil n\xE3o localizado na base de dados.
                        </div>
                    </div>
                `;return}d.innerHTML=`
                <img src="https://moma-teams-photos.corp.google.com/photos/${C.ldap}?sz=600&type=PLUS"
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
            `}catch(g){console.warn("Erro ao renderizar perfil:",g),d.style.display="none"}}m();let l=document.createElement("div");l.className="cw-configs-section",l.innerHTML=`
        <div class="cw-configs-section-title">Prefer\xEAncias de Som</div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label">Efeitos Sonoros</div>
                    <div class="cw-configs-desc">Ativar ou desativar sons de interface.</div>
                </div>
                <input type="checkbox" id="cw-config-sound-toggle" ${H.isMuted()?"":"checked"} style="cursor:pointer; width:20px; height:20px;">
            </div>
        </div>
    `;let p=l.querySelector("#cw-config-sound-toggle");p.onchange=g=>{H.setMuted(!g.target.checked),g.target.checked&&H.playClick()},s.appendChild(l);let x=document.createElement("div");x.className="cw-configs-section",x.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank">Reportar Bug/Sugest\xF5es</a>
            </div>
        </div>
    `,s.appendChild(x);function f(){e=!e,me(e,n,"cw-btn-configs"),e&&H.playClick()}return document.body.appendChild(n),f}var St={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"};var Ue="cubic-bezier(0.4, 0, 0.2, 1)",Fr=`all 0.3s ${Ue}`,Do=()=>{if(document.getElementById("bau-form-global-styles"))return;let t=document.createElement("style");t.id="bau-form-global-styles",t.textContent=`
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
      animation: cw-genie-effect-in 0.4s ${Ue};
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

    .bau-empty-state, .bau-success-view {
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

    .bau-success-content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
    }

    .bau-success-content::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300px;
        height: 300px;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(30, 142, 62, 0.15) 0%, rgba(26, 115, 232, 0.1) 50%, transparent 70%);
        filter: blur(40px);
        z-index: -1;
        opacity: 0;
        animation: bauFadeIn 1s ${Ue} 0.2s forwards;
    }

    @keyframes bau-success-pop {
      0% { transform: scale(0.5); opacity: 0; }
      70% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes bauCheckDraw {
        from { stroke-dashoffset: 30; }
        to { stroke-dashoffset: 0; }
    }

    @keyframes bauSlideUpFade {
        from { transform: translateY(15px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    @keyframes bauBtnShimmer {
        0% { transform: translateX(-100%) skewX(-15deg); }
        30%, 100% { transform: translateX(250%) skewX(-15deg); }
    }

    .bau-success-icon {
        width: 84px;
        height: 84px;
        background: rgba(30, 142, 62, 0.1);
        backdrop-filter: blur(12px);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        color: ${St.green};
        animation: bau-success-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 10px 25px rgba(30, 142, 62, 0.15);
        border: 1px solid rgba(30, 142, 62, 0.2);
    }

    .bau-success-icon svg {
        width: 42px;
        height: 42px;
    }

    .bau-check-path {
        stroke-dasharray: 30;
        stroke-dashoffset: 30;
        animation: bauCheckDraw 0.5s ${Ue} 0.6s forwards;
    }

    .bau-success-title {
        font-size: 22px;
        font-weight: 700;
        color: #202124;
        margin: 0 0 8px 0;
        opacity: 0;
        animation: bauSlideUpFade 0.5s ${Ue} 0.7s forwards;
    }

    .bau-success-message {
        font-size: 15px;
        color: #5F6368;
        margin-bottom: 32px;
        opacity: 0;
        animation: bauSlideUpFade 0.5s ${Ue} 0.8s forwards;
    }

    #bau-success-back-btn {
        opacity: 0;
        animation: bauSlideUpFade 0.5s ${Ue} 0.9s forwards;
        position: relative;
        overflow: hidden;
    }

    #bau-success-back-btn::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 40%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transform: translateX(-100%) skewX(-15deg);
        animation: bauBtnShimmer 2s ease-in-out 1.5s forwards;
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

    @keyframes geminiPulse {
        0% { transform: translate(-10%, -10%) scale(1); }
        100% { transform: translate(10%, 10%) scale(1.1); }
    }

    .bau-highlight-item { display: flex; flex-direction: column; gap: 4px; z-index: 1; }
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
      transition: background 0.2s ease;
    }
    .bau-confirm-row:hover {
      background: #F1F3F4;
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
    }
    .bau-confirm-value {
      font-size: 13px;
      color: #202124;
      line-height: 1.5;
      word-break: break-word;
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
  `,document.head.appendChild(t)};var Ve={steps:[{id:1,title:"Contexto e Valida\xE7\xE3o",fields:[{id:"advName",name:"advName",label:"Nome do Anunciante",type:"text",placeholder:"Nome do Anunciante",required:!0,isSmart:!0},{id:"cid",name:"cid",label:"CID",type:"text",placeholder:"000-000-0000",required:!0,isSmart:!0,tooltip:"Use o formato 000-000-0000 ou 10 d\xEDgitos",validation:{regex:"^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$",error:"Formato de CID incorreto"}},{id:"amName",name:"amName",label:"Account Manager (AM)",type:"text",placeholder:"Nome do AM",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!1,isSmart:!0,button:{id:"bau-top-se-search",icon:"wand",title:"Buscar ID automaticamente"}}]},{id:2,title:"Tasks",fields:[{id:"reason",name:"reason",label:"O que deve ser feito em BAU",type:"textarea",placeholder:"Descreva as a\xE7\xF5es esperadas...",required:!0,style:{minHeight:"80px"}},{id:"taskType",name:"taskType",label:"Tasks para BAU (Selecione 1 ou mais)",type:"checkbox-grid",required:!0,tooltip:"Selecione os tipos de implementa\xE7\xE3o t\xE9cnica",options:["Ads Conversion Tracking","Ads Dynamic Remarketing","Ads Enhanced Conversions","Ads Website Call Conversion","Ads Remarketing","Analytics Cross Domain Tracking","Analytics E-Commerce Tracking","Analytics Enhanced E-Commerce Tracking","Analytics Event Tracking","Analytics Health Check","Analytics Remarketing","Analytics Setup","Fix GA4 implementation","Consent Mode","Fix Sitewide Tagging (OGT & CT)","Google Tag Manager Installation","Customer Match"]}]},{id:3,title:"Justificativa e Agendamento",fields:[{id:"nonImplementationReason",name:"nonImplementationReason",label:"Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",type:"select",required:!0,options:[{value:"",text:"Selecione um motivo..."},{value:"Tempo da consultoria esgotado",text:"Tempo da consultoria esgotado"},{value:"Solicita\xE7\xE3o de reagendamento pelo anunciante",text:"Solicita\xE7\xE3o de reagendamento pelo anunciante"},{value:"Falta de acessos ou backup do site",text:"Falta de acessos ou backup do site"},{value:"Anunciante indispon\xEDvel ou n\xE3o preparado",text:"Anunciante indispon\xEDvel ou n\xE3o preparado"},{value:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)",text:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"},{value:"Solicita\xE7\xE3o de tarefas (tasks) adicionais",text:"Solicita\xE7\xE3o de tarefas (tasks) adicionais"},{value:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)",text:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"},{value:"Retorno de contato ap\xF3s prazo de 14 dias expirado",text:"Retorno de contato ap\xF3s prazo de 14 dias expirado"}]},{id:"description",name:"description",label:"Justificativa / Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva detalhadamente o que precisa ser feito...",required:!0},{id:"availability",name:"availability",label:"Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",type:"datetime-group",required:!0,fields:[{name:"availability_1",label:"Op\xE7\xE3o 1 (Prioridade)",required:!0},{name:"availability_2",label:"Op\xE7\xE3o 2 (Opcional)",required:!1},{name:"availability_3",label:"Op\xE7\xE3o 3 (Opcional)",required:!1}]}]},{id:4,title:"Confirma\xE7\xE3o",isConfirmation:!0}]};var ke={add:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',wand:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',check:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path class="bau-check-path" d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',expand:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>'};function No(t){let e=document.createElement("div");if(e.className="bau-dynamic-input",e.id=`wrapper-${t.id}`,t.label){let a=document.createElement("label");a.className="bau-label",a.textContent=t.label,t.tooltip&&a.setAttribute("data-tooltip",t.tooltip),e.appendChild(a)}let o;switch(t.type){case"textarea":o=document.createElement("textarea"),o.style.minHeight="80px",e.appendChild(o);break;case"select":o=document.createElement("select"),t.options.forEach(i=>{let r=document.createElement("option");r.value=i.value,r.textContent=i.text,o.appendChild(r)}),e.appendChild(o);break;case"checkbox-grid":return o=document.createElement("div"),o.className="bau-tasks-grid",t.options.forEach(i=>{let r=document.createElement("label");r.className="bau-task-item",r.innerHTML=`<input type="checkbox" name="${t.name}" value="${i}"><span>${i}</span>`,r.addEventListener("click",s=>{s.preventDefault();let d=r.querySelector("input");d.checked=!d.checked,r.classList.toggle("active",d.checked),H.playClick()}),o.appendChild(r)}),e.appendChild(o),e;case"datetime-group":return o=document.createElement("div"),o.className="bau-availability-container",t.fields.forEach(i=>{let r=document.createElement("div");r.className="bau-availability-field",r.innerHTML=`
                    <span class="bau-field-hint">${i.label}</span>
                    <input type="datetime-local" name="${i.name}" class="bau-input" ${i.required?"required":""}>
                `,o.appendChild(r)}),e.appendChild(o),e.appendChild(document.createElement("div")),e;case"text-with-button":let a=document.createElement("div");a.className="bau-input-group",o=document.createElement("input"),o.type="text";let n=document.createElement("button");n.type="button",n.id=t.button.id,n.className="bau-mini-btn-input",n.title=t.button.title,n.innerHTML=ke[t.button.icon]||"",a.appendChild(o),a.appendChild(n),e.appendChild(a);break;default:o=document.createElement("input"),o.type="text",e.appendChild(o)}return o&&t.type!=="checkbox-grid"&&t.type!=="datetime-group"&&(o.id=`bau-form-${t.id}`,o.name=t.name,o.className=t.type==="select"?"bau-select":t.type==="textarea"?"bau-textarea":"bau-input",t.placeholder&&(o.placeholder=t.placeholder),t.required&&(o.required=!0)),e}function zo(){Do();let t=!1,e="dashboard",o=null,a=1,n=Ve.steps.length,i=document.createElement("div");i.id="bau-form-popup",i.className="bau-popup cw-module-window",i.style.display="none";let r=ue(i,"BAU Central","v2.2.0","Dashboard de Casos BAU",{},()=>b());i.appendChild(r);let s=document.createElement("div");s.className="bau-view-container",i.appendChild(s);let d=document.createElement("div");d.id="bau-view-dashboard",d.className="bau-view active",d.innerHTML=`
        <div class="bau-dashboard-content">
            <div class="bau-dashboard-metrics" id="bau-dashboard-metrics"></div>
            <ul class="bau-case-list" id="bau-case-list-container"></ul>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            ${ke.add}
            Novo Caso BAU
        </button>
    `,s.appendChild(d);let m=document.createElement("div");m.id="bau-view-form",m.className="bau-view";let l=document.createElement("div");l.className="bau-view-header",l.innerHTML=`
      <button class="bau-back-btn" id="bau-form-back-btn">
        ${ke.back}
        Voltar ao Dashboard
      </button>
    `,m.appendChild(l);let p=document.createElement("div");p.className="bau-content",m.appendChild(p);let x=document.createElement("div");x.className="bau-progress-indicator",p.appendChild(x);let f=document.createElement("form");f.id="bau-escalation-form",p.appendChild(f),Ve.steps.forEach((c,w)=>{let y=document.createElement("div");if(y.className="bau-step"+(w===0?" active":""),y.id=`bau-step-${c.id}`,c.isConfirmation)y.innerHTML=`
                <div class="bau-card">
                    <h3 class="bau-step-title">Confirme os dados antes de enviar</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;else{let E=document.createElement("div");if(E.className="bau-card",c.id===1){E.innerHTML=`
                    <div id="bau-vital-highlights" class="bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div id="bau-all-data"></div>
                `;let v=E.querySelector(".bau-dynamic-inputs-container");c.fields.forEach(S=>{v.appendChild(No(S))});let L=E.querySelector("#wrapper-cid");if(L){let S=document.createElement("div");S.id="bau-cid-error",S.className="bau-cid-error-hint",S.style.display="none",S.textContent="Formato de CID incorreto",L.appendChild(S)}}else c.fields.forEach(v=>{E.appendChild(No(v))});y.appendChild(E)}f.appendChild(y)});let g=document.createElement("div");g.className="bau-footer";let u=document.createElement("button");u.type="button",u.id="bau-step-back-btn",u.className="bau-btn-secondary",u.textContent="Voltar";let C=document.createElement("button");C.type="button",C.id="bau-step-next-btn",C.className="bau-btn-primary",C.textContent="Pr\xF3ximo";let F=document.createElement("button");F.type="submit",F.className="bau-btn-submit",F.innerHTML=`${ke.send} Enviar para o TL`,F.style.display="none",g.appendChild(u),g.appendChild(C),g.appendChild(F),f.appendChild(g),s.appendChild(m);let k=document.createElement("div");k.id="bau-view-success",k.className="bau-view bau-success-view",k.innerHTML=`
        <div class="bau-success-content">
            <div class="bau-success-icon" style="color: ${St.green};">${ke.check}</div>
            <h2 class="bau-success-title">Caso enviado com sucesso!</h2>
            <p class="bau-success-message">Sua solicita\xE7\xE3o foi recebida e ser\xE1 processada em breve.</p>
            <button class="bau-btn-primary" id="bau-success-back-btn">Voltar ao Dashboard</button>
        </div>
    `,s.appendChild(k),document.body.appendChild(i);function P(c){e=c,i.querySelectorAll(".bau-view").forEach(v=>v.classList.remove("active"));let w=i.querySelector(`#bau-view-${c}`);w&&w.classList.add("active");let y=r.querySelector(".cw-module-header-title")||r.querySelector("h2"),E=r.querySelector(".cw-module-header-subtitle")||r.querySelector("p");y&&(y.textContent=c==="form"?"Novo Caso BAU":"BAU Central"),E&&(E.textContent=c==="form"?"Preencha os detalhes abaixo":"Dashboard de Casos BAU")}function M(){let c=i.querySelector("#bau-case-list-container"),w=i.querySelector("#bau-dashboard-metrics");w&&(w.innerHTML=`
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `),c&&(c.innerHTML=Array(5).fill(0).map(()=>`
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join(""))}async function J(){let c=i.querySelector("#bau-case-list-container"),w=i.querySelector("#bau-dashboard-metrics");if(!(!c||!w)){M();try{let y=await Pt();if(!Array.isArray(y))throw new Error("API response is not a valid array");I(y)}catch(y){console.error("Critical Error loading BAU cases:",y),w&&(w.innerHTML=""),c.innerHTML=`
                <div class="bau-empty-state bau-error-state">
                    <div style="color: ${St.red}; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">Ops! Algo deu errado</h3>
                    <p class="bau-empty-subtitle">N\xE3o conseguimos carregar seus casos BAU no momento.</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        Tentar Novamente
                    </button>
                </div>
            `,i.querySelector("#bau-retry-btn")?.addEventListener("click",()=>J()),Z("Erro ao carregar Dashboard. Verifique sua conex\xE3o.",{error:!0})}}}function ee(c){if(!c)return"";let y=(G=>{switch(G){case"PENDING_TL_CREATION":return{text:"Aguardando TL",class:"status-yellow",aura:"status-yellow-aura"};case"CREATED":return{text:"Aprovado / Criado",class:"status-green",aura:"status-green-aura"};case"DISCARDED":return{text:"Descartado pelo TL",class:"status-red",aura:"status-red-aura"};case"CANCELED_BY_AGENT":return{text:"Cancelado",class:"status-gray",aura:""};default:return{text:G||"Pendente",class:"status-gray",aura:""}}})(c?.status),E=c?.date?new Date(c.date).toLocaleDateString("pt-BR"):"",v="",L="";if(c?.status==="PENDING_TL_CREATION"&&c?.availability_1){let G=new Date(c.availability_1),A=new Date;(G<=A||G-A<36e5*2)&&(v='<span class="bau-sla-badge">Urgente</span>',L="bau-pulse-attention")}let S=c?.reason&&c.reason.trim()?c.reason:"Nenhum contexto adicional fornecido pelo agente.",_=/^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(c?.cid||""),B=!c?.caseId||c.caseId==="N/A"||!_;return B&&c?.status==="PENDING_TL_CREATION"&&(L="bau-pulse-attention"),`
            <li class="bau-case-card ${y.aura} ${L}" data-case-id="${c?.id||""}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${ke.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${c?.advName||"Nome indefinido"}</h3>
                            ${v}
                            <span class="bau-case-date">${E}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="Customer ID do Anunciante">Case: ${c?.caseId||"N/A"}</span> \u2022
                            <span data-tooltip="CID do Anunciante (Formato: 000-000-0000)" class="${_?"":"bau-error-text"}">CID: ${c?.cid||"N/A"}</span> \u2022
                            <span data-tooltip="O que deve ser feito em BAU">Motivo: ${S}</span>
                        </p>
                        ${B?`<div class="bau-data-error-hint">${!c?.caseId||c?.caseId==="N/A"?"Dados Incompletos":"CID Inv\xE1lido"} - Contate o Suporte</div>`:""}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                    <span class="bau-case-status-badge ${y.class}">${y.text}</span>
                </div>
            </li>
        `}function I(c){let w=i.querySelector("#bau-case-list-container"),y=i.querySelector("#bau-dashboard-metrics");if(!w||!y)return;let E=Array.isArray(c)?c.filter(Boolean):[];if(E.length===0){y.innerHTML=`
                <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard">
                    ${ke.refresh}
                    Atualizar
                </button>
            `,w.innerHTML=`
                <div class="bau-empty-state">
                    ${ke.empty}
                    <h3 class="bau-empty-title">Nenhum caso recente</h3>
                    <p class="bau-empty-subtitle">Seus casos BAU aparecer\xE3o aqui</p>
                </div>
            `,i.querySelector("#bau-refresh-dashboard")?.addEventListener("click",()=>J());return}let v=E.filter(B=>B.status==="PENDING_TL_CREATION").length,L=E.filter(B=>B.status==="CREATED").length;y.innerHTML=`
            <div class="bau-metric-card">
                <span class="bau-metric-value">${v}</span>
                <span class="bau-metric-label">Aguardando TL</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${L}</span>
                <span class="bau-metric-label">Criados / Aprovados</span>
            </div>
            <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard" title="Atualizar Dashboard">
                ${ke.refresh}
            </button>
        `;let S=y.querySelector("#bau-refresh-dashboard");S?.addEventListener("click",async()=>{S.classList.contains("spinning")||(S.classList.add("spinning"),H.playClick(),await J(),setTimeout(()=>S.classList.remove("spinning"),1e3))}),w.innerHTML="";let V=E.slice(0,5),_=E.slice(5);if(V.forEach(B=>{w.insertAdjacentHTML("beforeend",ee(B))}),_.length>0){let B=document.createElement("li");B.className="bau-accordion-container";let G=document.createElement("button");G.className="bau-accordion-toggle",G.innerHTML=`${ke.expand} <span>Mostrar ${_.length} casos mais antigos</span>`;let A=document.createElement("ul");A.className="bau-case-list bau-accordion-content",A.style.display="none",_.forEach(K=>{A.insertAdjacentHTML("beforeend",ee(K))}),G.addEventListener("click",()=>{let K=A.style.display==="none";A.style.display=K?"block":"none",G.classList.toggle("expanded",K),G.querySelector("span").textContent=K?"Esconder casos mais antigos":`Mostrar ${_.length} casos mais antigos`,H.playClick()}),B.appendChild(G),B.appendChild(A),w.appendChild(B)}}function O(){f.querySelectorAll(".bau-step").forEach((c,w)=>{let y=w+1===a;c.classList.toggle("active",y),c.style.display=y?"block":"none"}),x.innerHTML="";for(let c=1;c<=n;c++){let w=document.createElement("div");w.className=`bau-progress-step ${c===a?"active":c<a?"completed":""}`,w.textContent=c,x.appendChild(w)}u.style.display=a>1?"inline-block":"none",C.style.display=a<n?"inline-block":"none",F.style.display=a===n?"flex":"none",a===n&&R()}function N(c){let w=Ve.steps.find(y=>y.id===c);if(!w||!w.fields)return!0;for(let y of w.fields)if(y.validation){let E=f.querySelector(`[name="${y.name}"]`);if(E&&E.value.trim())if(new RegExp(y.validation.regex).test(E.value.trim())){E.classList.remove("invalid-cid");let L=f.querySelector("#bau-cid-error");L&&(L.style.display="none")}else{Z(`Erro: ${y.validation.error}`,{error:!0}),E.classList.add("invalid-cid");let L=f.querySelector("#bau-cid-error");return L&&(L.style.display="flex"),!1}}return!0}function X(c){let w=Ve.steps.find(y=>y.id===c);if(!w||!w.fields)return!0;for(let y of w.fields)if(y.required)if(y.type==="checkbox-grid"){if(!f.querySelector(`input[name="${y.name}"]:checked`))return Z(`Erro: Selecione pelo menos uma op\xE7\xE3o para "${y.label}".`,{error:!0}),!1}else if(y.type==="datetime-group"){let E=f.querySelector(`input[name="${y.fields[0].name}"]`);if(!E||!E.value.trim())return Z(`Erro: O campo "${y.fields[0].label}" \xE9 obrigat\xF3rio.`,{error:!0}),!1}else{let E=f.querySelector(`[name="${y.name}"]`);if(!E||!E.value.trim())return Z(`Erro: O campo '${y.label}' \xE9 obrigat\xF3rio.`,{error:!0}),!1}return!0}C.addEventListener("click",()=>{if(N(a)&&X(a)){a++,O();let c=i.querySelector(".bau-content");c&&(c.scrollTop=0),H.playClick()}}),u.addEventListener("click",()=>{a>1&&(a--,O(),H.playClick())});async function $(){let c=await Se()||{};(!c.amName||c.amName==="N/A")&&(c.amName=c.internalEmail||"N/A"),o=c;let w=f.querySelector("#bau-vital-highlights");if(w){let E=[{label:"Anunciante",value:c.advName},{label:"CID",value:c.cid},{label:"Website",value:c.site||c.website},{label:"Case ID",value:c.caseId}];w.innerHTML=E.map(v=>{let L=v.value&&v.value!=="N/A"&&v.value!=="undefined"&&v.value!=="null"?v.value:"N\xE3o capturado";return`
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${v.label}</span>
                        <span class="bau-highlight-value">${L}</span>
                    </div>
                `}).join("")}Ve.steps.forEach(E=>{E.fields&&E.fields.forEach(v=>{if(v.isSmart){let L=c[v.id],S=f.querySelector(`[name="${v.name}"]`),V=i.querySelector(`#wrapper-${v.id}`);if(S&&(S.value=L&&L!=="N/A"?L:""),V){let _=L&&L!==""&&L!=="N/A"&&L!=="undefined"&&L!=="null";V.style.display=_?"none":"block"}}})});let y=i.querySelector("#bau-all-data");if(y){let E=[{label:"Anunciante",value:c.advName},{label:"CID",value:c.cid},{label:"AM",value:c.amName},{label:"SE ID",value:c.seId},{label:"Site",value:c.site},{label:"Email",value:c.email},{label:"Timezone",value:c.timezone},{label:"Case ID",value:c.caseId},{label:"Programa",value:c.salesProgram},{label:"Idioma",value:c.language}];y.innerHTML=`
                <div class="bau-context-badges-grid">
                    ${E.filter(v=>v.value&&v.value!=="N/A"&&v.value!=="---"&&v.value!=="undefined"&&v.value!=="null").map(v=>`
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${v.label}:</span>
                                <span class="bau-badge-value">${v.value}</span>
                            </div>
                        `).join("")}
                </div>
            `}}i.querySelector("#bau-top-se-search")?.addEventListener("click",c=>{c.preventDefault(),dt("bau-form-seId")});let T=i.querySelector("#bau-form-cid");T&&T.addEventListener("input",()=>N(1));function R(){let c=new FormData(f),w=Object.fromEntries(c.entries()),y=c.getAll("taskType"),E=i.querySelector("#bau-confirmation-details");if(!E)return;let v=y.length>0?y.join(", "):"Nenhuma",L=[w.availability_1,w.availability_2,w.availability_3].filter(S=>S&&S.trim()).map(S=>S.replace("T"," ")).join(", ")||"N\xE3o definida";E.innerHTML=`
            <div class="bau-confirmation-grid">
                <div class="bau-confirm-row"><span class="bau-confirm-label">Anunciante</span><span class="bau-confirm-value">${w.advName||"---"}</span></div>
                <div class="bau-confirm-row"><span class="bau-confirm-label">CID</span><span class="bau-confirm-value">${w.cid||"---"}</span></div>
                <div class="bau-confirm-row"><span class="bau-confirm-label">AM</span><span class="bau-confirm-value">${w.amName||"---"}</span></div>
                <div class="bau-confirm-row"><span class="bau-confirm-label">Speakeasy ID</span><span class="bau-confirm-value">${w.seId||"N\xE3o informado"}</span></div>

                <div class="bau-confirm-divider"></div>

                <div class="bau-confirm-row full-width"><span class="bau-confirm-label">O que deve ser feito</span><span class="bau-confirm-value">${w.reason||"---"}</span></div>
                <div class="bau-confirm-row full-width"><span class="bau-confirm-label">Tasks</span><span class="bau-confirm-value">${v}</span></div>

                <div class="bau-confirm-divider"></div>

                <div class="bau-confirm-row full-width"><span class="bau-confirm-label">Justificativa BAU</span><span class="bau-confirm-value">${w.nonImplementationReason||"---"}</span></div>
                <div class="bau-confirm-row full-width"><span class="bau-confirm-label">Descri\xE7\xE3o</span><span class="bau-confirm-value">${w.description||"---"}</span></div>
                <div class="bau-confirm-row full-width"><span class="bau-confirm-label">Disponibilidade</span><span class="bau-confirm-value">${L}</span></div>
            </div>
        `}f.onsubmit=async c=>{c.preventDefault();for(let _=1;_<=n;_++)if(!Ve.steps.find(G=>G.id===_)?.isConfirmation&&(!N(_)||!X(_))){a=_,O();return}let w=i.querySelector(".bau-btn-submit");w.disabled=!0,w.innerHTML="Enviando...";let y=new FormData(f),E=Object.fromEntries(y.entries()),v=y.getAll("taskType"),L=o||{},S=[E.availability_1,E.availability_2,E.availability_3].filter(_=>_&&_.trim()!=="").join(" | "),V={...L,...E,advEmail:L.email||"",website:L.site||"",taskType:v.join(", "),availability:S};try{await $t(V,L.agentEmail||"anon"),H.playSuccess(),P("success")}catch(_){Z("Erro: "+(_.message||"Erro desconhecido"),{error:!0}),console.error("Payload que tentou enviar:",V)}finally{w.disabled=!1,w.innerHTML=`${ke.send} Enviar para o TL`}};function q(){f.reset(),a=1,O(),f.querySelectorAll(".bau-task-item.active").forEach(c=>c.classList.remove("active"))}i.querySelector("#bau-new-case-btn").addEventListener("click",()=>{q(),P("form"),$()}),i.querySelector("#bau-form-back-btn").addEventListener("click",()=>P("dashboard")),i.querySelector("#bau-success-back-btn").addEventListener("click",()=>P("dashboard"));async function b(){t=!t,i.style.display=t?"flex":"none",t&&(P("dashboard"),J()),me(t,i,"cw-btn-bauform")}return O(),b}function pa(){if(window.techSolInitialized){Ft();return}window.techSolInitialized=!0;let t="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{Vt();try{H.initGlobalListeners(),H.playStartup()}catch(l){console.warn("\xC1udio bloqueado:",l)}de.fetchTips(),Ft();let e=ho(),o=So(),a=Ao(),n=ko(),i=qo(),r=_o(),s=Mo(),d=zo(),m=To();co({toggleNotes:e,toggleEmail:o,toggleScript:a,toggleLinks:n,toggleTimezone:i,toggleLibrary:r,toggleConfigs:s,toggleBAUForm:d,broadcastControl:m}),setTimeout(()=>{de.logEvent("App","Start","Session Start"),Fo(),setTimeout(()=>{Lo(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),Z("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}pa();})();
