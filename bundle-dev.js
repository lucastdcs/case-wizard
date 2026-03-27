(()=>{var zo=Object.defineProperty;var Ro=(t,e)=>()=>(t&&(e=t(t=0)),e);var Bo=(t,e)=>{for(var o in e)zo(t,o,{get:e[o],enumerable:!0})};var nt={};Bo(nt,{NotesState:()=>at,notesState:()=>W});var at,W,Ke=Ro(()=>{at=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.excludedFields=new Set,this.activeFields=[];let e=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(e||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(e){this.currentCaseType!==e&&(this.currentCaseType=e,this.isDirty=!0,this.notify())}setLanguage(e){this.currentLang!==e&&(this.currentLang=e,this.notify())}setPortugalCase(e){this.isPortugalCase!==e&&(this.isPortugalCase=e,this.isDirty=!0,this.notify())}setConsent(e){this.consent!==e&&(this.consent=e,this.isDirty=!0,this.notify())}setTagSupportUsed(e){this.tagSupportUsed=e,e||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(e){this.activeFields=[...e],this.isDirty=!0,this.notify()}removeField(e){this.activeFields=this.activeFields.filter(o=>o!==e),this.isDirty=!0,this.notify()}addFieldAt(e,o){this.activeFields.includes(e)||(this.activeFields.splice(o,0,e),this.isDirty=!0,this.notify())}setForcedScreenshots(e){this.forcedScreenshots=new Set(e),this.isDirty=!0,this.notify()}toggleForcedScreenshot(e,o){o?this.forcedScreenshots.add(e):this.forcedScreenshots.delete(e),this.isDirty=!0,this.notify()}setExcludedFields(e){this.excludedFields=new Set(e),this.isDirty=!0,this.notify()}toggleFieldExclusion(e,o){o?this.excludedFields.add(e):this.excludedFields.delete(e),this.isDirty=!0,this.notify()}setStatus(e){this.currentStatus!==e&&(this.currentStatus=e,this.isDirty=!0,this.notify())}setSubStatus(e){this.currentSubStatus!==e&&(this.currentSubStatus=e,this.isDirty=!0,this.notify())}setScreenshotMode(e){this.screenshotMode=e,this.notify()}setActiveTasks(e){this.activeTasks=e,this.isDirty=!0,this.notify()}toggleFavorite(e){this.favorites.has(e)?this.favorites.delete(e):this.favorites.add(e),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(e,o){this.formData[e]!==o&&(this.formData[e]=o,this.isDirty=!0,this.notify())}listeners=[];subscribe(e){return this.listeners.push(e),()=>this.listeners=this.listeners.filter(o=>o!==e)}notify(){this.listeners.forEach(e=>e(this))}},W=new at});var $o="https://script.google.com/a/macros/google.com/s/AKfycbxx66yAWDKEXgY5gClR3jIa14lkEWbDlzF8nM4pa6bkM42ff6m6xf-fCmEKkjVluL2feg/exec",vt="cw_data_broadcast",Dt="cw_data_tips",Po=["Processando...","Mantenha o foco!","Aguarde..."];function _e(t,e={}){return new Promise((o,a)=>{let n="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[n]=l=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(l)};let s=Object.keys(e).map(l=>encodeURIComponent(l)+"="+encodeURIComponent(e[l])).join("&"),r=`${$o}?op=${t}&callback=${n}&t=${Date.now()}&${s}`;i.src=r,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}var le={fetchTips:async()=>{try{let t=await _e("tips");t?.tips&&localStorage.setItem(Dt,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await _e("broadcast");if(t?.broadcast)return localStorage.setItem(vt,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(vt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(vt)||"[]"),getRandomTip:()=>{let t=Po,e=localStorage.getItem(Dt);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await le._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await le._performOp("update_broadcast",o)},deleteBroadcast:async t=>await le._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`Executando ${t}...`,e);let o=await _e(t,e);return o&&o.status==="success"?(console.log("Sucesso:",t),!0):(console.warn("Falha:",o),!1)}catch(o){return console.error("Erro JSONP:",o),!1}},logEvent:(t,e,o="",a=null)=>{try{let n="anon";try{let s=fe();s&&(n=s.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:n,version:"v5.1",category:t,action:e,label:o,value:a||""};_e("log",i).catch(s=>{})}catch(n){console.warn("Analytics error",n)}},logUsage:()=>{},sendBAUEscalation:async(t,e)=>{let o={...t,user:e,date:new Date().toISOString()};try{console.log("Executando create_bau...",o);let a=await _e("create_bau",o);if(a&&a.status==="success")return console.log("Sucesso: create_bau"),a;throw new Error(a?.error||a?.message||"Falha na opera\xE7\xE3o BAU")}catch(a){throw console.error("Erro JSONP (BAU):",a),a}},readAgentBAU:async()=>{let t=fe();if(!t)return console.warn("Email n\xE3o encontrado. N\xE3o foi poss\xEDvel buscar casos BAU."),[];try{console.log("Buscando casos BAU para:",t);let e=await _e("read_agent_bau",{user:t});if(e&&e.status==="success"&&Array.isArray(e.cases))return e.cases;if(e&&e.status==="error")throw new Error(e.message||"Erro retornado pela API de leitura");return[]}catch(e){throw console.error("Erro ao buscar casos BAU:",e),e}},updateBAUStatus:async(t,e,o={})=>{let a=fe();try{console.log(`Atualizando status BAU ${t} para ${e}...`);let n=await _e("update_bau_status",{id:t,status:e,user:a,...o});return n&&n.status==="success"}catch(n){return console.error("Erro ao atualizar status BAU:",n),!1}},fetchUserProfile:async t=>{try{console.log(`Buscando perfil para: ${t}`);let e=await _e("people");if(e&&e.status==="success"&&e.people){let o=e.people.find(a=>a.ldap.toLowerCase()===t.toLowerCase());if(o){let n=["Manager","Lead","TL","Staff"].some(i=>o.roleCategory.includes(i));return{...o,isOverhead:n}}}return null}catch(e){return console.error("Erro ao buscar perfil:",e),null}}},zt=le.sendBAUEscalation,Rt=le.readAgentBAU,ma=le.updateBAUStatus,Bt=le.fetchUserProfile;var ot="",Ye="",wt=null,$t=t=>new Promise(e=>setTimeout(e,t));async function St(){if(ot&&Ye)return ot;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await $t(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let n=document.querySelector("profile-details img");if(n&&n.src.includes("/photos/")){let i=n.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let a=document.querySelector("profile-details .email");return a&&(Ye=a.textContent.trim(),console.log("TechSol: Identidade confirmada ->",Ye)),t.click(),document.body.click(),ot=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function Xe(){return ot||"Consultor"}function fe(){return Ye||null}function Pt(t){let e=new Date,o=e.getHours(),a=e.getDay(),n="Ol\xE1",i="";o>=5&&o<12?(n="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(n="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(n="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let s=[];o>=0&&o<5?s=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?a===1?s=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:a===5?s=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:s=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?s=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:s=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(a===0||a===6)&&(s=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=s[Math.floor(Math.random()*s.length)];return{prefix:`${n},`,name:t,suffix:r,icon:i,isFriday:a===5}}async function Ho(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,a=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');a&&(a.click(),await $t(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(s=>{let r=s.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function jo(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function Go(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Google Ads External Customer ID")||n.textContent.includes("Customer ID"));if(e){let n=e.closest("home-data-item")||e.parentElement;if(n){let i=n.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let a=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(a)return a[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"N/A"}function Uo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Account Manager")||o.textContent.includes("AM Name")||o.textContent.includes("Sales Rep"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar AM:",t)}return null}function Vo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("customer time zone")||o.textContent.toLowerCase().includes("time zone")||o.textContent.toLowerCase().includes("timezone"));if(e){let o=e.parentElement;if(o){let a=o.querySelector("sanitized-content");if(a&&a.textContent.trim())return a.textContent.trim();let n=o.querySelector(".data-pair-content")||e.nextElementSibling;if(n&&n.textContent.trim()){let i=n.textContent.trim();if(i&&i!=="---"&&i!=="N/A")return i}}}}catch(t){console.warn("Erro ao capturar Timezone:",t)}return null}async function Wo(){let t="---";try{t=window.location.href.split("/").pop()}catch(e){console.warn("Falha URL:",e)}return t}function Yo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("sales program")||o.textContent.toLowerCase().trim()==="program"||o.textContent.toLowerCase().includes("programa"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector('sanitized-content ng-template[debug-id="html-value"]')||o.querySelector("sanitized-content");if(a)return a.textContent.trim();let n=o.querySelector(".data-pair-content")||o.nextElementSibling;if(n)return n.textContent.trim()}}catch(t){console.warn("Erro ao capturar Sales Program:",t)}return""}function Xo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Language")||o.textContent.includes("Idioma"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar Idioma:",t)}return"N/A"}function Ko(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Speakeasy ID")||n.textContent.includes("SE ID"));if(e){let n=e.closest(".data-pair")||e.parentElement,i=n.querySelector(".data-pair-content")||n.nextElementSibling;if(i&&i.textContent.trim())return i.textContent.trim()}let o=/Speakeasy.*?(P\d{15,25})/i,a=Array.from(document.querySelectorAll("textarea, .preview, .message-body, .notes-content"));for(let n=a.length-1;n>=0;n--){let s=(a[n].value||a[n].innerText||"").match(o);if(s&&s[1])return s[1]}}catch(t){console.warn("Erro ao capturar SE ID:",t)}return"N/A"}async function xe(){Ye||await St();let t="Cliente",e="";try{let h=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(h&&h.nextElementSibling){let c=h.nextElementSibling.innerText.trim();c&&(t=c)}}catch(w){console.warn("Falha Nome:",w)}try{let h=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(h&&h.nextElementSibling){let c=h.nextElementSibling.innerText.trim();c&&(e=c)}}catch(w){console.warn("Falha URL:",w)}let o=await Ho(),a=jo(),n=Go(),i=Uo(),s=Vo(),r=await Wo(),l=Yo(),m=Xo(),u=Ko(),p=fe();if(p&&!wt){let w=p.split("@")[0];try{wt=await Bt(w)}catch(h){console.warn("Falha ao carregar perfil do usu\xE1rio:",h)}}return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:a,cid:n,amName:i,timezone:s,agentName:Xe(),agentEmail:fe(),caseId:r,userProfile:wt,advName:t,site:e,email:o,salesProgram:l,language:m,seId:u}}var ze=null,Ct=null,Le=.3;var Oe=localStorage.getItem("cw_sounds_muted")==="true";function De(){if(!ze){let t=window.AudioContext||window.webkitAudioContext;t&&(ze=new t)}return ze&&ze.state==="suspended"&&ze.resume(),ze}function Ht(t){if(Ct)return Ct;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),a=o.getChannelData(0);for(let n=0;n<e;n++)a[n]=Math.random()*2-1;return Ct=o,o}var P={setMuted:t=>{Oe=t,localStorage.setItem("cw_sounds_muted",t)},isMuted:()=>Oe,playClick:()=>{if(Oe)return;let t=De();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Ht(t);let a=t.createBiquadFilter();a.type="highpass",a.frequency.value=4e3;let n=t.createGain();n.gain.setValueAtTime(Le*.8,e),n.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{if(Oe)return;let t=De();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let a=t.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Le*.1,e+.005),a.gain.linearRampToValueAtTime(0,e+.02),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{if(Oe)return;let t=De();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((a,n)=>{let i=t.createOscillator(),s=t.createGain();i.type="sine",i.frequency.value=a,s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(Le*.6,e+.05),s.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(s),s.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{if(Oe)return;let t=De();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Ht(t);let a=t.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(100,e),a.frequency.exponentialRampToValueAtTime(800,e+.2);let n=t.createGain();n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(Le*.5,e+.05),n.gain.linearRampToValueAtTime(0,e+.25),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{if(Oe)return;let t=De();if(!t)return;let e=t.currentTime,o=t.createOscillator(),a=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),a.gain.setValueAtTime(Le,e),a.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{if(Oe)return;let t=De();if(!t)return;let e=t.currentTime,o=.12,a=t.createOscillator(),n=t.createGain(),i=t.createBiquadFilter();a.type="square",a.frequency.setValueAtTime(400,e),a.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),n.gain.setValueAtTime(Le*4,e),n.gain.exponentialRampToValueAtTime(.001,e+.1),a.connect(i),i.connect(n),n.connect(t.destination),a.start(e),a.stop(e+.12);let s=t.createOscillator(),r=t.createGain();s.type="sine",s.frequency.setValueAtTime(150,e),s.frequency.exponentialRampToValueAtTime(50,e+.15),r.gain.setValueAtTime(Le*1.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),s.connect(r),r.connect(t.destination),s.start(e),s.stop(e+.15),[55,55.4,110.5].forEach(m=>{let u=t.createOscillator(),p=t.createGain(),w=t.createBiquadFilter();u.type="sawtooth",u.frequency.value=m,w.type="lowpass",w.frequency.setValueAtTime(30,e),w.frequency.linearRampToValueAtTime(900,e+o+.2),w.frequency.exponentialRampToValueAtTime(40,e+3),p.gain.setValueAtTime(0,e),p.gain.linearRampToValueAtTime(Le*.6,e+o+.1),p.gain.exponentialRampToValueAtTime(.001,e+3.5),u.connect(w),w.connect(p),p.connect(t.destination),u.start(e),u.stop(e+3.6)})},playNotification:()=>{if(Oe)return;let t=De();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(a=>{let n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(a.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Le*a.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+a.dur),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+a.dur+.1)})},playSwoosh:()=>{P.playGenieOpen()},playReset:()=>{P.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!ze)return;let a=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!a||a.contains(o.relatedTarget))return;let n=Date.now();n-t<e||(P.playHover(),t=n)},{passive:!0})}};var jt=1e4;function Gt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function X(t,e={}){let o=document.createElement("div");e.error&&(o.className="toast-error");let a=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:a,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?P.playError():P.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function Ut(t,e=null){let o=0,a=0,n=0,i=0,s=e||t;s.style.cursor="grab",s.onmousedown=r;function r(u){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(u.target.tagName)||u.target.closest(".no-drag"))return;u=u||window.event,s.style.cursor="grabbing",t.style.transition="none";let p=t.getBoundingClientRect();t.style.transform="none",t.style.left=p.left+"px",t.style.top=p.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",jt++,t.style.zIndex=jt,n=u.clientX,i=u.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=m,document.onmousemove=l}function l(u){u=u||window.event,u.preventDefault(),o=n-u.clientX,a=i-u.clientY,n=u.clientX,i=u.clientY;let p=t.offsetTop-a,w=t.offsetLeft-o,h=16,c=window.innerWidth,d=window.innerHeight,S=t.offsetWidth,T=t.offsetHeight;w<h?w=h:w+S>c-h&&(w=c-S-h),p<h?p=h:p+T>d-h&&(p=d-T-h),t.style.top=p+"px",t.style.left=w+"px"}function m(){document.onmouseup=null,document.onmousemove=null,s.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var me={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Et={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Vt={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Wt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Ie=t=>new Promise(e=>setTimeout(e,t));async function Jo(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await Ie(200);for(let a=0;a<e.length;a++){let n=e.charAt(a),i=document.createElement("span");i.textContent=n,o&&o.parentNode===t?o.before(i):t.appendChild(i);let s=Math.floor(Math.random()*60)+30;a===0&&(s=150),a>e.length-3&&(s=30),await Ie(s)}await Ie(600),o&&(o.style.display="none")}async function At(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Ie(200);let e=await St(),o=Pt(e),a=t.querySelector("#w-icon"),n=t.querySelector("#p1"),i=t.querySelector("#p2"),s=t.querySelector("#p3"),r=t.querySelector("#p-sextou");a&&(a.innerHTML=o.icon),n&&(n.textContent=o.prefix),s&&(s.textContent=o.suffix),await Ie(300);let l=a?a.querySelector("svg"):null;if(l&&(l.style.opacity="1",l.style.transform="scale(1)"),await Ie(400),n&&(n.style.opacity="1"),P.playStartup(),i&&await Jo(i,o.name),s&&(s.style.opacity="1",s.style.transform="translateY(0)"),o.isFriday&&r){await Ie(400),r.style.display="block",r.offsetWidth;let m=r.querySelector(".sextou-badge");m&&(m.style.opacity="1",m.style.transform="scale(1)")}await Ie(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Ie(900),t.parentNode&&t.parentNode.removeChild(t)}}function Yt(t){if(!t)return;let e=t.getBoundingClientRect(),o=window.innerWidth,a=window.innerHeight,n=24,i=o-e.width-n,s=a-e.height-n,r=parseFloat(t.style.left)||e.left,l=parseFloat(t.style.top)||e.top,m=Math.max(n,Math.min(r,i)),u=Math.max(n,Math.min(l,s));if(m!==r||u!==l){let p=t.style.transition;t.style.transition="left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",t.style.left=`${m}px`,t.style.top=`${u}px`,setTimeout(()=>{t.style.transition=p},300)}}var Ee={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Ae(t,e){e.onmousedown=o;function o(a){a.stopPropagation(),a.preventDefault();let n=t.style.transition;t.style.transition="none";let i=a.clientX,s=a.clientY,r=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),l=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),m=i,u=s,p=!1;function w(d){m=d.clientX,u=d.clientY,p||(window.requestAnimationFrame(()=>{h(),p=!1}),p=!0)}function h(){let d=r+(m-i),S=l+(u-s);d>360&&(t.style.width=d+"px"),S>300&&(t.style.height=S+"px")}function c(){document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",c),setTimeout(()=>{t.style.transition=n},50)}document.addEventListener("mousemove",w),document.addEventListener("mouseup",c)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function Xt(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}function Kt(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),t}function Jt(){let t=document.createElement("div");return Object.assign(t.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),t}function he(t,e={}){return new Promise(o=>{let a=Kt(),n=Jt(),i=e.danger?"#FF3B30":"#007AFF",s=e.confirmText||(e.danger?"Excluir":"Confirmar");n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${t}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${s}</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)"});let r=u=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(u)},300)},l=n.querySelector("#cw-conf-cancel"),m=n.querySelector("#cw-conf-ok");[l,m].forEach(u=>u.onmouseenter=()=>P.playHover()),l.onclick=()=>{P.playClick(),r(!1)},m.onclick=()=>{P.playClick(),r(!0)}})}function Zt(t,e=""){return new Promise(o=>{let a=Kt(),n=Jt();n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${t}</div>
            <input type="text" id="cw-prompt-input" value="${e}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a);let i=n.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let s=m=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(m)},300)},r=n.querySelector("#cw-prompt-cancel"),l=n.querySelector("#cw-prompt-ok");[r,l].forEach(m=>m.onmouseenter=()=>P.playHover()),r.onclick=()=>{P.playClick(),s(null)},l.onclick=()=>{P.playClick(),s(i.value)},i.onkeydown=m=>{m.key==="Enter"&&l.click(),m.key==="Escape"&&r.click()}})}Ke();var Zo={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Qt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function pe(t,e,o,a,n,i){let s=document.createElement("div");Object.assign(s.style,Zo),Ut(t,s);let r=document.createElement("div");if(Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let T=document.createElement("style");T.id="cw-header-anim",T.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(T)}r.style.animation="cw-header-flow 6s linear infinite",s.appendChild(r),n&&(n.googleLine=r);let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center",gap:"12px"});let m=document.createElement("img");m.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(m.style,{width:"20px",height:"20px",pointerEvents:"none"});let u=document.createElement("span");u.textContent=e,l.appendChild(m),l.appendChild(u);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"4px"});let w='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',c=document.createElement("div");c.innerHTML=w,Object.assign(c.style,Qt),c.title="Sobre & Feedback",c.classList.add("no-drag"),c.onmouseenter=()=>{c.style.background="rgba(255,255,255,0.1)",c.style.color="#FFF"},c.onmouseleave=()=>{c.style.color!=="rgb(138, 180, 248)"&&(c.style.background="transparent",c.style.color="#9AA0A6")};let d=document.createElement("div");d.innerHTML=h,Object.assign(d.style,Qt),d.title="Fechar",d.classList.add("no-drag","cw-header-close"),d.onmouseenter=()=>{d.style.background="rgba(242, 139, 130, 0.2)",d.style.color="#F28B82"},d.onmouseleave=()=>{d.style.background="transparent",d.style.color="#9AA0A6"},d.onmousedown=T=>T.stopPropagation(),c.onmousedown=T=>T.stopPropagation(),d.onclick=i;let S=Qo(t,e,o,a);return c.onclick=T=>{T.stopPropagation(),S.style.opacity==="1"?(S.style.opacity="0",S.style.pointerEvents="none",c.style.color="#9AA0A6",c.style.background="transparent"):(S.style.opacity="1",S.style.pointerEvents="auto",c.style.color="#8AB4F8",c.style.background="rgba(138, 180, 248, 0.1)")},p.appendChild(c),p.appendChild(d),s.appendChild(l),s.appendChild(p),s}function Qo(t,e,o,a){let n=document.createElement("div");return Object.assign(n.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),n.innerHTML=`
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
    `,setTimeout(()=>{let i=n.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let s=n.querySelector("#close-help-internal");s&&(s.onmouseover=()=>s.style.backgroundColor="#f8f9fa",s.onmouseout=()=>s.style.backgroundColor="white",s.onclick=()=>{n.style.opacity="0",n.style.pointerEvents="none"})},0),t.appendChild(n),n}var B={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},de={small:"8px",medium:"12px",large:"20px",pill:"100px"},Re={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},se="cubic-bezier(0.34, 1.56, 0.64, 1)",ea={width:"100%",padding:"14px 16px",borderRadius:de.medium,border:`1.5px solid ${B.border}`,backgroundColor:B.bgInput,fontSize:"14px",color:B.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${se}`,outline:"none"},Ca={...ea,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},Ea={fontSize:"12px",fontWeight:"700",color:B.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},Aa={display:"block",fontSize:"14px",fontWeight:"600",color:B.text,marginBottom:"10px",marginTop:"20px"},ka={fontSize:"12px",color:B.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},kt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:B.primary},Ta={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:B.text,cursor:"pointer",padding:"16px 20px",backgroundColor:B.surface,border:`1px solid ${B.border}`,borderRadius:de.large,transition:`all 0.4s ${se}`,userSelect:"none",boxShadow:Re.subtle},Fa={padding:"14px 28px",color:"#fff",backgroundColor:B.primary,border:"none",borderRadius:de.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${se}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},La={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${B.primary}`,color:B.primary,borderRadius:de.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${se}`},Oa={background:"transparent",border:`1px solid ${B.border}`,borderRadius:de.pill,color:B.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${se}`};function eo(t,e){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,me,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${se}, height 0.4s ${se}, transform 0.4s ${se}, opacity 0.3s ease`,borderRadius:de.large,boxShadow:Re.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let a={popup:o,googleLine:null},n=pe(o,"Case Notes",t,"Gera notas padronizadas com excel\xEAncia visual.",a,e);o.appendChild(n);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:B.surface}),o.appendChild(i);let s=document.createElement("div");s.textContent="created by lucaste@",Object.assign(s.style,Wt,{padding:"16px 24px",borderTop:`1px solid ${B.bgInput}`,color:B.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),o.appendChild(s);let r=document.createElement("div");return Object.assign(r.style,Ee),r.className="no-drag",o.appendChild(r),Ae(o,r),ta(),{popup:o,content:i,header:n,animRefs:a,credit:s}}function ta(){if(document.getElementById("cw-notes-refactor-styles"))return;let t=document.createElement("style");t.id="cw-notes-refactor-styles",t.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${de.medium} !important;
            border: 1.5px solid ${B.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: all 0.2s ${se} !important;
            box-sizing: border-box !important;
            background: ${B.bgInput} !important;
            color: ${B.text} !important;
            outline: none !important;
            box-shadow: ${Re.subtle} !important;
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
            border-radius: ${de.pill};
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
            color: ${B.textSub};
            border: 1px solid ${B.border};
            border-radius: ${de.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${se};
        }
        .cw-btn-secondary:hover {
            background: ${B.bgInput};
            border-color: #bdc1c6;
            color: ${B.text};
        }
    `,document.head.appendChild(t)}var Se={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} Seguimos com os passos:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Pasos ejecutados:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:"}},Ce={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},ke={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},He={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},je=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],it=["CONSIDERACOES","COMENTARIOS"],st={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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

Irei solicitar descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var Ge=t=>new Promise(e=>setTimeout(e,t));function Je(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var to="cw-automation-styles";if(!document.getElementById(to)){let t=document.createElement("style");t.id=to,t.innerHTML=`
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
    `,document.head.appendChild(t)}function oo(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function rt(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),o="";oo(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let a=document.querySelector('material-button[debug-id="dock-item-case-log"]');a&&!a.classList.contains("selected")&&(Je(a),await Ge(1200));let n=document.querySelector("search-filter dropdown-button .button");if(n&&!(n.innerText||"").includes("All")){Je(n),await Ge(600);let w=document.querySelector('material-checkbox[debug-id="check-all-box"]');w&&w.getAttribute("aria-checked")!=="true"&&(Je(w),await Ge(300));let h=document.querySelector('material-button[debug-id="apply-filter"]');h&&(Je(h),await Ge(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await Ge(500));let s=Array.from(document.querySelectorAll(".message-header"));for(let p=s.length-1;p>=0;p--){let w=s[p],h=w.querySelector("i.material-icons-extended"),c=h&&h.innerText.trim()==="phone_in_talk",d=w.innerText||"",S=d.includes("Agent joined")||d.includes("outbound-call")||d.includes("Speakeasy");if(c||S){w.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",w),e&&(e.placeholder="Lendo mensagem..."),Je(w),await Ge(1e3));break}}let l=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),m=/Speakeasy.*?(P\d{15,25})/i,u=null;for(let p=l.length-1;p>=0;p--){let w=l[p];if(w.offsetParent===null)continue;let h=(w.innerText||"").match(m);if(h&&h[1]){u=h[1];break}}if(e)if(u){try{await navigator.clipboard.writeText(u)}catch{}e.tagName==="INPUT"||e.tagName==="TEXTAREA"?e.value=u:e.textContent=u,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),P.playSuccess(),X(`ID Localizado: ${u}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else P.playError(),X("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(a){console.error("Erro na automa\xE7\xE3o:",a),X("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),oo(!1)}}function ao(t){t.dataset.bulletEnabled!=="true"&&(t.dataset.bulletEnabled="true",(t.value.trim()===""||t.value.trim()==="\u2022")&&(t.value="\u2022 "),t.addEventListener("keydown",function(e){let o=this.selectionStart,a=this.selectionEnd,n=this.value,i=n.lastIndexOf(`
`,o-1)+1,s=n.substring(i,o);if(e.key==="Enter"){e.preventDefault();let r=s.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(s.trim()==="\u2022"){this.value=n.substring(0,i)+`
`+n.substring(a),this.selectionStart=this.selectionEnd=i+1;return}let l=`
`+r;this.value=n.substring(0,o)+l+n.substring(a),this.selectionStart=this.selectionEnd=o+l.length}else if(e.key==="Tab")e.preventDefault(),e.shiftKey?s.startsWith("  ")&&(this.value=n.substring(0,i)+s.substring(2)+n.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=n.substring(0,i)+"  "+s+n.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(e.key==="Backspace"&&o===a&&o>0){let r=n.substring(0,o);r.endsWith("\u2022 ")?(e.preventDefault(),this.value=r.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2):r.endsWith("  ")&&s.trim().startsWith("\u2022")&&(e.preventDefault(),this.value=r.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2)}}))}function Tt(t,e,o){if(e.innerHTML="",!!ke[t]&&(o.activeFields.forEach(n=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(n))return;let i=`field-${n}`,s=document.createElement("label"),r=p=>Se[o.currentLang]?.[p]||Se.pt?.[p]||p;s.textContent=r(n.toLowerCase())!==n.toLowerCase()?r(n.toLowerCase()):n.replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase())+":",Object.assign(s.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:B.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let l=document.createElement("span");if(l.textContent=s.textContent,s.innerHTML="",s.appendChild(l),n==="SPEAKEASY_ID"){let p=document.createElement("button");p.innerHTML="\u2728 Auto Busca",p.style.cssText=`font-size: 11px; font-weight: 700; color: ${B.primary}; background-color: ${B.primaryBg}; border: none; border-radius: ${de.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${se};`,p.onmouseenter=()=>p.style.backgroundColor="#d2e3fc",p.onmouseleave=()=>p.style.backgroundColor=B.primaryBg,p.onclick=w=>{w.preventDefault(),rt(i)},s.appendChild(p)}let m=document.createElement("button");m.innerHTML="\u2715",m.style.cssText=`font-size: 14px; background: ${B.bgInput}; border: none; color: ${B.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${se};`,m.onmouseenter=()=>{m.style.background=B.error,m.style.color=B.surface},m.onmouseleave=()=>{m.style.background=B.bgInput,m.style.color=B.textSub},m.onclick=async p=>{p.preventDefault(),await he(`Tem certeza que deseja remover o campo "${l.textContent.replace(":","")}"?`)&&(o.removeField(n),Tt(t,e,o))},s.appendChild(m);let u;je.includes(n)?(u=document.createElement("textarea"),u.classList.add("bullet-textarea","cw-textarea"),u.placeholder="Utilize marcadores para detalhar...",ao(u)):it.includes(n)?(u=document.createElement("textarea"),u.classList.add("cw-textarea"),u.placeholder="Descreva as considera\xE7\xF5es..."):(u=document.createElement("input"),u.type="text",u.classList.add("cw-input")),u.id=i,u.value=o.formData[i]||"",u.addEventListener("input",p=>o.updateField(i,p.target.value)),e.appendChild(s),e.appendChild(u)}),o.activeFields.includes("CONSENTIU_GRAVACAO"))){let n=r=>Se[o.currentLang]?.[r]||Se.pt?.[r]||r,i=document.createElement("label");i.textContent=n("consentiu_gravacao"),Object.assign(i.style,{display:"block",fontSize:"13px",fontWeight:"700",color:B.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let s=document.createElement("select");s.className="cw-select",s.innerHTML=`
            <option value="false">${n("nao")}</option>
            <option value="true">${n("sim")}</option>
        `,s.value=o.consent?"true":"false",s.onchange=()=>o.setConsent(s.value==="true"),e.appendChild(i),e.appendChild(s)}}function Ft(t,e,o){let a=t.currentSubStatus;if(!a)return null;let n=ke[a],i=Se[t.currentLang]||Se.pt,s=m=>i[m]||Se.pt?.[m]||m,r='style="margin-bottom: 12px; padding-left: 30px;"',l="";if(t.activeFields.forEach(m=>{let u=s(m.toLowerCase()),p="N/A";if(m==="label_substatus")u=s("label_substatus"),p=n.name;else if(m==="TAGS_IMPLEMENTED"){u=s("tags_implemented");let w=[];e.getCheckedElements().forEach(c=>{let d=c.value,S=Ce[d],T=c.count||1,M=d==="ads_conversion_tracking"||d==="ads_enhanced_conversions";t.tagSupportUsed&&M&&!t.forcedScreenshots.has(d)?w.push(`${S.name} - ${s("ts_output_disclaimer")}`):w.push(T>1?`${S.name} (x${T})`:S.name)}),p=w.join(", ")||"N/A"}else if(m==="SCREENSHOTS_LIST"){u=s("screenshots_list");let w="",h=e.screenshotsElement;h&&Array.from(h.querySelectorAll('input[id^="name-"]')).forEach(d=>{let S=d.value,T=d.closest(".cw-screen-card");if(T){let M=T.querySelectorAll('input[id^="screen-"]'),H=!1,N="";M.forEach(K=>{let q=K.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",O=K.value.trim();O&&(N+=`<li>${q} - ${O}</li>`,H=!0)}),H&&(w+=`<div style="margin-bottom: 8px;"><b>${S}</b><ul ${r}>${N}</ul></div>`)}}),p=w||"N/A"}else if(m==="CASO_PORTUGAL")u=s("caso_portugal"),p=s("sim");else if(m==="CONSENTIU_GRAVACAO")u=s("consentiu_gravacao"),p=t.consent?s("sim"):s("nao");else{let w=`field-${m}`,h=t.formData[w],c="";if(n.fieldPrefixes&&n.fieldPrefixes[m]&&(c=n.fieldPrefixes[m]+" "),h&&h.trim()!==""&&h.trim()!=="\u2022"){let d=h.trim();if(je.includes(m)){let S=d.split(`
`).map(T=>T.trim()).filter(T=>T!==""&&T!=="\u2022").map(T=>T.startsWith("\u2022 ")?T.substring(2):T).map(T=>`<li>${T}</li>`).join("");p=S?`${c}<ul ${r}>${S}</ul>`:"N/A"}else it.includes(m)?p=c+d.split(`
`).filter(S=>S.trim()!=="").map(S=>`<p style="margin: 0 0 8px 0;">${S}</p>`).join(""):p=c+d}else c&&(p=c.trim())}l+=`<b>${u}</b><br>${p}<br><br>`}),n.customFooter&&(l+=`${n.customFooter}<br><br>`),o?.getOutput){let m=o.getOutput();m&&(l+=`${m}<br><br>`)}return l+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",l.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}function no(t){let e=document.createElement("div");e.className="cw-step-scenarios";let o="Passe o mouse sobre um cen\xE1rio para visualizar o texto...",a=document.createElement("div");Object.assign(a.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let i=document.createElement("span");i.style.transition="opacity 0.2s ease, transform 0.2s ease",i.textContent=o,n.appendChild(i);let s=new Set,r=null;return e.render=(l,m)=>{s.clear();let u=Object.entries(st).filter(([p,w])=>{let h=!w.type||w.type==="all"||w.type===m,c=!1;return l.startsWith("NI_")?c=p.includes("-ni-")||p.includes("attempted"):l.startsWith("SO_")?c=p.includes("gtm")||p.includes("whatsapp")||p.includes("form")||p.includes("ecw4")||p.includes("ga4")||p.includes("-so-"):l.startsWith("AS_")?c=p.includes("-as-"):l.startsWith("IN_")?c=p.includes("-in-"):l.startsWith("DC_")&&(c=p.includes("-dc-")),h&&c});a.innerHTML="",u.forEach(([p,w])=>{let h=document.createElement("div"),c=p.replace("quickfill-","").replace(/-/g," ");h.textContent=c,h.dataset.id=p,Object.assign(h.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let d=w["field-REASON_COMMENTS"]||w["field-CONTEXTO_CALL"]||p;h.onmouseenter=()=>{r&&clearTimeout(r),s.has(p)||(h.style.background="#f1f3f4"),i.style.opacity="0",i.style.transform="translateY(5px)",r=setTimeout(()=>{i.textContent=d.substring(0,120)+(d.length>120?"...":""),i.style.opacity="1",i.style.transform="translateY(0)"},50)},h.onmouseleave=()=>{r&&clearTimeout(r),s.has(p)||(h.style.background="#ffffff"),r=setTimeout(()=>{s.size===0&&(i.style.opacity="0",setTimeout(()=>{i.textContent=o,i.style.opacity="1"},50))},100)},h.onclick=()=>{P.playClick();let S=!s.has(p);S?(s.add(p),h.style.background="#e8f0fe",h.style.borderColor="#1a73e8",h.style.color="#1967d2"):(s.delete(p),h.style.background="#ffffff",h.style.borderColor="#dadce0",h.style.color="#3c4043"),t(p,S)},a.appendChild(h)}),u.length===0?e.style.display="none":e.style.display="block"},e.appendChild(a),e.appendChild(n),e}var ae={bg:B.bgInput,white:B.surface,border:B.border,textMain:B.text,textSub:B.textSub,blue:B.blue,blueLight:B.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:B.blue,bg:B.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:B.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:B.primary,bg:B.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:B.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Be={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function io(t,e,o){let a={},n="implementation";o&&o.subscribe(()=>{K(),Z()});function i(q){let O=q.toLowerCase();return O.includes("ads")||O.includes("conversion")||O.includes("remarketing")?ae.brands.ads:O.includes("ga4")||O.includes("analytics")?ae.brands.ga4:O.includes("gtm")||O.includes("tag manager")||O.includes("container")?ae.brands.gtm:O.includes("merchant")||O.includes("shopping")||O.includes("feed")?ae.brands.gmc:ae.brands.default}let s=Object.entries(Ce).filter(([q,O])=>O.popular),r={};Object.entries(Ce).forEach(([q,O])=>{if(O.popular)return;let R=i(O.name);r[R.label]||(r[R.label]={brand:R,tasks:[]}),r[R.label].tasks.push({key:q,...O})});let l="cw-zen-tasks";if(!document.getElementById(l)){let q=document.createElement("style");q.id=l,q.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${ae.font}; background: ${ae.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${ae.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${ae.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${ae.white}; 
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
                font-size: 12px; font-weight: 500; color: ${ae.textMain}; line-height: 1.2; 
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
                color: ${ae.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${ae.border}; border-radius: 10px; background: ${ae.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${ae.blue}; box-shadow: 0 0 0 3px ${ae.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${ae.border}; border-radius: 10px; background: ${ae.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${ae.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${ae.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${ae.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${ae.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${ae.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${ae.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${ae.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${ae.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${ae.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${ae.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${ae.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${ae.textMain}; }
            
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
                font-family: ${ae.font}; font-size: 15px; font-weight: 600; color: ${ae.textMain};
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
                border-color: ${ae.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${ae.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${ae.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${ae.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 11px; font-weight: 700; color: ${ae.textSub};
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
        `,document.head.appendChild(q)}let m=document.createElement("div");m.className="cw-zen-container";let u=document.createElement("div");Object.assign(u.style,{display:"none"});let p=document.createElement("div");p.className="cw-screens-container",u.appendChild(p),m.innerHTML=`
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
    `;let w=m.querySelector(".cw-hero-grid"),h=m.querySelector(".cw-acc-container"),c=m.querySelector(".cw-results-container"),d=m.querySelector(".cw-search-input"),S=m.querySelector(".cw-status-bar"),T=m.querySelector(".cw-status-text"),M=m.querySelector(".cw-footer-icons");s.forEach(([q,O])=>{let R=i(O.name),Y=document.createElement("div");Y.className="cw-hero-card",Y.id=`hero-${q}`,Y.style.setProperty("--hero-color",R.color),Y.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Be[R.icon]}</div>
                <div class="cw-hero-label">${O.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,Y.onclick=D=>{if(D.target.closest(".cw-step-btn"))return;let F=a[q]?a[q].count:0;N(q,F>0?-F:1,O)},Y.querySelector(".minus").onclick=()=>N(q,-1,O),Y.querySelector(".plus").onclick=()=>N(q,1,O),Y.dataset.color=R.color,w.appendChild(Y)});function H(q,O){let R=i(O.name),Y=document.createElement("div");return Y.className="cw-task-item",Y.dataset.id=q,Y.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${R.bg}; color:${R.color}">
                    ${Be[R.icon]||Be.default}
                </div>
                <div class="cw-task-label">${O.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,Y.onclick=D=>{if(D.target.closest(".cw-step-btn"))return;let F=a[q]?a[q].count:0;N(q,F>0?-F:1,O)},Y.querySelector(".minus").onclick=()=>N(q,-1,O),Y.querySelector(".plus").onclick=()=>N(q,1,O),Y}Object.entries(r).forEach(([q,O])=>{let R=document.createElement("div");R.className="cw-acc-group";let Y=document.createElement("div");Y.className="cw-acc-header",Y.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${O.brand.color}"></div>
                ${q}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,Y.onclick=()=>{h.querySelectorAll(".cw-acc-group.open").forEach(F=>{F!==R&&F.classList.remove("open")}),R.classList.toggle("open")};let D=document.createElement("div");D.className="cw-acc-body",O.tasks.forEach(F=>{let z=H(F.key,F);D.appendChild(z)}),R.appendChild(Y),R.appendChild(D),h.appendChild(R)});function N(q,O,R){a[q]||(a[q]={count:0,data:R,brand:i(R.name)}),a[q].count+=O,a[q].count<=0&&delete a[q],K(),Z(),t&&t()}function K(){let q=o.tagSupportUsed;s.forEach(([F])=>{let z=w.querySelector(`#hero-${F}`);if(!z)return;let _=a[F];_?(z.classList.add("active"),z.querySelector(".cw-step-val").textContent=_.count,z.querySelector(".cw-step-val").style.color=z.dataset.color,q&&(F==="ads_conversion_tracking"||F==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(F)?z.classList.add("ts-success"):z.classList.remove("ts-success")):(z.classList.remove("active"),z.classList.remove("ts-success"))}),m.querySelectorAll(".cw-task-item").forEach(F=>{let z=F.dataset.id,_=a[z];_?(F.classList.add("selected"),F.querySelector(".cw-step-val").textContent=_.count,q&&(z==="ads_conversion_tracking"||z==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(z)?F.classList.add("ts-success"):F.classList.remove("ts-success")):(F.classList.remove("selected"),F.classList.remove("ts-success"))});let R=Object.keys(a),Y=0,D=[];if(R.forEach(F=>{let z=a[F];Y+=z.count;for(let _=0;_<z.count;_++)D.length<6&&D.push(z.brand)}),Y>0){S.classList.add("visible");let F=Y>1?"A\xE7\xF5es":"A\xE7\xE3o",z=Y>1?"definidas":"definida";T.textContent=`${Y} ${F} ${z}`,M.innerHTML="",D.forEach(_=>{let x=document.createElement("div");x.className="cw-mini-icon",x.innerHTML=Be[_.icon]||Be.default;let E=x.querySelector("svg");E&&(E.style.width="14px",E.style.height="14px"),M.appendChild(x)})}else S.classList.remove("visible")}d.addEventListener("input",q=>{let O=q.target.value.toLowerCase();if(O.length>0){h.style.display="none",c.style.display="block",c.innerHTML="";let R=!1;Object.entries(Ce).forEach(([Y,D])=>{if(D.name.toLowerCase().includes(O)){R=!0;let F=H(Y,D);a[Y]&&(F.classList.add("selected"),F.querySelector(".cw-step-val").textContent=a[Y].count),c.appendChild(F)}}),R||(c.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else h.style.display="block",c.style.display="none"});function Z(){p.innerHTML="";let q=Object.keys(a),O=!1;if(q.length===0){p.innerHTML=`<div class="cw-empty-state">${e("selecione_tarefas")}</div>`,u.style.display="none";return}let R=o.tagSupportUsed,Y=document.createElement("div");Y.className="cw-info-banner",Y.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,p.appendChild(Y),q.forEach(D=>{let F=a[D].data,z=a[D].count,_=a[D].brand,E=R&&(D==="ads_conversion_tracking"||D==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(D),f=o.screenshotMode||"implementation",y=F.screenshots?.[f]||[];if(y.length>0||E){O=!0;for(let k=1;k<=z;k++){let v=document.createElement("div");v.className="cw-screen-card",E&&v.classList.add("ts-success"),v.style.setProperty("--brand-color",_.color),v.style.setProperty("--brand-bg",_.bg),v.style.setProperty("--brand-shadow",_.color+"40");let L=document.createElement("div");L.className="cw-card-header";let g=document.createElement("div");g.className="cw-card-icon",g.innerHTML=Be[_.icon]||Be.default;let G=document.createElement("div");G.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let $=document.createElement("input");$.className="cw-card-title-input",$.id=`name-${D}-${k}`,$.value=`${F.name}${z>1?" #"+k:""}`,$.title="Clique para renomear esta task";let I=document.createElement("span");if(I.className="cw-edit-hint",I.innerHTML="\u270E Renomear",G.appendChild($),G.appendChild(I),L.appendChild(g),L.appendChild(G),v.appendChild(L),E){let b=document.createElement("div");b.className="cw-ts-disclaimer-box",b.innerHTML=`
                <span>${e("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${e("incluir_mesmo_assim")}</button>
            `,b.querySelector("button").onclick=()=>{o.toggleForcedScreenshot(D,!0)},v.appendChild(b)}else y.forEach((b,C)=>{let A=document.createElement("div");A.className="cw-input-group";let U=document.createElement("label");U.className="cw-input-label",U.textContent=b;let j=document.createElement("input");j.className="cw-input-field",j.id=`screen-${D}-${k}-${C}`,j.placeholder="Cole o link aqui...",j.setAttribute("autocomplete","off"),j.addEventListener("input",()=>{j.value.trim().length>5?j.classList.add("filled"):j.classList.remove("filled")});let J=document.createElement("div");J.className="cw-input-check",J.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',A.appendChild(U),A.appendChild(j),A.appendChild(J),v.appendChild(A)});p.appendChild(v)}}}),u.style.display=O?"block":"none"}return{selectionElement:m,screenshotsElement:u,updateSubStatus:()=>Z(),getCheckedElements:()=>Object.keys(a).map(q=>({value:q,count:a[q].count})),setTaskCount:(q,O)=>{a[q]&&delete a[q],O>0&&Ce[q]&&N(q,O,Ce[q])},toggleTask:(q,O=!0)=>{let R=a[q];O&&!R?N(q,1,Ce[q]):!O&&R&&N(q,-R.count,Ce[q])},setLanguage:q=>{e=q;let O=m.querySelector(".js-hero-title");O&&(O.textContent=e("acesso_rapido"));let R=m.querySelector(".cw-search-input");R&&(R.placeholder=e("buscar_catalogo")),Z()},reset:()=>{for(let q in a)delete a[q];d.value="",h.style.display="block",c.style.display="none",K(),Z()}}}var oa={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},aa={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},na={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},ia={display:"flex",gap:"20px",marginBottom:"12px"};function so(t){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,oa);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=t("utilizou_tag_support"),Object.assign(o.style,Et,{marginTop:"0"});let a=document.createElement("div");Object.assign(a.style,ia);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,kt);let i=document.createElement("label");i.textContent="Sim";let s=document.createElement("div");Object.assign(s.style,{display:"flex",alignItems:"center"}),s.appendChild(n),s.appendChild(i);let r=document.createElement("input");r.type="radio",r.name="ts_usage_mod",r.value="N\xE3o",r.checked=!0,Object.assign(r.style,kt);let l=document.createElement("label");l.textContent="N\xE3o";let m=document.createElement("div");Object.assign(m.style,{display:"flex",alignItems:"center"}),m.appendChild(r),m.appendChild(l),a.appendChild(s),a.appendChild(m);let u=document.createElement("div");u.style.display="block";let p=document.createElement("label");p.className="js-ts-reason-label",p.textContent=t("motivo_ts"),Object.assign(p.style,Et,{fontSize:"12px"});let w=document.createElement("input");w.type="text",Object.assign(w.style,na);let h=document.createElement("div");h.className="js-ts-warning",h.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(h.style,aa),u.appendChild(p),u.appendChild(w),u.appendChild(h),e.appendChild(o),e.appendChild(a),e.appendChild(u),n.onchange=()=>{u.style.display="none",Promise.resolve().then(()=>(Ke(),nt)).then(M=>M.notesState.setTagSupportUsed(!0))},r.onchange=()=>{u.style.display="block",Promise.resolve().then(()=>(Ke(),nt)).then(M=>M.notesState.setTagSupportUsed(!1))};function c(M,H){if(e.style.display="none",!M||!H||H.length===0)return;H.some(K=>K==="ads_conversion_tracking"||K==="ads_enhanced_conversions")?e.style.display="block":(T(),Promise.resolve().then(()=>(Ke(),nt)).then(K=>K.notesState.setTagSupportUsed(!1)))}function d(){if(e.style.display==="none")return"";let M=`<br><b>Utilizou Tag Support?</b> ${n.checked?"\u2705 Sim":"\u274C N\xE3o"}`;return r.checked&&w.value.trim()!==""&&(M+=`<br><b>Motivo:</b> ${w.value}`),M+="<br>",M}function S(M){t=M,o.textContent=t("utilizou_tag_support"),p.textContent=t("motivo_ts"),h.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`}function T(){e.style.display="none",r.checked=!0,n.checked=!1,u.style.display="block",w.value=""}return{element:e,updateVisibility:c,getOutput:d,setLanguage:S,reset:T}}var Lt="cw_notes_parking_lot",lt="cw_notes_emergency_save";var ge={getAll:()=>{try{return JSON.parse(localStorage.getItem(Lt)||"[]")}catch{return[]}},save:t=>{let e=ge.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...t};return e.unshift(o),e.length>5&&e.pop(),localStorage.setItem(Lt,JSON.stringify(e)),o},delete:t=>{let e=ge.getAll();return e=e.filter(o=>o.id!==t),localStorage.setItem(Lt,JSON.stringify(e)),e},getCount:()=>ge.getAll().length,saveEmergency:t=>{let e={timestamp:Date.now(),data:t};localStorage.setItem(lt,JSON.stringify(e))},getEmergency:()=>{try{let t=localStorage.getItem(lt);if(!t)return null;let e=JSON.parse(t);return Date.now()-e.timestamp>432e5?(localStorage.removeItem(lt),null):!e.data||!e.data.subStatus?null:e.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(lt)}};var ct=["lucaste","ricardogi"];var ie={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},dt=t=>new Promise(e=>setTimeout(e,t));function pt(t){let e=document.getElementById("cw-btn-notes");if(!e)return;let o=e.querySelector(".cw-dot-dirty");t?o||(o=document.createElement("div"),o.className="cw-dot-dirty",e.appendChild(o)):o&&o.remove()}function ro(t){let e="cw-command-center-style";if(!document.getElementById(e)){let d=document.createElement("style");d.id=e,d.innerHTML=`
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
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 14px;
                padding: 18px 8px;
                
                background: ${ie.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${ie.glassBorder}; border-radius: 50px;
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
                cursor: pointer; position: relative; color: ${ie.iconIdle};
                flex-shrink: 0;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn:hover {
                background: ${ie.glassHighlight};
                color: ${ie.iconActive};
                transform: scale(1.18) translateY(-2px) !important;
            }

            .cw-btn.notes.active { color: ${ie.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${ie.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${ie.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${ie.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${ie.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${ie.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${ie.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${ie.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${ie.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${ie.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${ie.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${ie.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${ie.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${ie.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${ie.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${ie.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${ie.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${ie.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-pill.dragging .cw-grip-bar { background-color: ${ie.blue}; width: 16px; opacity: 1; }

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
            .cw-center-dots span:nth-child(1) { background-color: ${ie.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${ie.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${ie.green}; }
            
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
            
            .cw-center-success { display: none; color: ${ie.green}; margin-bottom: 10px; }
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
        `,document.head.appendChild(d)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>'},a=document.createElement("div");a.id="cw-floating-trigger",a.className="cw-pill side-right collapsed",a.innerHTML=`
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
    `;let n=document.createElement("div");n.className="cw-focus-backdrop",document.body.appendChild(n),document.body.appendChild(a);let i=(d,S)=>{P.playClick(),a.querySelector(`.${d}`).classList.toggle("active"),S()};if(a.querySelector(".notes").onclick=d=>{d.stopPropagation(),i("notes",t.toggleNotes)},a.querySelector(".bauform").onclick=d=>{d.stopPropagation(),i("bauform",t.toggleBAUForm)},a.querySelector(".email").onclick=d=>{d.stopPropagation(),i("email",t.toggleEmail)},a.querySelector(".script").onclick=d=>{d.stopPropagation(),i("script",t.toggleScript)},a.querySelector(".links").onclick=d=>{d.stopPropagation(),i("links",t.toggleLinks)},a.querySelector(".library").onclick=d=>{d.stopPropagation(),i("library",t.toggleLibrary)},a.querySelector(".timezone").onclick=d=>{d.stopPropagation(),i("timezone",t.toggleTimezone)},a.querySelector(".configs").onclick=d=>{d.stopPropagation(),i("configs",t.toggleConfigs)},a.querySelector(".broadcast").onclick=d=>{d.stopPropagation(),i("broadcast",()=>{let S=d.currentTarget.querySelector(".cw-badge");S&&S.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},a.querySelectorAll(".cw-btn").forEach(d=>{d.addEventListener("mouseenter",()=>P.playHover())}),t.broadcastControl&&t.broadcastControl.hasUnread){let d=document.createElement("div");d.className="cw-badge",a.querySelector(".broadcast").appendChild(d)}let s=null;a.onmouseleave=()=>{a.querySelector(".cw-btn.active")||a.classList.contains("processing-center")||(s=setTimeout(()=>{a.classList.add("collapsed")},3e3))},a.onmouseenter=()=>{s&&clearTimeout(s)},(async function(){let S=()=>{let M=fe();if(M){let H=M.split("@")[0].toLowerCase();if(ct.includes(H)){let N=a.querySelector("#cw-admin-tag");N&&N.classList.add("visible")}}else setTimeout(S,2e3)};S(),await dt(2800),a.classList.add("docked"),await dt(300);let T=a.querySelectorAll(".cw-btn");a.querySelectorAll(".cw-sep").forEach(M=>M.classList.add("visible"));for(let M=0;M<T.length;M++)T[M].classList.add("popped"),await dt(90);await dt(200),a.classList.add("system-check")})();let r=!1,l,m,u,p,w=3;a.onmousedown=d=>{if(d.target.closest("button"))return;d.preventDefault(),l=d.clientX,m=d.clientY;let S=a.getBoundingClientRect();u=S.left,p=S.top,document.addEventListener("mousemove",h),document.addEventListener("mouseup",c)};function h(d){let S=d.clientX-l,T=d.clientY-m;!r&&Math.sqrt(S*S+T*T)>w&&(r=!0,a.classList.add("dragging"),a.style.transition="none",s&&clearTimeout(s)),r&&(a.style.left=`${u+S}px`,a.style.top=`${p+T}px`,a.style.right="auto",a.style.bottom="auto",a.style.transform="none")}function c(d){if(document.removeEventListener("mousemove",h),document.removeEventListener("mouseup",c),r){r=!1,a.classList.remove("dragging");let S=window.innerWidth,T=window.innerHeight,M=a.getBoundingClientRect(),H=M.left+M.width/2,N;H<S/2?(N=24,a.classList.remove("side-right"),a.classList.add("side-left")):(N=S-M.width-24,a.classList.remove("side-left"),a.classList.add("side-right"));let K=Math.max(24,Math.min(M.top,T-M.height-24));setTimeout(()=>{a.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),a.style.left=`${N}px`,a.style.top=`${K}px`,a.style.bottom="auto",a.style.transform=""},10),setTimeout(()=>{a.style.transition="",a.style.removeProperty("transition")},700)}else{let S=a.querySelector(".cw-btn.active"),T=d.target.closest("button");if(a.classList.contains("collapsed")){let M=a.getBoundingClientRect(),H=window.innerHeight,N=M.top>H/2;if(a.style.setProperty("transition","none","important"),N){let K=H-M.bottom;a.style.top="auto",a.style.bottom=`${K}px`}else a.style.bottom="auto",a.style.top=`${M.top}px`;a.offsetWidth,a.style.removeProperty("transition"),a.classList.remove("collapsed"),P.playGenieOpen()}else!S&&!T&&(a.classList.add("collapsed"),P.playGenieOpen());T&&(T.style.transform="scale(0.9)",setTimeout(()=>T.style.transform="",150))}}}function Ze(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${le.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let a=document.createElement("div");a.className="cw-abort-btn",a.textContent="Cancelar",a.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,X("Cancelado!",{duration:3e3}),o.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},o.appendChild(a),t.appendChild(o);let n=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(o))return;let s=Date.now()-n,r=Math.max(0,2e3-s);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(o))return;let l=o.querySelector(".cw-center-dots"),m=o.querySelector(".cw-center-text"),u=o.querySelector(".cw-center-success"),p=o.querySelector(".cw-abort-btn");l&&(l.style.display="none"),m&&(m.style.display="none"),p&&(p.style.display="none"),u&&u.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{o.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},r)}}function lo(t){let{onSaveCurrent:e,onLoadDraft:o,t:a}=t,n=document.createElement("button");n.className="js-btn-park",n.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${a("guardar")}</span>
    `,n.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${de.pill};
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
        transition: all 0.2s ${se};
        box-shadow: ${Re.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,n.onmouseenter=()=>{n.style.backgroundColor="#F8F9FA",n.style.borderColor="#202124",n.style.color="#202124",n.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",n.style.transform="translateY(-1px)"},n.onmouseleave=()=>{n.style.backgroundColor="#FFFFFF",n.style.borderColor="#DADCE0",n.style.color="#5F6368",n.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",n.style.transform="translateY(0)"},n.onmousedown=()=>n.style.transform="scale(0.96)",n.onmouseup=()=>n.style.transform="scale(1) translateY(-1px)",n.onclick=async()=>{if(await he("Deseja guardar o rascunho atual e limpar os campos?"))try{let d=await e();d?(ge.save(d),h(),r(),P.playSuccess(),X("Rascunho salvo com sucesso!")):X("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(d){console.error("Erro ao salvar rascunho:",d),X("Erro ao salvar.",{error:!0})}};let i=document.createElement("div");i.title="Meus Rascunhos",i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let s=document.createElement("div");s.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(s),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=c=>{c.stopPropagation(),w()};function r(){let c=ge.getCount();pt(c>0),c>0?(s.style.display="block",s.textContent=c,s.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):s.style.display="none"}let l=document.createElement("div");l.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${B.surface}; z-index: 100;
        border-radius: ${de.large} ${de.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${se};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let m=document.createElement("div");m.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",m.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${a("rascunhos_salvos")}</span>`;let u=document.createElement("button");u.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',u.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",u.onmouseenter=()=>u.style.background="#F1F3F4",u.onmouseleave=()=>u.style.background="transparent",u.onclick=()=>w(!1),m.appendChild(u);let p=document.createElement("div");p.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",l.appendChild(m),l.appendChild(p);function w(c){let d=l.style.transform==="translateY(0%)";(c!==void 0?c:!d)?(h(),l.style.transform="translateY(0%)"):l.style.transform="translateY(110%)"}function h(){let c=ge.getAll();if(p.innerHTML="",c.length===0){p.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${B.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${a("nenhum_rascunho")}</div>
                </div>`;return}c.forEach(d=>{let S=document.createElement("div");S.style.cssText=`
                background: ${B.surface}; padding: 20px; border-radius: ${de.large};
                border: 1.5px solid ${B.bgInput}; box-shadow: ${Re.subtle};
                position: relative; transition: all 0.3s ${se};
            `;let M=new Date(d.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),H="";d.summaryTags&&d.summaryTags.length>0&&(H=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${d.summaryTags.slice(0,3).join(", ")+(d.summaryTags.length>3?"...":"")}</div>`),S.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${d.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${M}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${d.cid||"---"}</span>
                    <span style="display:block; color:${d.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${d.subStatus||d.status||"Sem Status"}</span>
                    ${H}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let N=S.querySelector(".cw-resume-btn");N.onclick=async()=>{await he("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(d),ge.delete(d.id),h(),r(),w(!1),P.playSwoosh(),X("Rascunho carregado."))};let K=S.querySelector(".cw-del-btn");K.onclick=async()=>{await he("Excluir este rascunho?",{danger:!0})&&(ge.delete(d.id),h(),r())},p.appendChild(S)})}return r(),{parkButton:n,historyBtnWrapper:i,drawer:l}}var co=t=>new Promise(e=>setTimeout(e,t));function ut(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function Qe(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let a=window.getSelection();a.removeAllRanges(),a.addRange(o);try{document.execCommand("copy")}catch{X("Falha ao copiar",{error:!0})}a.removeAllRanges(),document.body.removeChild(e)}function mt(t){["input","change","keydown","keyup"].forEach(o=>{let a=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(a)})}function po(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function gt(){console.log("Iniciando processo de Nova Nota...");let t=po(),e=t.length,a=Array.from(document.querySelectorAll("i.material-icons-extended")).find(s=>s.innerText.trim()==="description");if(a){let s=a.closest("material-fab")||a.closest("material-button");s?(s.style&&(s.style.display="block",s.style.visibility="visible"),ut(s)):ut(a)}else{let s=document.querySelector("material-fab-speed-dial");if(s){let r=s.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),ut(r)):s.click(),await co(800);let m=Array.from(document.querySelectorAll("i.material-icons-extended")).find(u=>u.innerText.trim()==="description");m&&ut(m)}}let n=null,i=0;for(;!n&&i<20;){await co(300);let s=po();if(s.length>e)n=s.find(r=>!t.includes(r)),n||(n=s[s.length-1]);else if(i>10){let r=s.filter(l=>l.offsetParent!==null);r.length>0&&(n=r[r.length-1])}i++}return n}function uo(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let a=document.createElement("div");a.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(a),e.appendChild(o),o.addEventListener("scroll",()=>{a.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let n={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function s({id:H,label:N,type:K="text",placeholder:Z="",required:q=!1,parent:O=o}){let R=document.createElement("div");R.style.cssText=n.inputWrapper;let Y=document.createElement("label");Y.style.cssText=n.label,Y.innerHTML=`${N} ${q?'<span style="color:#D93025">*</span>':""}`;let D;return K==="textarea"?(D=document.createElement("textarea"),D.style.cssText=n.input+n.textarea):(D=document.createElement("input"),D.type=K,D.style.cssText=n.input),D.id=H,D.placeholder=Z,D.addEventListener("focus",()=>{D.style.borderColor="#1a73e8",D.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),D.addEventListener("blur",()=>{D.style.borderColor="#DADCE0",D.style.boxShadow="none",q&&D.value.trim()!==""&&(D.style.backgroundColor="#FFF")}),i[H]={input:D,wrapper:R,required:q},R.appendChild(Y),R.appendChild(D),O.appendChild(R),R}function r({id:H,label:N,options:K=["Yes","No"],defaultValue:Z="No",onChange:q=null}){let O=document.createElement("div");O.style.cssText=n.inputWrapper;let R=document.createElement("label");R.style.cssText=n.label,R.textContent=N,O.appendChild(R);let Y=document.createElement("div");Y.style.cssText=n.radioGroup;let D=document.createElement("input");return D.type="hidden",D.id=H,D.value=Z,O.appendChild(D),K.forEach(F=>{let z=document.createElement("div");z.textContent=F,z.style.cssText=n.radioLabel,F===Z&&(z.style.cssText+=n.radioActive),z.onclick=()=>{Array.from(Y.children).forEach(x=>x.style.cssText=n.radioLabel),z.style.cssText+=n.radioActive,D.value=F,q&&q(F)},Y.appendChild(z)}),i[H]={input:D,wrapper:O,required:!1},O.appendChild(Y),o.appendChild(O),O}let l=document.createElement("div");l.style.cssText=n.banner,l.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(l);let m=document.createElement("div");m.style.marginBottom="24px";let u=document.createElement("button");u.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",u.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",u.onmouseover=()=>u.style.background="#E1EFFF",u.onmouseout=()=>u.style.background="#F0F7FF",m.appendChild(u),o.appendChild(m);let p=document.createElement("div");p.style.cssText=n.section,p.innerHTML=`<div style="${n.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(p),s({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:p}),s({id:"ga4",label:"GA4 Property ID",parent:p}),s({id:"gtm",label:"GTM Container ID",parent:p});let w=document.createElement("div");w.style.cssText=n.hiddenField,p.appendChild(w),r({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:H=>{H==="Yes"?w.style.cssText=n.visibleField+"margin-bottom:14px;":(w.style.cssText=n.hiddenField,i.accessEmail.input.value="")}}),s({id:"accessEmail",label:"User Access Email",parent:w}),r({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let h=document.createElement("div");h.style.cssText=n.section,h.innerHTML=`<div style="${n.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(h),s({id:"name",label:"Advertiser Name",required:!0,parent:h}),s({id:"url",label:"Website URL",parent:h}),s({id:"phone",label:"Phone Number",parent:h}),s({id:"email",label:"Contact Email",parent:h}),s({id:"callback",label:"Preferred Callback Time (Timezone)",parent:h}),s({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:h}),s({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:h}),s({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:h});let c=document.createElement("div");c.style.cssText=n.section,c.innerHTML=`<div style="${n.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(c),s({id:"cc_adv",label:"Advertiser Contact",parent:c}),s({id:"cc_am",label:"Account Manager",parent:c});let d=document.createElement("div");d.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let S=document.createElement("button");S.innerHTML="Voltar",S.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",S.onclick=t;let T=document.createElement("button");T.textContent="Gerar Nota",T.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",d.appendChild(S),d.appendChild(T),e.appendChild(d),u.onclick=async()=>{let H=u.innerHTML;u.innerHTML="\u23F3 Buscando dados...";try{let N=await xe(),K=0,Z=(R,Y)=>{let D=i[R];Y&&D&&D.input.value===""&&(D.input.value=Y,D.input.style.backgroundColor="#E6F4EA",D.input.style.borderColor="#34A853",setTimeout(()=>{D.input.style.backgroundColor="#FFF",D.input.style.borderColor="#DADCE0"},1e3),K++)};Z("name",N.advertiserName),Z("url",N.websiteUrl),N.clientEmail&&(Z("email",N.clientEmail),Z("cc_adv",N.clientEmail));let O=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);O&&Z("cid",O[0]),K>0?X(`${K} campos preenchidos!`):X("Nenhum dado novo encontrado.")}catch(N){console.error(N),X("Erro ao ler p\xE1gina.")}finally{u.innerHTML=H}};let M=()=>{let H=!0,N=null;return Object.values(i).forEach(K=>{K.required&&!K.input.value.trim()&&(H=!1,K.input.style.cssText+=n.inputError,K.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),N||(N=K.input))}),N&&N.scrollIntoView({behavior:"smooth",block:"center"}),H};return T.onclick=async()=>{if(!M()){X("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let H=R=>i[R].input.value||"N/A",N=H("hasAccess"),K=N==="Yes"?H("accessEmail"):"N/A",q=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${H("cid")}
<b>GA4 ID:</b> ${H("ga4")}
<b>GTM ID:</b> ${H("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${N==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${K}
<b>Ghosting Access Available (Y/N):</b> ${H("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${H("name")}
<b>Website:</b> ${H("url")}
<b>Phone Number:</b> ${H("phone")}
<b>Preferred Callback:</b> ${H("callback")}
<b>Email Address:</b> ${H("email")}

<b>Detailed Issue Description:</b>
${H("desc")}

<b>Uncropped screenshots:</b>
${H("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${H("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${H("cc_adv")}
<b>Account Manager:</b> ${H("cc_am")}
`.replace(/\n/g,"<br>");Qe(q);let O=await gt();O?(O.innerText.trim()===""&&(O.innerHTML=""),document.execCommand("insertHTML",!1,q),mt(O),X("Nota gerada e inserida!")):X("Copiado! Abra uma nota para colar.")},e}var be=t=>new Promise(e=>setTimeout(e,t));function ve(t,e="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,o[e]||o.info)}function Te(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function bt(t,e){if(!t)return;let o=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,a=document.getElementById(o);a&&a.remove();let n=t.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
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
    `;let s=i.querySelector(".cw-close-btn");s.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&s.click()},25e3)}async function ft(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await be(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await be(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Ot(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let a=o.offsetParent!==null,n=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return a&&!n&&i});return e&&ve("Editor visualmente detectado.","success"),e}async function mo(){ve("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="email");if(o&&o.offsetParent!==null){ve("Bot\xE3o de email direto encontrado.");let p=o.closest("material-button")||o.closest("material-fab")||o;Te(p),t=!0}else{ve("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let p=document.querySelector("material-fab-speed-dial");if(p){let w=p.querySelector(".trigger");if(w){Te(w),await be(800);let c=Array.from(document.querySelectorAll("i.material-icons-extended")).find(d=>d.innerText.trim()==="email");c&&(Te(c),t=!0)}}}if(!t)return X("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ve("\u{1F680} FASE 2: Verificando rascunhos...");let a=null,n=0,i=20;for(;n<i;){await be(250);let p=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(a=Array.from(p).find(w=>w.offsetParent!==null),a){ve("\u26A0\uFE0F Rascunho detectado!","warn");break}n++}if(a){ve("\u{1F5D1}\uFE0F Descartando..."),Te(a),a.click();let p=null,w=0;for(;w<15;){await be(300);let h=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(p=Array.from(h).find(c=>c.offsetParent!==null),p)break;w++}p&&(Te(p),X("Limpando rascunho antigo...",{duration:2e3}),await be(2500))}ve("\u{1F680} FASE 3: Buscando editor final...");let s=0,r=null;for(;s<20&&(r=Ot(),!r);)await be(250),s++;if(!r)return X("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let l=r.closest('[id="email-body-content-top"]'),u=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(l){if(u){let w=u.closest('[aria-hidden="true"]');w&&w.removeAttribute("aria-hidden"),u.focus(),Te(u)}await be(300),l.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let p=l.querySelector("#cases-body-field");if(p){let w=document.createRange();w.selectNodeContents(p),w.collapse(!0);let h=window.getSelection();h.removeAllRanges(),h.addRange(w)}return!0}return!1}async function xt(t){if(!t||!await mo())return;let o=await xe();ve("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let a=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(a&&(a.click(),await be(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await ft(i,o.clientEmail),bt(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await ft(i,o.internalEmail),bt(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await be(500);let n=document.querySelector('material-button[debug-id="canned_response_button"]');if(n){Te(n),await be(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Te(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),ve("\u23F3 Buscando resultado da Canned Response...","info");let s=null,r=0,l=15e3,m=500;for(;r<l&&(s=document.querySelector("material-select-dropdown-item"),!s);)await be(m),r+=m;if(s){Te(s),await be(1500);let u=Ot();if(u){let w=Array.from(u.querySelectorAll("span.field")).filter(c=>c.innerText.includes("{Requested Task Type}"));if(w.length>0){let c=w.map(S=>S.closest("tr")).filter(S=>S!==null),d=[...new Set(c)];if(d.length>0){let T=d[0].querySelector('td[width="100%"]');T&&(T.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let M=1;M<d.length;M++)d[M].remove()}}let h=u.innerHTML;o.advertiserName&&h.includes("{%ADVERTISER_NAME%}")&&(h=h.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),h.includes("{%^79285%}")&&(h=h.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),u.innerHTML=h}X("Canned Response aplicada!")}else ve(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),X(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else X("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function go(t){if(ve(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await mo())return;let o=await xe(),a=Xe();await be(600);let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await be(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await ft(r,o.clientEmail),bt(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await ft(r,o.internalEmail),bt(r,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await be(300));let s=Ot();if(s){let l=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');l&&(l.focus(),Te(l));let m=new Date;m.setDate(m.getDate()+3);let u=m.getDay();u===6?m.setDate(m.getDate()+2):u===0&&m.setDate(m.getDate()+1);let p=m.toLocaleDateString("pt-BR"),w=t.body;w=w.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),w=w.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),w=w.replace(/\[URL\]/g,o.websiteUrl||"seu site"),w=w.replace(/\[Seu Nome\]/g,a),w=w.replace(/\[MM\/DD\/YYYY\]/g,p),document.execCommand("insertHTML",!1,w),l&&(l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),X("Email preenchido com sucesso!",{duration:2e3}),ve("\u2705 Processo finalizado com sucesso.","success")}else X("Erro ao focar no editor.",{error:!0})}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function ue(t,e,o){let a=document.getElementById(o);if(!e)return;let n=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(a){let u=a.getBoundingClientRect();i.x=u.left+u.width/2,i.y=u.top+u.height/2}let s,r;if(!n)s=window.innerWidth/2,r=window.innerHeight/2;else{let u=e.getBoundingClientRect();s=u.left+u.width/2,r=u.top+u.height/2,s===0&&r===0&&(s=window.innerWidth/2,r=window.innerHeight/2)}let l=i.x-s,m=i.y-r;t?(P.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",n?e.style.transform=`translate(${l}px, ${m}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${l}px), calc(-50% + ${m}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),a&&a.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",n?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof bo=="function"&&bo(e,o)):(P.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",n?e.style.transform=`translate(${l}px, ${m}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${l}px), calc(-50% + ${m}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),a&&a.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof It=="function"&&It(e))}function bo(t,e){It(t);let o=a=>{if(!t.classList.contains("open"))return;let n=t.contains(a.target),i=document.querySelector(".cw-pill"),s=i&&i.contains(a.target);n?(t.classList.remove("idle"),t.style.zIndex="2147483648"):s||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function It(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}function fo(){let t="v4.0.0",{popup:e,content:o,header:a,animRefs:n,credit:i}=eo(t,Z),s=so(g),r=io(()=>{F(),W.setActiveTasks(r.getCheckedElements())},g,W),l=document.createElement("div");l.style.display="none";let m=no((b,C)=>{z(b,C)});l.appendChild(m);let u=lo({onSaveCurrent:async()=>{let b=await k();return y(),b},onLoadDraft:b=>{L(b)},t:b=>g(b)}),p=O(),w=R(),h=document.createElement("div"),c=$(),d=_(u,g);o.appendChild(p),o.appendChild(w),o.appendChild(c),o.appendChild(l),o.appendChild(h),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none";let S=document.createElement("button");S.id="manual-task-toggle",S.textContent=g("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",S.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${B.primary}; background: ${B.surface}; color: ${B.primary}; border-radius: ${de.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${se}; text-transform: uppercase; letter-spacing: 0.5px;`,S.onmouseenter=()=>{S.style.background=B.primaryBg},S.onmouseleave=()=>{S.style.background=B.surface},S.onclick=()=>{r.selectionElement.style.display="block",r.screenshotsElement.style.display="block",S.style.display="none"},o.appendChild(S),o.appendChild(r.selectionElement),o.appendChild(s.element),o.appendChild(r.screenshotsElement),o.appendChild(d);let T=document.createElement("div");T.style.display="none",T.style.flexGrow="1",T.style.minHeight="0",T.style.overflow="hidden";let M=uo(()=>q());M.style.height="100%",T.appendChild(M),e.insertBefore(T,i);let H=a.lastElementChild;H&&(H.insertBefore(u.historyBtnWrapper,H.firstChild),H.insertBefore(G(),H.firstChild)),e.appendChild(u.drawer);let N=null;W.subscribe(b=>{I(b),K(),b.isDirty?(N&&clearTimeout(N),N=setTimeout(async()=>{let C=await k(!0);C.subStatus?ge.saveEmergency(C):ge.clearEmergency(),b.isDirty=!1},2e3)):N&&(clearTimeout(N),N=null)});function K(){let b=ge.getCount()>0,C=!!W.currentSubStatus;pt(b||C)}function Z(){W.visible=!W.visible,ue(W.visible,e,"cw-btn-notes")}function q(){W.isSplitView=!W.isSplitView,W.isSplitView?(o.style.display="none",T.style.display="flex",T.style.flexDirection="column",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",T.style.display="none",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function O(){let b=document.createElement("div");if(b.innerHTML=`
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-idioma" style="font-size: 10px; margin-bottom: 6px;">${g("idioma")}</div>
                    <div class="cw-segmented-control" id="lang-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-lang="pt" class="active" style="z-index:2">PT</button>
                        <button data-lang="es" style="z-index:2">ES</button>
                    </div>
                </div>
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
        `,!document.getElementById("cw-segmented-styles")){let A=document.createElement("style");A.id="cw-segmented-styles",A.innerHTML=`
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
                    transition: all 0.3s ${se};
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
            `,document.head.appendChild(A)}let C=(A,U)=>{let J=b.querySelector(`#${A}`).querySelector(".cw-segmented-indicator");J&&(J.style.transform=`translateX(${U*100}%) translateX(${U*2}px)`)};return b.querySelectorAll("#lang-selector button").forEach((A,U)=>{A.onclick=()=>{W.setLanguage(A.dataset.lang),b.querySelectorAll("#lang-selector button").forEach(j=>j.classList.remove("active")),A.classList.add("active"),C("lang-selector",U),P.playHover(),W.currentSubStatus&&D(W.currentSubStatus)}}),b.querySelectorAll("#type-selector button").forEach((A,U)=>{A.onclick=()=>{W.setCaseType(A.dataset.type),b.querySelectorAll("#type-selector button").forEach(j=>j.classList.remove("active")),A.classList.add("active"),C("type-selector",U),P.playHover(),W.currentSubStatus&&D(W.currentSubStatus)}}),b.querySelectorAll("#portugal-selector button").forEach((A,U)=>{A.onclick=()=>{W.setPortugalCase(A.dataset.val==="true"),b.querySelectorAll("#portugal-selector button").forEach(j=>j.classList.remove("active")),A.classList.add("active"),C("portugal-selector",U),P.playHover(),W.currentSubStatus&&D(W.currentSubStatus)}}),b}function R(){let b=document.createElement("div");b.className="cw-status-section",b.style.cssText="display: flex; flex-direction: column; gap: 8px;",b.innerHTML=`
            <div class="cw-section-title js-label-status" style="margin-top: 8px;">${g("status_principal")}</div>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${g("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <div class="cw-section-title js-label-substatus" style="margin-top: 8px;">${g("substatus")}</div>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${g("select_substatus")}</option>
            </select>
        `;let C=b.querySelector("#main-status-select"),A=b.querySelector("#sub-status-select");return C.onchange=()=>{W.setStatus(C.value),Y(C.value,A),W.setSubStatus(""),D("")},A.onchange=()=>{W.setSubStatus(A.value),D(A.value)},b}function Y(b,C){if(C.innerHTML=`<option value="">${g("select_substatus")}</option>`,!b){C.disabled=!0;return}for(let A in ke)if(ke[A].status===b){let U=document.createElement("option");U.value=A,U.textContent=ke[A].name,C.appendChild(U)}C.disabled=!1}function D(b){if(m.render&&m.render(b,W.currentCaseType),!b){l.style.display="none",h.style.display="none",document.getElementById("manual-task-toggle").style.display="none",r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",c.style.display="flex",c.style.opacity="1",d.style.display="none";return}c.style.opacity="0",setTimeout(()=>{W.currentSubStatus&&(c.style.display="none")},400),d.style.display="grid";let C=ke[b];C&&C.templateFields&&W.setActiveFields(C.templateFields),f(),Tt(b,h,W),h.style.display="block",l.style.display="block";let A=b.startsWith("SO_"),U=b==="NI_Awaiting_Validation",j=document.getElementById("manual-task-toggle");A||U?(r.selectionElement.style.display="block",j.style.display="none"):(r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",j.style.display="block");let J=b==="SO_Education_Only"?"education":"implementation";W.setScreenshotMode(J),W.currentCaseType==="lm"?W.toggleFieldExclusion("field-ON_CALL",!0):W.toggleFieldExclusion("field-ON_CALL",!1),r.updateSubStatus(b),F();let V=document.getElementById("email-automation-toggle-row");V&&(V.style.display=He[b]?"flex":"none")}function F(){let b=r.getCheckedElements().map(C=>C.value);s.updateVisibility(W.currentSubStatus,b)}function z(b,C){let A=st[b];if(A){for(let U in A)if(U==="linkedTask")r.toggleTask(A.linkedTask,C);else if(U==="activeTasks")A.activeTasks.forEach(j=>{C?r.setTaskCount(j.value,j.count):r.setTaskCount(j.value,0)});else if(U.startsWith("field-")){let j=U,J=A[U],V=document.getElementById(j);if(V){let ee=je.includes(j.replace("field-",""));if(C)if(ee){let oe=V.value.trim();oe.includes(J.trim())||(V.value=oe?oe+`
`+J.trim():J.trim())}else V.value=J;else if(ee){let oe=V.value.trim(),Q=J.trim();oe.includes(Q)&&(V.value=oe.replace(Q,"").trim().replace(/\n{3,}/g,`

`))}else V.value.trim()===J.trim()&&(V.value="");W.updateField(j,V.value),V.dispatchEvent(new Event("input"))}}}}function _(b,C){let A=document.createElement("div");if(A.className="cw-actions-section",A.style.cssText=`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${B.bgInput};
            border-radius: 12px;
            border: 1px solid ${B.border};
        `,!document.getElementById("cw-actions-hover-styles")){let oe=document.createElement("style");oe.id="cw-actions-hover-styles",oe.innerHTML=`
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
            `,document.head.appendChild(oe)}let U=document.createElement("div");U.id="email-automation-toggle-row",U.style.cssText="grid-column: span 2; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",U.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${B.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${B.primary};">
                <span class="js-label-email-toggle">${C("preencher_email_automaticamente")}</span>
            </label>
        `;let j=b.parkButton;j.classList.add("js-btn-park"),j.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let J=document.createElement("button");J.className="cw-btn-secondary js-btn-reset",J.textContent=C("limpar"),J.style.cssText=`width: 100%; height: 34px; background: ${B.surface}; color: ${B.textSub}; border: 1px solid ${B.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,J.onclick=()=>y();let V=document.createElement("button");V.className="cw-btn-secondary js-btn-copy",V.textContent=C("copiar"),V.style.cssText=`width: 100%; height: 34px; background: ${B.surface}; color: ${B.primary}; border: 1px solid ${B.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,V.onclick=()=>x();let ee=document.createElement("button");return ee.className="cw-btn-primary js-btn-generate",ee.textContent=C("preencher"),ee.style.cssText=`width: 100%; height: 38px; background: ${B.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: span 2; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,ee.onclick=()=>E(),A.appendChild(U),A.appendChild(j),A.appendChild(J),A.appendChild(V),A.appendChild(ee),A}async function x(){if(!W.currentSubStatus){X(g("select_substatus"),{error:!0});return}let b=Ft(W,r,s);b?(Qe(b),X(g("copiado_sucesso")),P.playClick()):X(g("select_substatus"),{error:!0})}async function E(){if(!W.currentSubStatus){X(g("select_substatus"),{error:!0});return}let b=Ft(W,r,s);Qe(b),Z();let C=Ze(),A=await gt();if(A){A.focus(),document.execCommand("insertHTML",!1,b),mt(A);let U=document.getElementById("email-automation-checkbox");(!U||U.checked)&&W.currentSubStatus&&He[W.currentSubStatus]&&await xt(He[W.currentSubStatus]),X(g("inserido_copiado")),P.playSuccess(),y()}C()}function f(){if(W.currentSubStatus){if(W.currentCaseType==="lm")W.removeField("ON_CALL");else{let b=ke[W.currentSubStatus];b&&b.templateFields.includes("ON_CALL")&&W.addFieldAt("ON_CALL",1)}W.isPortugalCase?(W.addFieldAt("CASO_PORTUGAL",1),W.addFieldAt("CONSENTIU_GRAVACAO",2)):(W.removeField("CASO_PORTUGAL"),W.removeField("CONSENTIU_GRAVACAO"))}}function y(){W.reset(),r.reset(),s.reset(),K(),ge.clearEmergency(),o.querySelectorAll("select").forEach(C=>C.value=""),o.querySelector("#sub-status-select").disabled=!0;let b=document.getElementById("email-automation-toggle-row");b&&(b.style.display="none"),h.innerHTML="",l.style.display="none",c.style.display="flex",c.style.opacity="1",d.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none"}async function k(b=!1){let C={};h.querySelectorAll("input, textarea, select").forEach(V=>{(V.id.startsWith("field-")||V.id==="consent-select")&&(C[V.id]=V.value)});let A="Cliente",U="---";if(!b)try{let V=await xe();A=V.advertiserName,U=V.cid}catch(V){console.warn("Erro ao coletar pageData:",V)}let j=r.getCheckedElements().map(V=>({key:V.value,count:V.count})),J=j.map(V=>{let ee=Ce[V.key];return ee?ee.name:V.key});return{currentCaseType:W.currentCaseType,currentLang:W.currentLang,isPortugalCase:W.isPortugalCase,consent:W.consent,tagSupportUsed:W.tagSupportUsed,forcedScreenshots:[...W.forcedScreenshots],excludedFields:[...W.excludedFields],activeFields:W.activeFields,status:W.currentStatus,subStatus:W.currentSubStatus,formData:C,activeTasks:j,summaryTags:J,clientName:A,cid:U,timestamp:new Date().toISOString()}}let v=b=>new Promise(C=>setTimeout(C,b));async function L(b){W.setLanguage(b.currentLang||"pt"),W.setCaseType(b.currentCaseType||"bau"),W.setPortugalCase(b.isPortugalCase||!1),W.setConsent(b.consent||!1),W.setExcludedFields(b.excludedFields||[]),b.activeFields&&W.setActiveFields(b.activeFields);let C=o.querySelector(`#lang-selector button[data-lang="${W.currentLang}"]`);C&&C.classList.add("active"),o.querySelectorAll("#lang-selector button").forEach(j=>{j!==C&&j.classList.remove("active")});let A=o.querySelector(`#type-selector button[data-type="${W.currentCaseType}"]`);A&&A.classList.add("active"),o.querySelectorAll("#type-selector button").forEach(j=>{j!==A&&j.classList.remove("active")});let U=o.querySelector(`#portugal-selector button[data-val="${W.isPortugalCase}"]`);if(U&&U.classList.add("active"),o.querySelectorAll("#portugal-selector button").forEach(j=>{j!==U&&j.classList.remove("active")}),b.status){let j=o.querySelector("#main-status-select");j.value=b.status,W.setStatus(b.status);let J=o.querySelector("#sub-status-select");if(Y(b.status,J),await v(50),b.subStatus){if(J.value=b.subStatus,W.setSubStatus(b.subStatus),D(b.subStatus),await v(100),b.tagSupportUsed!==void 0){W.setTagSupportUsed(b.tagSupportUsed);let V=s.element.querySelector('input[value="Sim"]'),ee=s.element.querySelector('input[value="N\xE3o"]');b.tagSupportUsed&&V?V.checked=!0:ee&&(ee.checked=!0),s.element.querySelector("div:last-child").style.display=b.tagSupportUsed?"none":"block"}b.forcedScreenshots&&W.setForcedScreenshots(b.forcedScreenshots);for(let V in b.formData){let ee=document.getElementById(V);ee&&(ee.value=b.formData[V],W.updateField(V,ee.value))}b.activeTasks&&(b.activeTasks.forEach(V=>r.setTaskCount(V.key,V.count)),W.setActiveTasks(r.getCheckedElements()))}}W.isDirty=!1}function g(b){return Se[W.currentLang]?.[b]||Se.pt?.[b]||b}function G(){let b=document.createElement("div");return b.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',b.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",b.onclick=C=>{C.stopPropagation(),q()},b.title="Alternar para Split & Transfer",b}function $(){let b=document.createElement("div");return b.id="notes-empty-state",b.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${se};
        `,b.innerHTML=`
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
                    ${g("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${B.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${g("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,b}function I(b){let C=o.querySelector(".js-label-idioma");C&&(C.textContent=g("idioma"));let A=o.querySelector(".js-label-fluxo");A&&(A.textContent=g("fluxo"));let U=o.querySelector(".js-label-portugal");U&&(U.textContent=g("caso_portugal"));let j=o.querySelector(".js-label-status");j&&(j.textContent=g("status_principal"));let J=o.querySelector(".js-label-substatus");J&&(J.textContent=g("substatus"));let V=o.querySelector(".js-btn-copy");V&&(V.textContent=g("copiar"));let ee=o.querySelector(".js-btn-generate");ee&&(ee.textContent=g("preencher"));let oe=o.querySelector(".js-btn-reset");oe&&(oe.textContent=g("limpar"));let Q=document.getElementById("manual-task-toggle");Q&&(Q.textContent=g("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let ne=o.querySelector(".js-btn-park span");ne&&(ne.textContent=g("guardar"));let te=e.querySelector(".js-drawer-title");te&&(te.textContent=g("rascunhos_salvos"));let re=o.querySelector(".js-label-email-toggle");re&&(re.textContent=g("preencher_email_automaticamente")),s&&s.setLanguage&&s.setLanguage(g),r&&r.setLanguage&&r.setLanguage(g)}return c.style.display="flex",d.style.display="none",W.setLanguage("pt"),W.setCaseType("bau"),K(),setTimeout(async()=>{let b=ge.getEmergency();b&&(await he("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?")?(L(b),X("Sess\xE3o restaurada!")):ge.clearEmergency())},3e3),document.body.appendChild(e),Z}var xo=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}];var ho={_templates:null,async getTemplates(){return this._templates?this._templates:(this._templates=xo,this._templates)}};var yo="cw_personal_library_v1",Ue=!1,ye={getSnippets:(t="all")=>{let e=ye._loadFromLocal(),o=fe();return o&&o.includes("@")&&!Ue&&ye._syncWithServer(o),t==="all"?e:e.filter(a=>a.type===t)},save:async t=>{let e=fe();if(!e)return X("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;Ue=!0;let o=ye._loadFromLocal(),a=new Date().toISOString(),n={id:t.id||"local_"+Date.now(),type:t.type||"general",title:t.title||"Sem t\xEDtulo",content:t.content||"",subject:t.subject||"",isCode:t.isCode||!1,isRich:t.isRich||!1,updated:a},i=o.filter(s=>s.id!==n.id);return i.unshift(n),ye._saveToLocal(i),le.saveSnippet(n,e).then(s=>{s?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais."),setTimeout(()=>{Ue=!1},2e3)}),n},delete:async t=>{let e=fe();Ue=!0;let a=ye._loadFromLocal().filter(n=>n.id!==t);return ye._saveToLocal(a),e?le.deleteSnippet(t,e).then(()=>{setTimeout(()=>{Ue=!1},2e3)}):Ue=!1,!0},_syncWithServer:async t=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let e=await le.getUserSnippets(t);if(e&&e.status==="success"&&Array.isArray(e.snippets)){let o=e.snippets,a=ye._loadFromLocal(),n=JSON.stringify(o),i=JSON.stringify(a);n!==i&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),ye._saveToLocal(o))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(yo)||"[]")}catch{return[]}},_saveToLocal:t=>{localStorage.setItem(yo,JSON.stringify(t))}};function vo(){let t="v6.0.0",e=!1,o=[],a=null,n="",i="Todos",s=new Set,r={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"},l=document.createElement("div");l.id="email-assistant-popup",l.classList.add("cw-module-window");let m=document.createElement("style");m.textContent=`
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
    `,document.head.appendChild(m),Object.assign(l.style,me,{width:"850px",height:"650px",display:"none",flexDirection:"column",fontFamily:"'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",borderRadius:"12px",overflow:"hidden"});let u=pe(l,"Email Assistant",t,"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",{popup:l},()=>z()),p=document.createElement("div");Object.assign(p.style,{display:"flex",flex:"1",overflow:"hidden",backgroundColor:r.bgApp});let w=document.createElement("div");Object.assign(w.style,{width:"320px",backgroundColor:"#EFEFF0",borderRight:`1px solid ${r.borderSubtle}`,display:"flex",flexDirection:"column",flexShrink:"0"});let h=document.createElement("div");Object.assign(h.style,{padding:"16px",borderBottom:`1px solid ${r.borderSubtle}`,position:"relative"});let c=document.createElement("input");c.placeholder="Buscar templates...",Object.assign(c.style,{width:"100%",padding:"10px 14px 10px 36px",borderRadius:"10px",border:"1.5px solid transparent",backgroundColor:"#E3E3E8",fontSize:"15px",outline:"none",boxSizing:"border-box",color:r.textPrimary,backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",transition:"all 0.2s ease-in-out"}),c.onfocus=()=>{c.style.backgroundColor="#FFFFFF",c.style.borderColor=r.primary,c.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)",c.style.transform="scale(1.02)"},c.onblur=()=>{c.style.backgroundColor="#E3E3E8",c.style.borderColor="transparent",c.style.boxShadow="none",c.style.transform="scale(1)"};let d=document.createElement("div");d.id="email-template-list",Object.assign(d.style,{flex:"1",overflowY:"auto",padding:"8px",scrollBehavior:"smooth"});let S=document.createElement("div");S.innerHTML="\u2715",Object.assign(S.style,{position:"absolute",right:"26px",top:"50%",transform:"translateY(-50%)",fontSize:"10px",color:"#fff",cursor:"pointer",display:"none",backgroundColor:"#C7C7CC",width:"16px",height:"16px",borderRadius:"50%",textAlign:"center",lineHeight:"16px",fontWeight:"bold"}),S.onclick=()=>{c.value="",n="",S.style.display="none",x(),c.focus()},h.appendChild(c),h.appendChild(S),w.appendChild(h),w.appendChild(d);let T=document.createElement("div");Object.assign(T.style,{flex:"1",display:"flex",flexDirection:"column",overflow:"hidden",backgroundColor:r.bgApp,transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"});let M=document.createElement("div");Object.assign(M.style,{padding:"20px",borderBottom:`1px solid ${r.borderSubtle}`,backgroundColor:r.bgSurface,maxHeight:"250px",overflowY:"auto",display:"none"});let H=document.createElement("div");Object.assign(H.style,{flex:"1",display:"flex",flexDirection:"column",padding:"20px",backgroundColor:r.bgApp,overflow:"hidden"});let N=document.createElement("div");Object.assign(N.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"});let K=document.createElement("span");K.textContent="Preview do E-mail",Object.assign(K.style,{fontSize:"12px",fontWeight:"600",color:r.textSecondary,textTransform:"uppercase",letterSpacing:"0.5px"});let Z=document.createElement("div");Object.assign(Z.style,{display:"flex",gap:"8px"});let q=(v,L=!1)=>{let g=document.createElement("button");return g.textContent=v,Object.assign(g.style,{padding:"8px 14px",borderRadius:"10px",border:L?"none":`1.5px solid ${r.primary}`,background:L?r.primary:"transparent",color:L?"#fff":r.primary,fontSize:"13px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 1, 0.5, 1)",boxShadow:L?"0 4px 12px rgba(0, 122, 255, 0.3)":"none"}),g.onmouseenter=()=>{L?(g.style.backgroundColor="#0062CC",g.style.transform="translateY(-1px)",g.style.boxShadow="0 6px 16px rgba(0, 122, 255, 0.4)"):g.style.backgroundColor="rgba(0, 122, 255, 0.05)"},g.onmouseleave=()=>{L?(g.style.backgroundColor=r.primary,g.style.transform="translateY(0)",g.style.boxShadow="0 4px 12px rgba(0, 122, 255, 0.3)"):(g.style.backgroundColor="transparent",g.style.transform="translateY(0)")},g.onmousedown=()=>g.style.transform="scale(0.94)",g.onmouseup=()=>g.style.transform="scale(1)",g},O=q("Copiar HTML"),R=q("Preencher no CRM",!0),Y=q("Smart CR");Y.style.borderColor="#E67E22",Y.style.color="#E67E22",Y.style.display="none",Z.appendChild(Y),Z.appendChild(O),Z.appendChild(R),N.appendChild(K),N.appendChild(Z);let D=document.createElement("div");D.contentEditable="true",Object.assign(D.style,{flex:"1",backgroundColor:r.bgSurface,border:`1px solid ${r.borderSubtle}`,borderRadius:"8px",padding:"20px",fontSize:"15px",lineHeight:"1.6",color:r.textPrimary,overflowY:"auto",outline:"none",boxShadow:"inset 0 1px 2px rgba(0,0,0,0.02)"}),H.appendChild(N),H.appendChild(D),k(),T.appendChild(M),T.appendChild(H),p.appendChild(w),p.appendChild(T),l.appendChild(u),l.appendChild(p);let F=document.createElement("div");Object.assign(F.style,Ee),l.appendChild(F),Ae(l,F),document.body.appendChild(l);function z(){e=!e,e?(l.style.display="flex",Yt(l),o.length===0&&_()):l.style.display="none",ue(e,l,"cw-btn-email")}async function _(){d.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',o=await ho.getTemplates(),x()}function x(){d.innerHTML="";let v=o.filter(I=>I.name.toLowerCase().includes(n.toLowerCase())||I.category.toLowerCase().includes(n.toLowerCase())),L=Object.entries(He).filter(([I,b])=>b&&(I.toLowerCase().includes(n.toLowerCase())||b.toLowerCase().includes(n.toLowerCase()))).map(([I,b])=>({id:I,name:I.replace(/_/g," "),category:"\u26A1 Smart CRs",code:b,isSmartCR:!0})),g=ye.getSnippets("email").filter(I=>I.title.toLowerCase().includes(n.toLowerCase())||I.subject&&I.subject.toLowerCase().includes(n.toLowerCase())).map(I=>{let b=[],C=I.content.match(/\[([^\]]+)\]/g);return C&&[...new Set(C)].forEach(A=>{b.push({key:A,label:A.replace("[","").replace("]",""),type:A.toLowerCase().includes("data")?"date":"text",auto:A.toLowerCase().includes("nome")&&A.toLowerCase().includes("seu")?"agentName":null})}),{id:I.id||`snippet-${Math.random()}`,name:I.title,category:"\u{1F464} Pessoal",subject:I.subject||"Sem Assunto",template:I.content,placeholders:b}}),G=[...v,...L,...g];if(G.length===0){d.innerHTML=`
                <div style="padding: 40px 20px; text-align: center; color: ${r.textSecondary}; opacity: 0.6;">
                    <div style="font-size: 32px; margin-bottom: 12px;">\u{1F50D}</div>
                    <div style="font-size: 14px; font-weight: 500;">Nenhum resultado para "${n}"</div>
                </div>`;return}[...new Set(G.map(I=>I.category))].sort((I,b)=>I.localeCompare(b)).forEach(I=>{let b=s.has(I)||n.length>0,C=G.filter(ee=>ee.category===I),A=document.createElement("div");Object.assign(A.style,{padding:"12px 16px 12px 24px",fontSize:"11px",fontWeight:"700",color:r.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",position:"sticky",top:"-8px",backgroundColor:"rgba(239, 239, 240, 0.9)",zIndex:"10",backdropFilter:"blur(20px)",margin:"0 -8px 8px -8px",borderBottom:`0.5px solid ${r.borderSubtle}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none",transition:"background-color 0.2s ease"}),A.onmouseenter=()=>A.style.backgroundColor="rgba(230, 230, 232, 0.9)",A.onmouseleave=()=>A.style.backgroundColor="rgba(239, 239, 240, 0.9)";let U=document.createElement("span");U.textContent=I,A.appendChild(U);let j=document.createElement("span");j.textContent=C.length,Object.assign(j.style,{backgroundColor:"rgba(0, 0, 0, 0.05)",padding:"2px 8px",borderRadius:"10px",fontSize:"10px",color:r.textSecondary});let J=document.createElement("span");J.innerHTML=b?"\u{10012A}":"\u{10012B}",J.innerHTML=b?"\u25BE":"\u25B8",J.style.marginLeft="8px",J.style.transition="transform 0.3s ease";let V=document.createElement("div");V.style.display="flex",V.style.alignItems="center",V.appendChild(j),V.appendChild(J),A.appendChild(V),A.onclick=()=>{s.has(I)?s.delete(I):s.add(I),x()},d.appendChild(A),b&&C.forEach(ee=>{let oe=a&&a.id===ee.id,Q=document.createElement("div");if(Object.assign(Q.style,{padding:"12px 14px",fontSize:"14px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",borderRadius:"10px",color:r.textPrimary,margin:"4px 6px",display:"flex",alignItems:"center",gap:"12px",backgroundColor:oe?r.primary:r.bgSurface,boxShadow:oe?"0 4px 12px rgba(0, 122, 255, 0.3)":"0 1px 2px rgba(0,0,0,0.05)",border:oe?"none":`1px solid ${r.borderSubtle}`,position:"relative",overflow:"hidden"}),oe){let re=document.createElement("div");Object.assign(re.style,{position:"absolute",left:"0",top:"0",bottom:"0",width:"4px",backgroundColor:"#fff",borderRadius:"0 4px 4px 0"}),Q.appendChild(re)}let ne=document.createElement("span");ne.innerHTML=ee.isSmartCR?"\u26A1":ee.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}",ne.style.fontSize="12px",ne.style.opacity="0.7",ne.style.flexShrink="0",Q.appendChild(ne);let te=document.createElement("span");te.textContent=ee.name,te.style.overflow="hidden",te.style.textOverflow="ellipsis",te.style.whiteSpace="nowrap",te.style.flex="1",Q.appendChild(te),oe&&(Q.style.color="#fff",Q.style.fontWeight="600",ne.style.opacity="1"),Q.onmouseenter=()=>{oe||(Q.style.backgroundColor="#f8f8f9",Q.style.transform="translateY(-1px) scale(1.01)",Q.style.boxShadow="0 4px 8px rgba(0,0,0,0.08)",Q.style.borderColor="rgba(0, 122, 255, 0.2)")},Q.onmouseleave=()=>{oe||(Q.style.backgroundColor=r.bgSurface,Q.style.transform="translateY(0) scale(1)",Q.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",Q.style.borderColor=r.borderSubtle)},Q.onmousedown=()=>{Q.style.transform=oe?"scale(0.97)":"scale(0.98)"},Q.onmouseup=()=>{Q.style.transform=oe?"scale(1)":"translateY(-1px) scale(1.01)"},Q.onclick=()=>{f(ee)},d.appendChild(Q)})})}let E=null;async function f(v){a?.id!==v.id&&(a=v,E&&clearTimeout(E),T.style.opacity="0",T.style.transform="translateY(5px)",E=setTimeout(()=>{Y.style.display=v.isSmartCR?"block":"none",R.style.display=v.isSmartCR?"none":"block",O.style.display=v.isSmartCR?"none":"block",x(),y(),k(),T.style.opacity="1",T.style.transform="translateY(0)",E=null},150))}function y(){if(M.innerHTML="",!a||a.isSmartCR){a?.isSmartCR?(M.style.display="block",M.innerHTML=`<div style="padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):M.style.display="none";return}let v=a.placeholders&&a.placeholders.length>0;if(M.style.display=v?"block":"none",!v)return;let L=document.createElement("div");Object.assign(L.style,{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}),(a.placeholders||[]).forEach(g=>{let G=document.createElement("div"),$=document.createElement("label");$.textContent=g.label,Object.assign($.style,{display:"block",fontSize:"11px",fontWeight:"700",color:r.textSecondary,marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.5px"});let I=document.createElement("input");I.type=g.type||"text",I.dataset.key=g.key,Object.assign(I.style,{width:"100%",padding:"10px 12px",borderRadius:"8px",border:`1.5px solid ${r.borderSubtle}`,backgroundColor:"#FBFBFD",fontSize:"14px",boxSizing:"border-box",transition:"all 0.2s ease",outline:"none"}),I.onfocus=()=>{I.style.borderColor=r.primary,I.style.backgroundColor="#FFFFFF",I.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)"},I.onblur=()=>{I.style.borderColor=r.borderSubtle,I.style.backgroundColor="#FBFBFD",I.style.boxShadow="none"},g.auto==="agentName"&&(I.value=Xe().split(" ")[0]),I.addEventListener("input",k),G.appendChild($),G.appendChild(I),L.appendChild(G)}),M.appendChild(L)}function k(){if(!a){D.innerHTML=`
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
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: ${r.textPrimary}; margin-bottom: 8px;">
                        Pronto para come\xE7ar?
                    </div>
                    <div style="font-size: 14px; color: ${r.textSecondary}; line-height: 1.6; max-width: 280px; margin: 0 auto;">
                        Selecione um template \xE0 esquerda para<br>gerar o seu e-mail t\xE9cnico.
                    </div>
                </div>`;return}if(a.isSmartCR){D.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${a.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let v=a.template;(M.querySelectorAll("input")||[]).forEach(g=>{let G=g.dataset.key,$=g.value;if(g.type==="date"&&$){let[b,C,A]=$.split("-");$=`${C}/${A}/${b}`}$=$||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${G}</span>`;let I=G.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");v=v.replace(new RegExp(I,"g"),$)}),D.innerHTML=v}return c.addEventListener("input",v=>{n=v.target.value,S.style.display=n?"block":"none",x()}),O.onclick=()=>{let v=D.innerHTML,L=new Blob([v],{type:"text/html"}),g=D.innerText,G=[new ClipboardItem({"text/html":L,"text/plain":new Blob([g],{type:"text/plain"})})];navigator.clipboard.write(G).then(()=>X("E-mail copiado com sucesso!"),()=>X("Erro ao copiar e-mail",{error:!0}))},R.onclick=async()=>{if(!a)return;let v=Ze(),L={...a,body:D.innerHTML};try{await go(L),z()}catch{X("Erro ao preencher e-mail",{error:!0})}finally{v()}},Y.onclick=async()=>{if(!a||!a.isSmartCR)return;let v=Ze();try{await xt(a.code),z()}catch{X("Erro ao aplicar Smart CR",{error:!0})}finally{v()}},z}var wo={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]},"EN BAU":{inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function So(){let t="v3.0.0",e={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",success:"#34A853"},o="csa-local-styles";if(!document.getElementById(o)){let C=document.createElement("style");C.id=o,C.innerHTML=`
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
      `,document.head.appendChild(C)}let a={progressBarContainer:{height:"6px",background:e.borderSubtle,width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 3px 3px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:e.bgApp,scrollBehavior:"smooth"},card:{background:e.bgSurface,border:`1px solid ${e.borderSubtle}`,borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:e.shadowCard},cardTitle:{fontSize:"11px",fontWeight:"700",color:e.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"10px",transition:"all 0.2s ease",color:e.textPrimary,fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{background:"rgba(0, 0, 0, 0.02)"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"50%",border:`2px solid ${e.borderSubtle}`,marginRight:"12px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},n={},i="PT",s="BAU",r=!1,l=document.createElement("div");l.id="call-script-popup",l.classList.add("cw-module-window"),Object.assign(l.style,me,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let m={popup:l,googleLine:null},u=null;function p(){r&&xe().then(C=>{let A=l.querySelector("#cw-ctx-name"),U=l.querySelector("#cw-ctx-cid"),j=l.querySelector("#cw-ctx-email");if(A&&(A.textContent=C.advertiserName||"Cliente Desconhecido"),U){let J=C.cid||"---";U.textContent!==J&&(U.textContent=J)}if(j){let J=C.clientEmail||"N\xE3o encontrado";j.textContent!==J&&(j.textContent=J,j.title=J)}})}function w(){xe().then(C=>{let A=new Date().toLocaleDateString("pt-BR"),U=l.querySelector("#cw-am-message-area"),j=l.querySelector("#cw-am-review-container"),J=`Ol\xE1. Bom dia!

Estou com um caso do seu cliente (${C.advertiserName||"Cliente"}) em andamento hoje (${A}). Fiz a primeira tentativa de contato agora h\xE1 pouco, mas n\xE3o tive sucesso.

Farei uma nova tentativa em alguns minutos. Caso ele n\xE3o atenda novamente, seguirei com o e-mail padr\xE3o de reagendamento/no-show e te mantenho no radar.

Dados do caso para seu controle:

Cliente: ${C.advertiserName||"---"}
CID: ${C.cid||"---"}
Case ID: ${C.caseId||"---"}
E-mail: ${C.clientEmail||"---"}`;U&&(U.value=J),j&&(j.style.display="block",j.style.maxHeight="300px",j.style.opacity="1",j.scrollIntoView({behavior:"smooth",block:"end"}))})}function h(){r=!r,ue(r,l,"cw-btn-script"),r?(p(),u||(u=setInterval(p,2e3))):u&&(clearInterval(u),u=null)}let c=pe(l,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",m,()=>{h()});l.appendChild(c);let d=document.createElement("div");Object.assign(d.style,a.contextBanner),d.innerHTML=`
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
  `;let S=d.querySelector("#csa-toggle-options"),T=d.querySelector("#csa-options-content"),M=d.querySelector("#csa-options-arrow"),H=!1;S.onclick=()=>{H=!H,M.style.transform=H?"rotate(180deg)":"rotate(0deg)",T.style.maxHeight=H?"400px":"0",T.style.opacity=H?"1":"0",T.style.marginTop=H?"8px":"0",P.playClick()};let N=d.querySelector("#cw-pill-message"),K=d.querySelector("#cw-am-copy-final"),Z=d.querySelector("#cw-am-message-area");N.onmouseenter=()=>{N.style.borderColor="#007AFF",N.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},N.onmouseleave=()=>{N.style.borderColor="#DADCE0",N.style.boxShadow="0 1px 2px rgba(0,0,0,0.02)"},N.addEventListener("click",()=>{w()}),K.addEventListener("click",()=>{Z.value&&(navigator.clipboard.writeText(Z.value),X("Mensagem copiada!"),P.playSuccess(),K.style.background="#34A853",K.textContent="Copiado!",setTimeout(()=>{K.style.background="#1A73E8",K.textContent="Copiar Mensagem Final"},2e3))});let q=(C,A)=>{let U=d.querySelector(C),j=d.querySelector(A);U.onclick=()=>{let J=j.textContent;!J||J.includes("---")||J.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(J),P.playSuccess(),U.classList.add("copied"),setTimeout(()=>U.classList.remove("copied"),1500))}};l.appendChild(d);let O=document.createElement("div");Object.assign(O.style,a.progressBarContainer);let R=document.createElement("div");R.className="csa-progress-fill",Object.assign(R.style,a.progressBarFill),O.appendChild(R),l.appendChild(O);let Y=document.createElement("div");Y.id="csa-content",Object.assign(Y.style,a.contentArea),l.appendChild(Y);let D=document.createElement("div");Object.assign(D.style,a.footer);let F=document.createElement("span");F.textContent="by lucaste@",Object.assign(F.style,{fontSize:"10px",color:"#bdc1c6"});let z=document.createElement("button");z.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(z.style,a.resetBtn),z.onmouseenter=()=>z.style.background="#fce8e6",z.onmouseleave=()=>z.style.background="transparent",z.onclick=()=>{z.style.transform="scale(0.9)",setTimeout(()=>z.style.transform="scale(1)",150);for(let C in n)delete n[C];$()},D.appendChild(F),D.appendChild(z),l.appendChild(D);let _=document.createElement("div");Object.assign(_.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"16px"});let x=document.createElement("div");x.className="csa-segmented-control",x.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `;let E=document.createElement("div");E.className="csa-segmented-control",E.innerHTML=`
      <div class="csa-segmented-indicator" id="lang-indicator" style="width: calc(33.33% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-lang="PT">PT</button>
      <button data-lang="ES">ES</button>
      <button data-lang="EN">EN</button>
  `,_.appendChild(x),_.appendChild(E),Y.appendChild(_);let f=x.querySelectorAll("button"),y=x.querySelector("#type-indicator");f.forEach((C,A)=>{C.onclick=()=>{f.forEach(U=>U.classList.remove("active")),C.classList.add("active"),y.style.transform=`translateX(${A*(x.offsetWidth/2-2)}px)`,s=C.dataset.type,P.playClick(),$()}});let k=E.querySelectorAll("button"),v=E.querySelector("#lang-indicator");k.forEach((C,A)=>{C.onclick=()=>{k.forEach(U=>U.classList.remove("active")),C.classList.add("active"),v.style.transform=`translateX(${A*(E.offsetWidth/3-1)}px)`,i=C.dataset.lang,P.playClick(),$()}});let L=document.createElement("div");L.id="csa-checklist-area",Y.appendChild(L);let g=document.createElement("div");Object.assign(g.style,Ee),g.className="no-drag",g.title="Redimensionar",l.appendChild(g),Ae(l,g),document.body.appendChild(l),q("#cw-pill-cid","#cw-ctx-cid"),q("#cw-pill-email","#cw-ctx-email");function G(C){return C}function $(){L.innerHTML="";let C=`${i} ${s}`,A=wo[C];if(!A){L.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',R.style.width="0%";return}let U=e.primary,j=0,J=0;["inicio","meio","fim"].forEach(V=>{A[V]&&(j+=A[V].length)}),["inicio","meio","fim"].forEach((V,ee)=>{let oe=A[V];if(!oe||oe.length===0)return;let Q=document.createElement("div");Object.assign(Q.style,a.card);let ne=document.createElement("div");Object.assign(ne.style,a.cardTitle);let te="";V==="inicio"?i.includes("ES")?te="Apertura":i.includes("EN")?te="Opening":te="Abertura":V==="meio"?i.includes("ES")?te="Implementaci\xF3n":i.includes("EN")?te="Implementation":te="Implementa\xE7\xE3o (Tag Support)":V==="fim"&&(i.includes("ES")?te="Cierre":i.includes("EN")?te="Closing":te="Fechamento"),ne.textContent=te;let re=document.createElement("span");re.style.fontSize="11px",re.style.opacity="0.7",re.style.fontWeight="500",re.style.background="#f1f3f4",re.style.padding="2px 8px",re.style.borderRadius="10px",ne.appendChild(re),Q.appendChild(ne);let We=0;oe.forEach((tt,qe)=>{let Ne=`${C}-${V}-${qe}`,yt=!!n[Ne];yt&&(J++,We++);let we=document.createElement("div");Object.assign(we.style,a.itemRow);let ce=document.createElement("div");Object.assign(ce.style,a.checkbox);let Pe=document.createElement("span");Pe.className="csa-item-text"+(yt?" completed":""),Pe.innerHTML=tt,Pe.style.flex="1",yt?(Object.assign(we.style,a.itemCompleted),ce.style.background=U,ce.style.borderColor=U,ce.style.transform="scale(1)",ce.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ce.style.background="transparent",ce.style.borderColor=e.borderSubtle,ce.style.transform="scale(1)",ce.innerHTML=""),we.onclick=()=>{let Nt=!n[Ne];n[Ne]=Nt,P.playClick(),Nt?(ce.style.transform="scale(1.15)",setTimeout(()=>ce.style.transform="scale(1)",150),Object.assign(we.style,a.itemCompleted),Pe.classList.add("completed"),ce.style.background=U,ce.style.borderColor=U,ce.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(we.style.background="transparent",Pe.classList.remove("completed"),ce.style.background="transparent",ce.style.borderColor=e.borderSubtle,ce.innerHTML=""),I(C,A)},we.onmouseenter=()=>{n[Ne]||(we.style.background="rgba(0, 0, 0, 0.03)",ce.style.borderColor=U)},we.onmouseleave=()=>{n[Ne]||(we.style.background="transparent",ce.style.borderColor=e.borderSubtle)},we.appendChild(ce),we.appendChild(Pe),Q.appendChild(we)}),We===oe.length&&oe.length>0&&(re.style.color="#1e8e3e",re.style.background="#e6f4ea",Q.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),re.textContent=`${We}/${oe.length}`,L.appendChild(Q)}),b(j,J)}function I(C,A){let U=0,j=0;["inicio","meio","fim"].forEach(J=>{let V=A[J]||[];U+=V.length,V.forEach((ee,oe)=>{n[`${C}-${J}-${oe}`]&&j++})}),b(U,j),setTimeout(()=>$(),200)}function b(C,A){let U=C===0?0:A/C*100;R.style.width=`${U}%`,U===100?(R.style.background=e.success,R.classList.remove("csa-progress-fill")):(R.style.background="",R.classList.add("csa-progress-fill"))}return $(),h}var et={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},$e={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},ht={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},qt="cw_link_history_v4";function Co(t,e){try{let o=JSON.parse(localStorage.getItem(qt)||"[]");o=o.filter(a=>a.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(qt,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function sa(){try{return JSON.parse(localStorage.getItem(qt)||"[]")}catch{return[]}}function Eo(){let t="v4.6",e="",o=!1,a=null,n=!1,i={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},s=document.createElement("div");s.id="links-popup",s.classList.add("cw-module-window"),Object.assign(s.style,me,{right:"100px",width:"600px",height:"650px",background:i.bgApp,overflow:"hidden"});let l=pe(s,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:s,googleLine:null},()=>D());s.appendChild(l);let m=document.createElement("div");m.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",s.appendChild(m);let u=document.createElement("div");u.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${i.bgSidebar};
      border-right: 1px solid ${i.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,m.appendChild(u);let p=document.createElement("div");p.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",m.appendChild(p);let w=document.createElement("div");w.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let h=document.createElement("div");h.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let c=document.createElement("div");c.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',c.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let d=document.createElement("input");d.type="text",d.placeholder="Buscar ferramenta ou SOP...",d.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${i.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,d.onfocus=()=>{h.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",h.style.border="1px solid #1a73e8"},d.onblur=()=>{h.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",h.style.border="1px solid transparent"},h.appendChild(c),h.appendChild(d),w.appendChild(h),p.appendChild(w);let S=document.createElement("div");S.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",p.appendChild(S);let T=null;function M(){if(T)return;T=document.createElement("div"),T.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let F=document.createElement("div");F.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",F.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let z=document.createElement("button");z.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',z.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",z.onclick=()=>{N(),n=!1,O()},F.appendChild(z),T.appendChild(F);let _=document.createElement("div");_.id="cw-history-list",_.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",T.appendChild(_),p.appendChild(T)}function H(){T||M();let F=T.querySelector("#cw-history-list");F.innerHTML="";let z=sa();z.length===0?F.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':z.forEach(_=>{let x=Y(_,$e[_._originalCat],!0,_._originalCat);F.appendChild(x)}),requestAnimationFrame(()=>T.style.transform="translateY(0)")}function N(){T&&(T.style.transform="translateY(100%)")}function K(){u.innerHTML="";let F=Z("history","Recentes",$e.history);F.id="cw-sidebar-btn-history",F.onclick=()=>{P.playClick(),n=!n,n?H():N(),O()},u.appendChild(F);let z=document.createElement("div");z.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",u.appendChild(z),Object.keys(et).forEach(_=>{let x=et[_],E=Z(_,x.label,$e[_]);E.id=`cw-sidebar-btn-${_}`,E.onclick=()=>{P.playClick(),n&&(n=!1,N()),q(_)},u.appendChild(E)})}function Z(F,z,_){let x=document.createElement("div");x.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${i.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,x.title=z,x.dataset.key=F;let E=document.createElement("div");E.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",E.innerHTML=_||$e.tasks;let f=document.createElement("div");return f.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",f.textContent=z,x.appendChild(E),x.appendChild(f),x.onmouseenter=()=>{a!==F&&!(F==="history"&&n)&&(x.style.background="#F1F3F4",E.style.transform="scale(1.1)")},x.onmouseleave=()=>{a!==F&&!(F==="history"&&n)&&(x.style.background="transparent",E.style.transform="scale(1)")},x}function q(F){let z=document.getElementById(`cat-anchor-${F}`);z&&(z.scrollIntoView({behavior:"smooth",block:"start"}),a=F,O())}function O(){Object.keys(et).forEach(z=>{let _=u.querySelector(`#cw-sidebar-btn-${z}`);if(_)if(a===z&&!n){let x=ht[z];_.style.background=x.bg,_.style.color=x.color,_.querySelector("div:first-child").style.transform="scale(1.1)"}else _.style.background="transparent",_.style.color=i.textSecondary,_.querySelector("div:first-child").style.transform="scale(1)"});let F=u.querySelector("#cw-sidebar-btn-history");F&&(n?(F.style.background="#3C4043",F.style.color="#FFFFFF"):(F.style.background="transparent",F.style.color=i.textSecondary))}function R(){if(S.innerHTML="",e.trim()!==""){let z=[];if(Object.entries(et).forEach(([x,E])=>{let f=E.links.filter(y=>y.name.toLowerCase().includes(e.toLowerCase())||y.desc.toLowerCase().includes(e.toLowerCase()));z.push(...f.map(y=>({...y,_cat:x})))}),z.length===0){S.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let _=document.createElement("div");_.innerHTML="Resultados da busca",_.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",S.appendChild(_),z.forEach(x=>{let E=Y(x,$e[x._cat],!1,x._cat);S.appendChild(E)});return}Object.entries(et).forEach(([z,_])=>{let x=ht[z],E=document.createElement("div"),f=document.createElement("div");f.id=`cat-anchor-${z}`,f.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${x.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,f.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${x.color};"></div>
            ${_.label}
          `,E.appendChild(f);let y=document.createElement("div");y.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",_.links.forEach(k=>{let v=Y(k,$e[z],!1,z);y.appendChild(v)}),E.appendChild(y),S.appendChild(E)});let F=document.createElement("div");F.style.height="80px",S.appendChild(F)}function Y(F,z,_,x){let E=document.createElement("div"),f=ht[x]||ht.history;E.style.cssText=`
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
          background: ${f.bg}; color: ${f.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,y.innerHTML=z||$e.tasks;let k=y.querySelector("svg");k&&(k.style.width="22px",k.style.height="22px");let v=document.createElement("div");v.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let L=document.createElement("div");L.style.cssText=`font-size: 14px; font-weight: 600; color: ${i.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,L.textContent=F.name;let g=document.createElement("div");g.style.cssText=`font-size: 12px; color: ${i.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,g.textContent=F.desc,v.appendChild(L),v.appendChild(g);let G=document.createElement("div");return G.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',G.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,G.title="Copiar URL",E.onmouseenter=()=>{E.style.transform="translateY(-2px)",E.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",E.style.borderColor="rgba(0,0,0,0.05)",E.style.borderLeft=`4px solid ${f.color}`,G.style.opacity="1",G.style.background="#F1F3F4"},E.onmouseleave=()=>{E.style.transform="translateY(0)",E.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",E.style.border="1px solid transparent",G.style.opacity="0",G.style.background="transparent"},E.onclick=()=>{!_&&x&&Co(F,x),window.open(F.url,"_blank")},G.onclick=$=>{$.stopPropagation(),P.playClick(),navigator.clipboard.writeText(F.url),!_&&x&&Co(F,x),X("Link copiado!")},E.appendChild(y),E.appendChild(v),E.appendChild(G),E}d.addEventListener("input",F=>{e=F.target.value,R()});function D(){o=!o,ue(o,s,"cw-btn-links")}return document.body.appendChild(s),K(),R(),D}var Me=[];function _t(t){Me=t}var ra=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function Ao(){let t="v4.9",e=!1,o=null,a=null;function n(x){if(!x)return"";try{let E=new Date(x);return isNaN(E.getTime())?String(x):E.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(x)}}if(!document.getElementById("cw-broadcast-hd-css")){let x=document.createElement("style");x.id="cw-broadcast-hd-css",x.innerHTML=`
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
      `,document.head.appendChild(x)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},s={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(x){return x?Object.entries(x).map(([E,f])=>`${E.replace(/[A-Z]/g,y=>"-"+y.toLowerCase())}:${f}`).join(";"):""}function l(x){if(!x||typeof x!="string")return"";let E=x;return E=E.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),E=E.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),E=E.replace(/_(.*?)_/g,"<i>$1</i>"),E=E.replace(/\n/g,"<br>"),E=Xt(E),E}let m=document.createElement("div");m.id="broadcast-popup",m.classList.add("cw-module-window"),Object.assign(m.style,me,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let u={popup:m,googleLine:null};function p(){if(e=!e,ue(e,m,"cw-btn-broadcast"),e){let x=document.getElementById("cw-btn-broadcast");x&&x.classList.remove("has-new"),q()}}let w=pe(m,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",u,()=>p()),h=w.querySelector(".cw-header-actions")||w.lastElementChild,c=null;function d(){let x=null;try{x=fe()}catch{console.warn("TechSol: Auth Pending")}if(x){let E=x.split("@")[0].toLowerCase(),f=ct.includes(E);if(window._cwIsAdmin=f,window._cwCurrentUser=E,f&&h&&!h.querySelector("#cw-admin-btn")){let y=document.createElement("div");y.id="cw-admin-btn",y.className="cw-btn-interactive",y.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(y.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),y.title="Novo Aviso",y.onclick=k=>{k.stopPropagation(),M()},h.insertBefore(y,h.firstChild),c||T(),R()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(d,2e3))}if(h){let x=document.createElement("button");x.textContent="Limpar",x.className="cw-btn-interactive",Object.assign(x.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),x.onclick=E=>{E.stopPropagation(),P.playSuccess();let f=Me.map(y=>y.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(f)),R(),O()},h.insertBefore(x,h.firstChild)}m.appendChild(w);let S=document.createElement("div");S.id="cw-update-status",S.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",m.appendChild(S);function T(){c=document.createElement("div"),c.className="cw-editor-overlay",c.innerHTML=`
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
      `,c.querySelectorAll('input[name="cw-bc-type"]').forEach(y=>{y.addEventListener("change",()=>{c.querySelectorAll(".cw-radio-option").forEach(k=>k.classList.remove("checked")),y.parentElement.classList.add("checked")})}),setTimeout(()=>{let y=c.querySelector(".cw-radio-option.info");y&&y.classList.add("checked")},100);let x=c.querySelector("#cw-bc-cancel"),E=c.querySelector("#cw-bc-close-x"),f=c.querySelector("#cw-bc-send");x.onclick=H,E.onclick=H,f.onclick=N,m.appendChild(c)}function M(x=null){if(!c)return;let E=c.querySelector("#cw-editor-title-label"),f=c.querySelector("#cw-bc-title"),y=c.querySelector("#cw-bc-text"),k=c.querySelector("#cw-bc-send");if(x){a=x.id,E.textContent="Editar Aviso",f.value=x.title||"",y.value=x.text||"",k.textContent="Salvar Altera\xE7\xF5es";let v=x.type||"info",L=c.querySelector(`input[name="cw-bc-type"][value="${v}"]`);L&&L.click()}else{a=null,E.textContent="Novo Aviso",f.value="",y.value="",k.textContent="Publicar";let v=c.querySelector('input[name="cw-bc-type"][value="info"]');v&&v.click()}c.classList.add("active"),setTimeout(()=>f.focus(),300)}function H(){c&&c.classList.remove("active"),a=null}async function N(){let x=c.querySelector("#cw-bc-send"),E=c.querySelector("#cw-bc-title"),f=c.querySelector("#cw-bc-text"),y=c.querySelector('input[name="cw-bc-type"]:checked'),k=y?y.value:"info";if(!E.value.trim()||!f.value.trim()){X("Preencha todos os campos!",{error:!0});return}x.textContent="Salvando...",x.style.opacity="0.7";let v=!1;a?v=await le.updateBroadcast(a,{title:E.value,text:f.value,type:k}):v=await le.sendBroadcast({title:E.value,text:f.value,type:k,author:window._cwCurrentUser||"admin"}),v?(X(a?"Atualizado!":"Publicado!"),P.playSuccess(),H(),setTimeout(()=>q(),1500)):(X("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),x.textContent=a?"Salvar Altera\xE7\xF5es":"Publicar",x.style.opacity="1")}async function K(x){if(await he("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await le.deleteBroadcast(x)){X("Aviso removido."),P.playClick();let y=Me.findIndex(k=>k.id===x);y>-1&&Me.splice(y,1),R(),setTimeout(()=>q(),1500)}else X("Erro ao excluir.",{error:!0})}let Z=document.createElement("div");Z.className="cw-nice-scroll",Object.assign(Z.style,i.feedContainer),m.appendChild(Z);async function q(){e&&(S.style.display="block",S.innerHTML="\u{1F504} Sincronizando...");try{let x=await le.fetchData();x&&x.broadcast&&(_t(x.broadcast),O(),e&&(R(),S.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{S.style.display="none"},1500)))}catch{e&&(S.innerHTML="\u26A0\uFE0F Offline")}}function O(){let x=document.getElementById("cw-btn-broadcast");if(!x)return;let E=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Me.some(y=>!E.includes(y.id))){if(x.classList.add("has-new"),!x.querySelector(".cw-badge")){let y=document.createElement("div");y.className="cw-badge",Object.assign(y.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),x.appendChild(y)}}else{x.classList.remove("has-new");let y=x.querySelector(".cw-badge");y&&y.remove()}}function R(){Z.innerHTML="";let x=m.querySelector("#cw-bau-widget");x&&x.remove();let E=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),f=[...Me].sort((g,G)=>{let $=new Date(g.date).getTime()||0;return(new Date(G.date).getTime()||0)-$}),y=f.findIndex(g=>g.title&&g.title.toLowerCase().includes("disponibilidade bau"));if(y!==-1){let g=f[y];f.splice(y,1);let G=document.createElement("div");G.id="cw-bau-widget",Object.assign(G.style,i.bauContainer);let $=[],I=(g.text||"").split(`
`),b=/\d{1,2}\/\d{1,2}/,C="\u{1F4C5}";if(I.forEach(V=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(V)?C="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(V)&&(C="\u{1F1EA}\u{1F1F8}");let ee=V.match(b);if(ee){let oe=ee[0],Q=C;/🇧🇷|🇵🇹|PT|BR/i.test(V)?Q="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(V)&&(Q="\u{1F1EA}\u{1F1F8}"),$.some(te=>te.flag===Q&&te.date===oe)||$.push({flag:Q,date:oe})}}),$.length===0){let V=(g.text||"").match(/\d{1,2}\/\d{1,2}/g);V&&[...new Set(V)].forEach(ee=>$.push({flag:"\u{1F4C5}",date:ee}))}let A="",U='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(U=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${U}
              `),$.length>0?A=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${$.map(ee=>`
                  <div style="${r(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(i.bauFlag)}">${ee.flag}</span>
                      <span style="${r(i.bauDate)}">${ee.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${U}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${l(g.text)}</div>
              `:A=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${l(g.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,G.innerHTML=`
              <div style="${r(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(i.liveIndicator)}">
                      <div style="${r(i.pulseDot)}"></div>
                      <span style="${r(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${n(g.date)}</div>
              </div>
              ${A}
          `,S.after(G);let j=G.querySelector("#cw-bau-toggle-btn"),J=G.querySelector("#cw-bau-full");if(j&&J&&(j.onclick=()=>{let V=J.style.display==="none";J.style.display=V?"block":"none",j.textContent=V?"Ocultar":"Detalhes"}),window._cwIsAdmin){let V=G.querySelector(".cw-bau-edit");V&&(V.onclick=()=>M(g))}}let k=f.sort((g,G)=>{let $=E.includes(g.id),I=E.includes(G.id);return $===I?0:$?1:-1});if(k.length===0&&!y){let g=document.createElement("div");Object.assign(g.style,i.emptyState),g.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,Z.appendChild(g)}let v=k.filter(g=>!E.includes(g.id)),L=k.filter(g=>E.includes(g.id));if(v.forEach(g=>Z.appendChild(Y(g,!1))),L.length>0){let g=document.createElement("div");Object.assign(g.style,i.historyDivider),g.innerHTML=`<span>Hist\xF3rico (${L.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let G=document.createElement("div");Object.assign(G.style,i.historyContainer),L.forEach(I=>G.appendChild(Y(I,!0)));let $=!1;g.onclick=()=>{P.playClick(),$=!$,G.style.display=$?"flex":"none",g.querySelector("svg").style.transform=$?"rotate(180deg)":"rotate(0deg)"},Z.appendChild(g),Z.appendChild(G)}}function Y(x,E){let f=document.createElement("div");Object.assign(f.style,E?i.cardHistory:i.card);let y=s[x.type]||s.info,k=document.createElement("div");Object.assign(k.style,i.cardHeader);let v=document.createElement("div");Object.assign(v.style,i.typeTag,{color:y.color,background:y.bg}),v.innerHTML=`${y.icon} <span>${x.type}</span>`;let L=document.createElement("span");if(Object.assign(L.style,i.dateTag),L.textContent=n(x.date),k.appendChild(v),E)k.appendChild(L);else{let b=document.createElement("button");b.className="cw-btn-interactive",Object.assign(b.style,i.dismissBtn),b.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',b.onmouseenter=()=>{b.style.color="#1e8e3e",b.style.background="#e6f4ea",b.style.borderColor="#1e8e3e"},b.onmouseleave=()=>{b.style.color="#5f6368",b.style.background="#fff",b.style.borderColor="rgba(0,0,0,0.1)"},b.onclick=C=>{C.stopPropagation(),P.playClick(),f.style.transform="translateX(20px)",f.style.opacity="0",setTimeout(()=>{let A=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");A.push(x.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(A)),R(),O()},200)},k.appendChild(b)}let g=document.createElement("div");Object.assign(g.style,i.cardContent);let G=document.createElement("div");Object.assign(G.style,i.msgTitle),G.textContent=x.title;let $=document.createElement("div");Object.assign($.style,i.msgBody),$.innerHTML=l(x.text);let I=document.createElement("div");if(Object.assign(I.style,i.msgMeta),I.innerHTML=`Publicado por <b>${x.author||"Sistema"}</b>`,E||(I.innerHTML+=` \u2022 ${n(x.date)}`),g.appendChild(G),g.appendChild($),g.appendChild(I),f.appendChild(k),f.appendChild(g),window._cwIsAdmin){let b=document.createElement("div");b.className="cw-card-actions";let C=document.createElement("button");C.className="cw-action-btn edit",C.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',C.onclick=()=>M(x);let A=document.createElement("button");A.className="cw-action-btn delete",A.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',A.onclick=()=>K(x.id),b.appendChild(C),b.appendChild(A),f.appendChild(b)}return f}let D=le.getCachedBroadcasts();D.length>0&&(_t(D),R()),setTimeout(d,500),q(),o||(o=setInterval(q,ra));let F=document.createElement("div");Object.assign(F.style,Ee),F.className="no-drag",m.appendChild(F),Ae(m,F),document.body.appendChild(m);let z=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),_=Me.some(x=>!z.includes(x.id));return{toggle:p,hasUnread:_}}function ko(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},a=document.createElement("div");Object.assign(a.style,o.overlay);let n=document.createElement("div");Object.assign(n.style,o.card);let i=document.createElement("div");Object.assign(i.style,o.icon);let s=document.createElement("div");Object.assign(s.style,o.title);let r=document.createElement("div");Object.assign(r.style,o.text);let l=document.createElement("div");Object.assign(l.style,o.dotsContainer);let m=document.createElement("div");Object.assign(m.style,o.btnContainer);let u=document.createElement("button");u.textContent="Pular",Object.assign(u.style,o.btn,o.btnSkip),u.onmouseover=()=>u.style.color="#202124",u.onmouseout=()=>u.style.color="#5f6368";let p=document.createElement("button");p.textContent="Pr\xF3ximo",Object.assign(p.style,o.btn,o.btnNext),p.onmouseover=()=>p.style.transform="scale(1.05)",p.onmouseout=()=>p.style.transform="scale(1)",m.appendChild(u),m.appendChild(p),n.appendChild(i),n.appendChild(s),n.appendChild(r),n.appendChild(l),n.appendChild(m),a.appendChild(n),document.body.appendChild(a);function w(c){let d=t[c];i.textContent=d.icon,s.textContent=d.title,r.textContent=d.text,l.innerHTML="",t.forEach((S,T)=>{let M=document.createElement("div");Object.assign(M.style,o.dot),T===c&&Object.assign(M.style,o.dotActive),l.appendChild(M)}),d.isLast?(u.style.display="none",p.textContent="Come\xE7ar \u{1F680}",p.style.width="100%"):(u.style.display="block",p.textContent="Pr\xF3ximo",p.style.width="auto")}function h(){localStorage.setItem("cw_onboarding_seen_v1","true"),a.style.opacity="0",n.style.transform="translateY(20px)",setTimeout(()=>a.remove(),400),P.playSuccess(),X("Tudo pronto! Use o menu flutuante.")}p.onclick=()=>{P.playClick(),e<t.length-1?(e++,w(e)):h()},u.onclick=async()=>{await he("Pular o tutorial?")&&h()},w(0),requestAnimationFrame(()=>{a.style.opacity="1",n.style.transform="translateY(0)"})}var To={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function Fo(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&la(t)}function la(t){let e=To.slides,o=0,a={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,a.overlay);let i=document.createElement("div");Object.assign(i.style,a.card);let s=document.createElement("div");Object.assign(s.style,a.badge),s.textContent=`Atualiza\xE7\xE3o ${t}`;let r=document.createElement("div");Object.assign(r.style,a.icon);let l=document.createElement("div");Object.assign(l.style,a.title);let m=document.createElement("div");Object.assign(m.style,a.text);let u=document.createElement("div");Object.assign(u.style,a.dotsContainer);let p=document.createElement("button");Object.assign(p.style,a.btn),p.onmouseover=()=>p.style.transform="scale(1.02)",p.onmouseout=()=>p.style.transform="scale(1)",i.appendChild(s),i.appendChild(r),i.appendChild(l),i.appendChild(m),i.appendChild(u),i.appendChild(p),n.appendChild(i),document.body.appendChild(n);function w(c){let d=e[c];r.textContent=d.icon,l.textContent=d.title,m.textContent=d.text,u.innerHTML="",e.forEach((S,T)=>{let M=document.createElement("div");Object.assign(M.style,a.dot),T===c&&Object.assign(M.style,a.dotActive),u.appendChild(M)}),c===e.length-1?p.textContent="Entendi, vamos l\xE1! \u{1F44D}":p.textContent="Pr\xF3ximo"}function h(){localStorage.setItem("cw_last_version",t),n.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>n.remove(),400),P.playSuccess(),X(`TechSol atualizado para ${t}!`)}p.onclick=()=>{P.playClick(),o<e.length-1?(o++,w(o)):h()},w(0),requestAnimationFrame(()=>{n.style.opacity="1",i.style.transform="translateY(0)"})}var Lo="cw_timezone_pinned",Mt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],ca=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function Oo(){let t="v2.2 Pro",e=!1,o=null,a="mx",n=JSON.parse(localStorage.getItem(Lo)||"[]"),i="",s="all",r=new Date;r.setHours(14,0,0,0);let l={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},m={container:{display:"flex",flexDirection:"column",height:"100%",background:l.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:l.surface,borderBottom:`1px solid ${l.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:l.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:l.primary,borderBottomColor:l.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:l.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:l.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${l.border}`,background:l.surface,color:l.textSub,transition:"all 0.2s"},chipActive:{background:l.primaryBg,color:l.primary,borderColor:l.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:l.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${l.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:l.surface,border:`1px solid ${l.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:l.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},u=document.createElement("div");u.id="timezone-popup",u.classList.add("cw-module-window"),Object.assign(u.style,me,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let w=pe(u,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:u},()=>E());u.appendChild(w);let h=document.createElement("div");Object.assign(h.style,m.container),u.appendChild(h);let c=document.createElement("div");Object.assign(c.style,m.tabHeader);let d=document.createElement("div");d.textContent="Monitoramento",Object.assign(d.style,m.tabBtn,m.tabActive);let S=document.createElement("div");S.textContent="Planejador",Object.assign(S.style,m.tabBtn),c.appendChild(d),c.appendChild(S),h.appendChild(c);let T=document.createElement("div");Object.assign(T.style,m.toolbar);let M=document.createElement("div");Object.assign(M.style,m.searchInputWrapper);let H=document.createElement("div");H.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(H.style,m.searchIcon);let N=document.createElement("input");N.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(N.style,m.searchInput),N.onfocus=()=>{N.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",N.style.borderColor="rgba(26,115,232,0.3)"},N.onblur=()=>{N.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",N.style.borderColor="transparent"},N.oninput=f=>{i=f.target.value.toLowerCase(),F()},M.appendChild(H),M.appendChild(N),T.appendChild(M);let K=document.createElement("div");Object.assign(K.style,m.chipsRow),ca.forEach(f=>{let y=document.createElement("div");y.textContent=f.label,y.id=`tz-filter-${f.id}`,Object.assign(y.style,m.chip),f.id===s&&Object.assign(y.style,m.chipActive),y.onclick=()=>{P.playClick(),s=f.id,Array.from(K.children).forEach(k=>{Object.assign(k.style,m.chip)}),Object.assign(y.style,m.chipActive),F()},K.appendChild(y)}),T.appendChild(K),h.appendChild(T);let Z=document.createElement("div");Object.assign(Z.style,m.listContainer);let q=document.createElement("style");q.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",h.appendChild(q);let O=document.createElement("div");Object.assign(O.style,m.plannerWrapper,{display:"none"}),h.appendChild(Z),h.appendChild(O),d.onclick=()=>R("live"),S.onclick=()=>R("plan");function R(f){P.playClick(),f==="live"?(Object.assign(d.style,m.tabActive),Object.assign(S.style,m.tabBtn),S.style.borderBottomColor="transparent",Z.style.display="flex",T.style.display="flex",O.style.display="none",_()):(Object.assign(S.style,m.tabActive),Object.assign(d.style,m.tabBtn),d.style.borderBottomColor="transparent",O.style.display="flex",Z.style.display="none",T.style.display="none",x(),z())}function Y(f){return f>=9&&f<17?{color:l.success,bg:l.successBg,label:"Aberto",icon:"\u{1F7E2}"}:f>=8&&f<9?{color:l.warning,bg:l.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:f>=17&&f<19?{color:l.warning,bg:l.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:l.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function D(f){n.includes(f)?n=n.filter(y=>y!==f):n.push(f),localStorage.setItem(Lo,JSON.stringify(n)),F(),P.playClick()}function F(){Z.innerHTML="";let f=new Date,y=Mt.filter(v=>{let L=v.name.toLowerCase().includes(i)||v.label.toLowerCase().includes(i),g=s==="all"||v.region===s;return L&&g});if(y.sort((v,L)=>{let g=n.includes(v.id),G=n.includes(L.id);return g&&!G?-1:!g&&G?1:v.name.localeCompare(L.name)}),y.length===0){Z.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}y.forEach(v=>{let L=n.includes(v.id),g=f.toLocaleTimeString("pt-BR",{timeZone:v.zone,hour:"2-digit",minute:"2-digit"}),G=parseInt(g.split(":")[0]),$=Y(G),I=G<6||G>18,b=document.createElement("div");Object.assign(b.style,m.hubCard),L&&Object.assign(b.style,m.hubCardPinned);let C=L?"\u2605":"\u2606",A=L?"#F9AB00":"#DADCE0";b.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${A}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${C}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${v.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${l.text}; letter-spacing:-0.2px;">${v.name}</div>
                        <div style="font-size:12px; color:${l.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${I?"\u{1F319}":"\u2600\uFE0F"} ${v.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${l.text}; font-family:'Google Sans', sans-serif;">${g}</div>
                    <div style="font-size:11px; font-weight:600; color:${$.color}; background:${$.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${$.label}
                    </div>
                </div>
            `,b.onmouseenter=()=>{b.style.transform="translateY(-2px)",b.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},b.onmouseleave=()=>{b.style.transform="translateY(0)",b.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let U=b.querySelector(".cw-pin-btn");U.onmouseenter=()=>{U.style.backgroundColor="#F1F3F4"},U.onmouseleave=()=>{U.style.backgroundColor="transparent"},U.onclick=j=>{j.stopPropagation(),D(v.id)},b.onclick=()=>{a=v.id,R("plan")},Z.appendChild(b)});let k=document.createElement("div");k.style.height="20px",k.style.width="100%",Z.appendChild(k)}function z(){O.innerHTML="";let f=document.createElement("div"),y=document.createElement("label");y.textContent="Onde est\xE1 o cliente?",y.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let k=document.createElement("select");Object.assign(k.style,Vt),k.style.padding="14px",[...Mt].sort((ne,te)=>ne.name.localeCompare(te.name)).forEach(ne=>{let te=document.createElement("option");te.value=ne.id,te.textContent=`${ne.flag} ${ne.name} (${ne.zone})`,ne.id===a&&(te.selected=!0),k.appendChild(te)}),k.onchange=ne=>{a=ne.target.value,Q(),P.playClick()},f.appendChild(y),f.appendChild(k),O.appendChild(f);let L=document.createElement("div");Object.assign(L.style,m.timeComparisonRow);let g=document.createElement("div");Object.assign(g.style,m.timeCard),g.style.backgroundColor="#F8FAFF",g.style.borderColor="#E8F0FE",g.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let G=document.createElement("div");Object.assign(G.style,m.timeCard),G.style.backgroundColor="#FFF8E1",G.style.borderColor="#FEF7E0",G.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,L.appendChild(g),L.appendChild(G),O.appendChild(L);let $=document.createElement("div");$.id="cw-planner-status",Object.assign($.style,m.statusBadge),O.appendChild($);let I=document.createElement("div");Object.assign(I.style,{padding:"0 4px",marginTop:"12px"});let b=document.createElement("div");b.textContent="Arraste para simular o hor\xE1rio:",b.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let C=document.createElement("div");Object.assign(C.style,m.timelineContainer);let A=document.createElement("div");Object.assign(A.style,m.timelineTrack);let U=document.createElement("div");Object.assign(U.style,m.dayZone),A.appendChild(U);let j=document.createElement("input");j.type="range",j.min="0",j.max="1439",j.step="15",j.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let J=document.createElement("div");J.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",J.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",C.appendChild(A),C.appendChild(j),C.appendChild(J),I.appendChild(b),I.appendChild(C),O.appendChild(I);let V=g.querySelector("#cw-time-input-br"),ee=G.querySelector("#cw-time-display-client"),oe=G.querySelector("#cw-client-label");function Q(){let ne=Mt.find(Ne=>Ne.id===a);oe.textContent=`${ne.flag} ${ne.label} (${ne.zone})`;let te=r.getHours(),re=r.getMinutes(),We=`${String(te).padStart(2,"0")}:${String(re).padStart(2,"0")}`;V.value=We,j.value=te*60+re;let tt=r.toLocaleTimeString("pt-BR",{timeZone:ne.zone,hour:"2-digit",minute:"2-digit"});ee.textContent=tt;let qe=parseInt(tt.split(":")[0]);qe>=9&&qe<17?($.style.background=l.successBg,$.style.color=l.success,$.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):qe>=8&&qe<9||qe>=17&&qe<19?($.style.background=l.warningBg,$.style.color=l.warning,$.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):($.style.background=l.errorBg,$.style.color=l.error,$.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}j.oninput=ne=>{let te=parseInt(ne.target.value);r.setHours(Math.floor(te/60)),r.setMinutes(te%60),Q()},V.oninput=ne=>{let[te,re]=ne.target.value.split(":");te&&re&&(r.setHours(parseInt(te)),r.setMinutes(parseInt(re)),Q())},Q()}function _(){F(),o||(o=setInterval(F,6e4))}function x(){o&&(clearInterval(o),o=null)}function E(){e=!e,ue(e,u,"cw-btn-timezone"),e?R("live"):x()}return document.body.appendChild(u),E}function Io(){let t="v1.1",e=!1,o="general",a=null,n=null,i={tabs:{general:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>',email:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0 1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'},actions:{copy:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',delete:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',add:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'},toolbar:{bold:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',italic:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',code:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',image:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'},empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(26, 115, 232, 0.2)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>',media:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'};if(!document.getElementById("cw-lib-styles")){let _=document.createElement("style");_.id="cw-lib-styles",_.innerHTML=`
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
        `,document.head.appendChild(_)}let s={bg:"linear-gradient(180deg, #F8FAFD 0%, #EEF2F8 100%)",surface:"rgba(255, 255, 255, 0.85)",glass:"rgba(255, 255, 255, 0.7)",primary:"#1a73e8",primaryLight:"rgba(26, 115, 232, 0.1)",text:"#1f1f1f",textSub:"#474747",border:"rgba(0, 0, 0, 0.06)",danger:"#d93025"},r={container:{display:"flex",flexDirection:"column",height:"100%",background:s.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"16px 24px 0 24px",background:"transparent",borderBottom:`1px solid ${s.border}`,gap:"8px"},tabBtn:{flex:1,padding:"14px 16px",textAlign:"center",cursor:"pointer",fontSize:"14px",fontWeight:"500",color:s.textSub,borderBottom:"3px solid transparent",transition:"all 0.3s ease",userSelect:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",borderRadius:"12px 12px 0 0"},tabActive:{color:s.primary,borderBottomColor:s.primary,fontWeight:"600",background:"rgba(26, 115, 232, 0.04)"},listContainer:{flex:1,overflowY:"auto",padding:"24px",display:"flex",flexDirection:"column",gap:"16px"},emptyState:{padding:"60px 24px",textAlign:"center",color:s.textSub,display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},card:{background:s.surface,borderRadius:"24px",padding:"20px",border:`1px solid ${s.border}`,boxShadow:"0 4px 12px rgba(0,0,0,0.03)",transition:"all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",cursor:"default",position:"relative"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"},cardTitle:{fontSize:"15px",fontWeight:"600",color:s.text,letterSpacing:"-0.01em"},cardPreview:{fontSize:"13px",color:s.textSub,lineHeight:"1.6",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"16px",paddingTop:"16px",borderTop:`1px solid ${s.border}`},actionBtn:{padding:"8px 14px",borderRadius:"10px",fontSize:"13px",fontWeight:"500",cursor:"pointer",border:"none",background:"transparent",transition:"all 0.2s",display:"flex",alignItems:"center",gap:"6px"},fab:{position:"absolute",bottom:"32px",right:"32px",width:"64px",height:"64px",borderRadius:"20px",background:`linear-gradient(135deg, ${s.primary}, #0059c1)`,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.9)",backdropFilter:"blur(30px) saturate(180%)",webkitBackdropFilter:"blur(30px) saturate(180%)",zIndex:20,transform:"translateY(100%)",transition:"transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"24px 32px",background:"transparent",borderBottom:`1px solid ${s.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"32px",overflowY:"auto"},inputGroup:{marginBottom:"24px"},label:{display:"block",fontSize:"13px",fontWeight:"600",color:s.textSub,marginBottom:"10px",letterSpacing:"0.02em"},input:{width:"100%",padding:"14px 18px",borderRadius:"14px",border:`1px solid ${s.border}`,fontSize:"15px",fontFamily:"inherit",outline:"none",background:s.surface,transition:"all 0.2s ease",boxSizing:"border-box"}},l=document.createElement("div");l.id="library-popup",l.classList.add("cw-module-window"),Object.assign(l.style,me,{right:"auto",left:"50%",width:"400px",height:"600px",transform:"translateX(-50%) scale(0.05)"});let u=pe(l,"Minha Biblioteca",t,"Gerencie seus snippets, textos e templates.",{popup:l},()=>z());l.appendChild(u);let p=document.createElement("div");Object.assign(p.style,r.container),l.appendChild(p);let w=document.createElement("div");Object.assign(w.style,r.tabHeader);let h=[{id:"general",label:"Geral",icon:i.tabs.general},{id:"note",label:"Notas",icon:i.tabs.note},{id:"email",label:"Emails",icon:i.tabs.email}];h.forEach(_=>{let x=document.createElement("div");x.innerHTML=`${_.icon} <span>${_.label}</span>`,x.id=`lib-tab-${_.id}`,Object.assign(x.style,r.tabBtn),_.id===o&&Object.assign(x.style,r.tabActive),x.onmouseenter=()=>P.playHover(),x.onclick=()=>Z(_.id),w.appendChild(x)}),p.appendChild(w);let c=document.createElement("div");Object.assign(c.style,r.listContainer),p.appendChild(c);let d=document.createElement("div");d.className="cw-fab cw-tactile",Object.assign(d.style,r.fab),d.innerHTML=i.actions.add,d.onmouseenter=()=>{d.style.transform="scale(1.1)",d.style.boxShadow="0 12px 32px rgba(26, 115, 232, 0.5)"},d.onmouseleave=()=>{d.style.transform="scale(1)",d.style.boxShadow="0 8px 24px rgba(26, 115, 232, 0.4)"},d.onclick=()=>O(),p.appendChild(d),a=document.createElement("div"),Object.assign(a.style,r.editorOverlay);let S=document.createElement("div");Object.assign(S.style,r.editorHeader),S.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let T=document.createElement("button");T.innerHTML="Cancelar",T.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",T.onclick=R,S.appendChild(T),a.appendChild(S);let M=document.createElement("div");Object.assign(M.style,r.editorBody),a.appendChild(M);let H=document.createElement("div");H.style.cssText="padding:24px 32px; border-top:1px solid rgba(0,0,0,0.06); background:transparent; display:flex; justify-content:flex-end;";let N=document.createElement("button");N.textContent="Salvar",N.style.cssText="padding:12px 32px; background:linear-gradient(135deg, #1a73e8, #0059c1); color:white; border:none; border-radius:14px; font-weight:600; cursor:pointer; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition: all 0.2s;",N.onclick=Y,H.appendChild(N),a.appendChild(H),p.appendChild(a);let K=document.createElement("div");Object.assign(K.style,Ee),K.className="no-drag",l.appendChild(K),Ae(l,K),document.body.appendChild(l);function Z(_){P.playClick(),o=_,h.forEach(x=>{let E=document.getElementById(`lib-tab-${x.id}`);x.id===_?Object.assign(E.style,r.tabActive):Object.assign(E.style,r.tabBtn)}),q()}function q(){c.innerHTML="";let _=ye.getSnippets(o);if(_.length===0){c.innerHTML=`
                <div style="${F(r.emptyState)}">
                    <div style="opacity:0.8;">${i.empty}</div>
                    <div style="font-weight:600; font-size:16px; color:${s.text};">Nada aqui ainda.</div>
                    <div style="font-size:14px; opacity:0.7;">Clique no bot\xE3o de adicionar para come\xE7ar sua cole\xE7\xE3o.</div>
                </div>
            `;return}_.forEach(x=>{let E=document.createElement("div");E.className="cw-aura-card",Object.assign(E.style,r.card),x.isCode&&(E.style.borderLeft=`4px solid ${s.primary}`,E.style.background="rgba(26, 115, 232, 0.02)");let f=x.content,y="";if(x.isRich){let k=document.createElement("div");k.innerHTML=x.content;let v=k.querySelector("img");f=k.innerText.substring(0,150)+(k.innerText.length>150?"...":""),v&&(y=`<span style="display:inline-flex; align-items:center; background:rgba(26, 115, 232, 0.1); color:#1a73e8; padding:2px 8px; border-radius:10px; font-size:11px; margin-bottom:8px; font-weight:600;">${i.media} Media</span>`)}E.innerHTML=`
                <div style="${F(r.cardHeader)}">
                    <div style="${F(r.cardTitle)}">${x.title}</div>
                    <div style="display:flex; gap:6px;">
                        ${x.isCode?'<span style="font-size:10px; background:rgba(0,0,0,0.05); color:#474747; padding:3px 8px; border-radius:6px; font-family:monospace; font-weight:700;">CODE</span>':""}
                        ${o==="email"?'<span style="font-size:10px; background:rgba(26, 115, 232, 0.1); color:#1a73e8; padding:3px 8px; border-radius:6px; font-weight:700;">TEMPLATE</span>':""}
                    </div>
                </div>
                ${y}
                <div style="${F(r.cardPreview)}; ${x.isCode?"font-family:'Roboto Mono', monospace; font-size:12px; background:rgba(0,0,0,0.02); padding:12px; border-radius:12px;":""}">${f}</div>
                <div style="${F(r.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${F(r.actionBtn)}; color:#1a73e8;">
                        ${i.actions.copy}
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${F(r.actionBtn)}; color:#474747;">
                        ${i.actions.edit}
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${F(r.actionBtn)}; color:#d93025;">
                        ${i.actions.delete}
                        <span>Excluir</span>
                    </button>
                </div>
            `,E.onmouseenter=()=>{P.playHover()},E.querySelector(".cw-act-copy").onclick=k=>{if(k.stopPropagation(),P.playClick(),x.isRich){let v=new Blob([x.content],{type:"text/html"}),L=document.createElement("div");L.style.whiteSpace="pre-wrap",L.innerHTML=x.content;let g=new Blob([L.innerText],{type:"text/plain"}),G=[new ClipboardItem({"text/html":v,"text/plain":g})];navigator.clipboard.write(G)}else navigator.clipboard.writeText(x.content);X("Copiado!")},E.querySelector(".cw-act-edit").onclick=k=>{k.stopPropagation(),P.playClick(),O(x)},E.querySelector(".cw-act-del").onclick=async k=>{k.stopPropagation(),P.playClick(),await he("Excluir este item?")&&(ye.delete(x.id),q(),X("Item exclu\xEDdo."))},c.appendChild(E)})}function O(_=null){n=_?_.id:null,M.innerHTML="",M.appendChild(D("title","T\xEDtulo / Nome",_?_.title:"")),o==="email"&&M.appendChild(D("subject","Assunto do Email",_?_.subject:""));let x="Conte\xFAdo";o==="email"&&(x="Corpo do Email (HTML)"),o==="note"&&(x="Texto da Nota (Reason)"),M.appendChild(D("content",x,_?_.content:"",{isRich:!0,isCode:_?_.isCode:!1})),S.querySelector("span").textContent=_?"Editar Item":"Novo Item",a.style.transform="translateY(0)",setTimeout(()=>{let E=M.querySelector("input");E&&E.focus()},300)}function R(){a.style.transform="translateY(100%)",setTimeout(()=>n=null,300)}async function Y(){let _=M.querySelector("#cw-inp-title"),x=M.querySelector("#cw-inp-content"),E=_.value.trim(),f=x.contentEditable==="true"?x.innerHTML:x.value.trim(),y=x.getAttribute("data-is-code")==="true";if(!E||!f||f==="<br>"){X("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let k={id:n,type:o,title:E,content:f,isCode:y,isRich:x.contentEditable==="true"};if(o==="email"){let v=M.querySelector("#cw-inp-subject").value.trim();if(!v){X("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}k.subject=v}N.textContent="Salvando...",await ye.save(k),N.textContent="Salvar",R(),q(),X("Salvo com sucesso!"),P.playSuccess()}function D(_,x,E,f={}){let y=document.createElement("div");Object.assign(y.style,r.inputGroup);let k=document.createElement("label");k.textContent=x,Object.assign(k.style,r.label);let v;if(f.isRich){let L=document.createElement("div");L.style.cssText="display:flex; gap:8px; margin-bottom:14px; background:rgba(255, 255, 255, 0.5); padding:8px; border-radius:14px; border:1px solid rgba(0,0,0,0.06); backdrop-filter: blur(10px); width: fit-content;",L.innerHTML=`
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
            `,v=document.createElement("div"),v.contentEditable="true",Object.assign(v.style,r.input,{minHeight:"180px",maxHeight:"350px",overflowY:"auto",whiteSpace:"pre-wrap",lineHeight:"1.6",outline:"none"}),v.innerHTML=E||"",f.isCode&&(v.style.fontFamily="'Roboto Mono', monospace",v.style.backgroundColor="#F8F9FA",v.setAttribute("data-is-code","true")),L.querySelectorAll(".cw-toolbar-btn").forEach(g=>{g.onmouseenter=()=>P.playHover(),g.onmousedown=()=>P.playClick()}),L.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),v.focus()},L.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),v.focus()},L.querySelector(".cw-tb-code").onclick=g=>{let $=!(v.getAttribute("data-is-code")==="true");v.setAttribute("data-is-code",$),v.style.fontFamily=$?"'Roboto Mono', monospace":"inherit",v.style.backgroundColor=$?"rgba(0, 122, 255, 0.03)":s.surface,$?g.currentTarget.classList.add("active"):g.currentTarget.classList.remove("active"),v.focus()},L.querySelector(".cw-tb-img").onclick=async()=>{let g=await Zt("Cole a URL da imagem:");g&&(document.execCommand("insertImage",!1,g),v.querySelectorAll("img").forEach($=>{$.style.maxWidth="100%",$.style.borderRadius="8px"}))},v.onpaste=g=>{let G=(g.clipboardData||g.originalEvent.clipboardData).items;for(let $ of G)if($.kind==="file"&&$.type.startsWith("image/")){g.preventDefault();let I=$.getAsFile(),b=new FileReader;b.onload=C=>{let A=`<img src="${C.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;document.execCommand("insertHTML",!1,A)},b.readAsDataURL(I)}},y.appendChild(k),y.appendChild(L)}else v=document.createElement("input"),v.type="text",Object.assign(v.style,r.input),v.value=E||"",y.appendChild(k);return v.id=`cw-inp-${_}`,v.onfocus=()=>{v.style.borderColor=s.primary,v.style.boxShadow=`0 0 0 2px ${s.primaryBg}`},v.onblur=()=>{v.style.borderColor=s.border,v.style.boxShadow="none"},y.appendChild(v),y}function F(_){return Object.entries(_).map(([x,E])=>`${x.replace(/[A-Z]/g,f=>"-"+f.toLowerCase())}:${E}`).join(";")}function z(){e=!e,ue(e,l,"cw-btn-library"),e&&q()}return z}function qo(){let t="v1.0",e=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},a="cw-configs-styles";if(!document.getElementById(a)){let c=document.createElement("style");c.id=a,c.innerHTML=`
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
        `,document.head.appendChild(c)}let n=document.createElement("div");n.id="configs-popup",n.classList.add("cw-module-window"),Object.assign(n.style,me,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let s=pe(n,"Configura\xE7\xF5es",t,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:n},()=>h());n.appendChild(s);let r=document.createElement("div");r.className="cw-configs-container",n.appendChild(r);let l=document.createElement("div");l.className="cw-profile-card",l.id="cw-user-profile-section",l.style.display="none",r.appendChild(l);async function m(){l.style.display="flex",l.innerHTML=`
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
        `;try{let c=await xe(),d=c.userProfile,S=c.agentEmail?c.agentEmail.split("@")[0]:"user";if(!d){l.innerHTML=`
                    <div class="cw-profile-avatar" style="background: #e8eaed; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5f6368; font-weight: bold;">
                        ${S.charAt(0).toUpperCase()}
                    </div>
                    <div class="cw-profile-info">
                        <h2 class="cw-profile-ldap">@${S}</h2>
                        <div class="cw-profile-badges">
                            <span class="cw-profile-badge">Consultor</span>
                            <span class="cw-profile-badge">N/A</span>
                        </div>
                        <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                            Perfil n\xE3o localizado na base de dados.
                        </div>
                    </div>
                `;return}l.innerHTML=`
                <img src="https://moma-teams-photos.corp.google.com/photos/${d.ldap}?sz=600&type=PLUS"
                     class="cw-profile-avatar" alt="User Photo"
                     onerror="this.style.display='none'">
                <div class="cw-profile-info">
                    <h2 class="cw-profile-ldap">@${d.ldap}</h2>
                    <div class="cw-profile-badges">
                        <span class="cw-profile-badge">${d.roleCategory||"N/A"}</span>
                        <span class="cw-profile-badge">${d.segment||"N/A"}</span>
                        <span class="cw-profile-badge">${d.defaultLanguage||"N/A"}</span>
                        ${d.isOverhead?'<span class="cw-profile-badge overhead">Gest\xE3o / Overhead</span>':""}
                    </div>
                    <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                        ${d.role||""}
                    </div>
                </div>
            `}catch(c){console.warn("Erro ao renderizar perfil:",c),l.style.display="none"}}m();let u=document.createElement("div");u.className="cw-configs-section",u.innerHTML=`
        <div class="cw-configs-section-title">Prefer\xEAncias de Som</div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label">Efeitos Sonoros</div>
                    <div class="cw-configs-desc">Ativar ou desativar sons de interface.</div>
                </div>
                <input type="checkbox" id="cw-config-sound-toggle" ${P.isMuted()?"":"checked"} style="cursor:pointer; width:20px; height:20px;">
            </div>
        </div>
    `;let p=u.querySelector("#cw-config-sound-toggle");p.onchange=c=>{P.setMuted(!c.target.checked),c.target.checked&&P.playClick()},r.appendChild(u);let w=document.createElement("div");w.className="cw-configs-section",w.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank">Reportar Bug/Sugest\xF5es</a>
            </div>
        </div>
    `,r.appendChild(w);function h(){e=!e,ue(e,n,"cw-btn-configs"),e&&P.playClick()}return document.body.appendChild(n),h}var _o="cubic-bezier(0.4, 0, 0.2, 1)",ks=`all 0.3s ${_o}`,Mo=()=>{if(document.getElementById("bau-form-global-styles"))return;let t=document.createElement("style");t.id="bau-form-global-styles",t.textContent=`
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
      
      background: #ffffff;
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      
      transform-origin: center center;
      animation: cw-genie-effect-in 0.4s ${_o};
      transition: all 0.3s ease;
    }

    .bau-view-container {
      flex: 1;
      position: relative;
      min-height: 400px;
      overflow: hidden; /* Mant\xE9m o conte\xFAdo dentro dos limites da view */
    }

    .bau-view {
      display: none;
      flex-direction: column;
      height: 100%;
      animation: bauFadeIn 0.3s ease;
      position: relative;
      box-sizing: border-box;
    }
    .bau-view.active { display: flex; }
    @keyframes bauFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* --- 3. ESTILOS GERAIS E CLASSES ADICIONAIS --- */
    .bau-dashboard-content {
      flex: 1;
      overflow-y: auto; /* Apenas o conte\xFAdo do dashboard ter\xE1 scroll */
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
      border: 2px solid #ffffff;
    }
    .bau-dashboard-content::-webkit-scrollbar-thumb:hover {
      background-color: #bdc1c6;
    }

    /* --- ACCORDION PARA CASOS ANTIGOS --- */
    .bau-accordion-container { 
        list-style: none;
        margin-top: 12px; 
    }
    .bau-accordion-toggle {
        width: 100%;
        background: #f1f3f4;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        padding: 12px 20px;
        font-size: 13px;
        font-weight: 600;
        color: #5f6368;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: background-color 0.2s ease;
    }
    .bau-accordion-toggle:hover { background-color: #e8eaed; }
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
      gap: 12px;
      margin-bottom: 24px;
    }
    .bau-metric-card {
      flex: 1;
      background: #f8f9fa;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .bau-metric-value {
      font-size: 20px;
      font-weight: 700;
      color: #1a73e8;
    }
    .bau-metric-label {
      font-size: 11px;
      font-weight: 600;
      color: #5f6368;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .bau-case-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }

    .bau-case-card {
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.25s ease;
      cursor: default;
    }

    .bau-case-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.06);
      border-color: rgba(26, 115, 232, 0.4);
    }

    /* Aura Status Overrides */
    .bau-case-card.status-yellow-aura { background-color: #fef7e0; border-color: rgba(249, 171, 0, 0.2); }
    .bau-case-card.status-green-aura { background-color: #e6f4ea; border-color: rgba(30, 142, 62, 0.2); }
    .bau-case-card.status-red-aura { background-color: #fce8e6; border-color: rgba(217, 48, 37, 0.2); }

    .bau-case-main { display: flex; align-items: flex-start; gap: 12px; }
    .bau-case-icon { color: #5f6368; margin-top: 2px; }
    .bau-case-info { display: flex; flex-direction: column; gap: 4px; }
    .bau-case-header { display: flex; align-items: baseline; gap: 8px; }
    .bau-case-title { margin: 0; font-size: 15px; font-weight: 600; color: #202124; }
    .bau-case-date { font-size: 11px; color: #9aa0a6; }
    .bau-case-details { margin: 0; font-size: 12px; color: #5f6368; max-width: 400px;}

    .bau-case-status-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 100px;
      white-space: nowrap;
      position: relative;
    }
    .bau-case-status-badge.status-yellow { background: #fff1c1; color: #724c00; }
    .bau-case-status-badge.status-green { background: #ceead6; color: #0d652d; }
    .bau-case-status-badge.status-red { background: #fad2cf; color: #a50e0e; }
    .bau-case-status-badge.status-gray { background: #e8eaed; color: #3c4043; }

    .bau-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
      color: #9aa0a6;
      height: 100%;
    }
    .bau-empty-state svg { margin-bottom: 16px; opacity: 0.5; }
    .bau-empty-title { font-size: 16px; font-weight: 600; color: #5f6368; margin: 0 0 4px 0; }
    .bau-empty-subtitle { font-size: 13px; margin: 0; }

    /* STICKY FAB - NOVO CASO */
    .bau-dashboard-fab {
      position: absolute;
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
    .bau-dashboard-fab:active { transform: scale(0.98); }

    .bau-view-header { margin-bottom: 20px; padding: 0 24px; }
    .bau-content { overflow-y: auto; height: 100%; padding: 0 24px; }
    .bau-back-btn { background: transparent; border: none; color: #5f6368; font-size: 14px; display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 4px 0; }
    .bau-back-btn:hover { color: #202124; }

    .bau-progress-indicator { display: flex; justify-content: space-between; margin-bottom: 24px; position: relative; }
    .bau-progress-indicator::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: #dadce0; z-index: 1; transform: translateY(-50%); }
    .bau-progress-step { width: 28px; height: 28px; border-radius: 50%; background: #ffffff; border: 2px solid #dadce0; color: #5f6368; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; position: relative; z-index: 2; transition: all 0.3s ease; }
    .bau-progress-step.active { border-color: #1a73e8; background: #1a73e8; color: #ffffff; }
    .bau-progress-step.completed { border-color: #1e8e3e; background: #1e8e3e; color: #ffffff; }

    .bau-step { display: none; padding-bottom: 80px; }
    .bau-step.active { display: block; animation: bauFadeIn 0.3s; }
    .bau-card { background: #ffffff; border: 1px solid #dadce0; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    .bau-context-card {
      background: linear-gradient(135deg, #f8f9fa 0%, #e8eaed 100%);
      color: #202124;
      border: none;
      border-radius: 12px;
      padding: 20px;
    }

    .bau-label { display: block; font-size: 13px; font-weight: 600; color: #202124; margin-top: 20px; margin-bottom: 8px; }
    .bau-label:first-of-type { margin-top: 0; }

    .bau-highlight-panel, .bau-context-badges-grid, .bau-dynamic-inputs-container { display: none; } /* Ocultados para simplificar */
    
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
        border-top: 1px solid #dadce0; 
    }
  `,document.head.appendChild(t)};var Ve={steps:[{id:1,title:"Contexto e Valida\xE7\xE3o",fields:[{id:"advName",name:"advName",label:"Nome do Anunciante",type:"text",placeholder:"Nome do Anunciante",required:!0,isSmart:!0},{id:"cid",name:"cid",label:"CID",type:"text",placeholder:"000-000-0000",required:!0,isSmart:!0,tooltip:"Use o formato 000-000-0000 ou 10 d\xEDgitos",validation:{regex:"^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$",error:"Formato de CID incorreto"}},{id:"amName",name:"amName",label:"Account Manager (AM)",type:"text",placeholder:"Nome do AM",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!1,isSmart:!0,button:{id:"bau-top-se-search",icon:"wand",title:"Buscar ID automaticamente"}}]},{id:2,title:"Tasks",fields:[{id:"reason",name:"reason",label:"O que deve ser feito em BAU",type:"textarea",placeholder:"Descreva as a\xE7\xF5es esperadas...",required:!0,style:{minHeight:"80px"}},{id:"taskType",name:"taskType",label:"Tasks para BAU (Selecione 1 ou mais)",type:"checkbox-grid",required:!0,tooltip:"Selecione os tipos de implementa\xE7\xE3o t\xE9cnica",options:["Ads Conversion Tracking","Ads Dynamic Remarketing","Ads Enhanced Conversions","Ads Website Call Conversion","Ads Remarketing","Analytics Cross Domain Tracking","Analytics E-Commerce Tracking","Analytics Enhanced E-Commerce Tracking","Analytics Event Tracking","Analytics Health Check","Analytics Remarketing","Analytics Setup","Fix GA4 implementation","Consent Mode","Fix Sitewide Tagging (OGT & CT)","Google Tag Manager Installation","Customer Match"]}]},{id:3,title:"Justificativa e Agendamento",fields:[{id:"nonImplementationReason",name:"nonImplementationReason",label:"Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",type:"select",required:!0,options:[{value:"",text:"Selecione um motivo..."},{value:"Tempo da consultoria esgotado",text:"Tempo da consultoria esgotado"},{value:"Solicita\xE7\xE3o de reagendamento pelo anunciante",text:"Solicita\xE7\xE3o de reagendamento pelo anunciante"},{value:"Falta de acessos ou backup do site",text:"Falta de acessos ou backup do site"},{value:"Anunciante indispon\xEDvel ou n\xE3o preparado",text:"Anunciante indispon\xEDvel ou n\xE3o preparado"},{value:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)",text:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"},{value:"Solicita\xE7\xE3o de tarefas (tasks) adicionais",text:"Solicita\xE7\xE3o de tarefas (tasks) adicionais"},{value:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)",text:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"},{value:"Retorno de contato ap\xF3s prazo de 14 dias expirado",text:"Retorno de contato ap\xF3s prazo de 14 dias expirado"}]},{id:"description",name:"description",label:"Justificativa / Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva detalhadamente o que precisa ser feito...",required:!0},{id:"availability",name:"availability",label:"Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",type:"datetime-group",required:!0,fields:[{name:"availability_1",label:"Op\xE7\xE3o 1 (Prioridade)",required:!0},{name:"availability_2",label:"Op\xE7\xE3o 2 (Opcional)",required:!1},{name:"availability_3",label:"Op\xE7\xE3o 3 (Opcional)",required:!1}]}]},{id:4,title:"Confirma\xE7\xE3o",isConfirmation:!0}]};var Fe={add:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',wand:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',check:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',expand:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>'};function No(t){let e=document.createElement("div");if(e.className="bau-dynamic-input",e.id=`wrapper-${t.id}`,t.label){let a=document.createElement("label");a.className="bau-label",a.textContent=t.label,t.tooltip&&a.setAttribute("data-tooltip",t.tooltip),e.appendChild(a)}let o;switch(t.type){case"textarea":o=document.createElement("textarea"),o.style.minHeight="80px",e.appendChild(o);break;case"select":o=document.createElement("select"),t.options.forEach(i=>{let s=document.createElement("option");s.value=i.value,s.textContent=i.text,o.appendChild(s)}),e.appendChild(o);break;case"checkbox-grid":return o=document.createElement("div"),o.className="bau-tasks-grid",t.options.forEach(i=>{let s=document.createElement("label");s.className="bau-task-item",s.innerHTML=`<input type="checkbox" name="${t.name}" value="${i}"><span>${i}</span>`,s.addEventListener("click",r=>{r.preventDefault();let l=s.querySelector("input");l.checked=!l.checked,s.classList.toggle("active",l.checked),P.playClick()}),o.appendChild(s)}),e.appendChild(o),e;case"datetime-group":return o=document.createElement("div"),o.className="bau-availability-container",t.fields.forEach(i=>{let s=document.createElement("div");s.className="bau-availability-field",s.innerHTML=`
                    <span class="bau-field-hint">${i.label}</span>
                    <input type="datetime-local" name="${i.name}" class="bau-input" ${i.required?"required":""}>
                `,o.appendChild(s)}),e.appendChild(o),e.appendChild(document.createElement("div")),e;case"text-with-button":let a=document.createElement("div");a.className="bau-input-group",o=document.createElement("input"),o.type="text";let n=document.createElement("button");n.type="button",n.id=t.button.id,n.className="bau-mini-btn-input",n.title=t.button.title,n.innerHTML=Fe[t.button.icon]||"",a.appendChild(o),a.appendChild(n),e.appendChild(a);break;default:o=document.createElement("input"),o.type="text",e.appendChild(o)}return o&&t.type!=="checkbox-grid"&&t.type!=="datetime-group"&&(o.id=`bau-form-${t.id}`,o.name=t.name,o.className=t.type==="select"?"bau-select":t.type==="textarea"?"bau-textarea":"bau-input",t.placeholder&&(o.placeholder=t.placeholder),t.required&&(o.required=!0)),e}function Do(){Mo();let t=!1,e="dashboard",o=null,a=1,n=Ve.steps.length,i=document.createElement("div");i.id="bau-form-popup",i.className="bau-popup cw-module-window",i.style.display="none";let s=pe(i,"BAU Central","v2.2.0","Dashboard de Casos BAU",{},()=>E()),r=s.querySelector("div:last-child");if(r){let f=document.createElement("div");f.className="bau-refresh-btn no-drag",f.innerHTML=Fe.refresh,f.title="Atualizar Dashboard",f.onclick=async y=>{y.stopPropagation(),!f.classList.contains("spinning")&&(f.classList.add("spinning"),P.playClick(),await Z(),setTimeout(()=>f.classList.remove("spinning"),1e3))},r.insertBefore(f,r.firstChild)}i.appendChild(s);let l=document.createElement("div");l.className="bau-view-container",i.appendChild(l);let m=document.createElement("div");m.id="bau-view-dashboard",m.className="bau-view active",m.innerHTML=`
        <div class="bau-dashboard-content">
            <div class="bau-dashboard-metrics" id="bau-dashboard-metrics"></div>
            <ul class="bau-case-list" id="bau-case-list-container"></ul>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            ${Fe.add}
            Novo Caso BAU
        </button>
    `,l.appendChild(m);let u=document.createElement("div");u.id="bau-view-form",u.className="bau-view";let p=document.createElement("div");p.className="bau-view-header",p.innerHTML=`
      <button class="bau-back-btn" id="bau-form-back-btn">
        ${Fe.back}
        Voltar ao Dashboard
      </button>
    `,u.appendChild(p);let w=document.createElement("div");w.className="bau-content",u.appendChild(w);let h=document.createElement("div");h.className="bau-progress-indicator",w.appendChild(h);let c=document.createElement("form");c.id="bau-escalation-form",w.appendChild(c),Ve.steps.forEach(f=>{let y=document.createElement("div");if(y.className="bau-step",y.id=`bau-step-${f.id}`,f.isConfirmation)y.innerHTML=`
                <div class="bau-card">
                    <h3 class="bau-step-title">Confirme os dados antes de enviar</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;else{let k=document.createElement("div");if(k.className="bau-card",f.id===1){k.innerHTML=`
                    <div id="bau-vital-highlights" class="bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div id="bau-all-data"></div>
                `;let v=k.querySelector(".bau-dynamic-inputs-container");f.fields.forEach(g=>{v.appendChild(No(g))});let L=k.querySelector("#wrapper-cid");if(L){let g=document.createElement("div");g.id="bau-cid-error",g.className="bau-cid-error-hint",g.style.display="none",g.textContent="Formato de CID incorreto",L.appendChild(g)}}else f.fields.forEach(v=>{k.appendChild(No(v))});y.appendChild(k)}c.appendChild(y)});let d=document.createElement("div");d.className="bau-footer";let S=document.createElement("button");S.type="button",S.id="bau-step-back-btn",S.className="bau-btn-secondary",S.textContent="Voltar";let T=document.createElement("button");T.type="button",T.id="bau-step-next-btn",T.className="bau-btn-primary",T.textContent="Pr\xF3ximo";let M=document.createElement("button");M.type="submit",M.className="bau-btn-submit",M.innerHTML=`${Fe.send} Enviar para o TL`,M.style.display="none",c.appendChild(S),c.appendChild(T),c.appendChild(M),c.appendChild(d),l.appendChild(u);let H=document.createElement("div");H.id="bau-view-success",H.className="bau-view",H.innerHTML=`
        <div class="bau-success-content">
            <div class="bau-success-icon">${Fe.check}</div>
            <h2 class="bau-success-title">Caso enviado com sucesso!</h2>
            <p class="bau-success-message">Sua solicita\xE7\xE3o foi recebida e ser\xE1 processada em breve.</p>
            <button class="bau-btn-primary" id="bau-success-back-btn">Voltar ao Dashboard</button>
        </div>
    `,l.appendChild(H),document.body.appendChild(i);function N(f){e=f,i.querySelectorAll(".bau-view").forEach(L=>L.classList.remove("active"));let y=i.querySelector(`#bau-view-${f}`);y&&y.classList.add("active");let k=s.querySelector(".cw-module-header-title")||s.querySelector("h2"),v=s.querySelector(".cw-module-header-subtitle")||s.querySelector("p");k&&(k.textContent=f==="form"?"Novo Caso BAU":"BAU Central"),v&&(v.textContent=f==="form"?"Preencha os detalhes abaixo":"Dashboard de Casos BAU")}function K(){let f=i.querySelector("#bau-case-list-container"),y=i.querySelector("#bau-dashboard-metrics");y&&(y.innerHTML=`
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `),f&&(f.innerHTML=Array(5).fill(0).map(()=>`
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join(""))}async function Z(){let f=i.querySelector("#bau-case-list-container"),y=i.querySelector("#bau-dashboard-metrics");if(!(!f||!y)){K();try{let k=await Rt();if(!Array.isArray(k))throw new Error("API response is not a valid array");O(k)}catch(k){console.error("Critical Error loading BAU cases:",k),y&&(y.innerHTML=""),f.innerHTML=`
                <div class="bau-empty-state bau-error-state">
                    <div style="color: #d93025; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">Ops! Algo deu errado</h3>
                    <p class="bau-empty-subtitle">N\xE3o conseguimos carregar seus casos BAU no momento.</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        Tentar Novamente
                    </button>
                </div>
            `,i.querySelector("#bau-retry-btn")?.addEventListener("click",()=>Z()),X("Erro ao carregar Dashboard. Verifique sua conex\xE3o.",{error:!0})}}}function q(f){if(!f)return"";let k=(C=>{switch(C){case"PENDING_TL_CREATION":return{text:"Aguardando TL",class:"status-yellow",aura:"status-yellow-aura"};case"CREATED":return{text:"Aprovado / Criado",class:"status-green",aura:"status-green-aura"};case"DISCARDED":return{text:"Descartado pelo TL",class:"status-red",aura:"status-red-aura"};case"CANCELED_BY_AGENT":return{text:"Cancelado",class:"status-gray",aura:""};default:return{text:C||"Pendente",class:"status-gray",aura:""}}})(f?.status),v=f?.date?new Date(f.date).toLocaleDateString("pt-BR"):"",L="",g="";if(f?.status==="PENDING_TL_CREATION"&&f?.availability_1){let C=new Date(f.availability_1),A=new Date;(C<=A||C-A<36e5*2)&&(L='<span class="bau-sla-badge">Urgente</span>',g="bau-pulse-attention")}let G=f?.reason&&f.reason.trim()?f.reason:"Nenhum contexto adicional fornecido pelo agente.",I=/^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(f?.cid||""),b=!f?.caseId||f.caseId==="N/A"||!I;return b&&f?.status==="PENDING_TL_CREATION"&&(g="bau-pulse-attention"),`
            <li class="bau-case-card ${k.aura} ${g}" data-case-id="${f?.id||""}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${Fe.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${f?.advName||"Nome indefinido"}</h3>
                            ${L}
                            <span class="bau-case-date">${v}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="Customer ID do Anunciante">Case: ${f?.caseId||"N/A"}</span> \u2022
                            <span data-tooltip="CID do Anunciante (Formato: 000-000-0000)" class="${I?"":"bau-error-text"}">CID: ${f?.cid||"N/A"}</span> \u2022
                            <span data-tooltip="O que deve ser feito em BAU">Motivo: ${G}</span>
                        </p>
                        ${b?`<div class="bau-data-error-hint">${!f?.caseId||f?.caseId==="N/A"?"Dados Incompletos":"CID Inv\xE1lido"} - Contate o Suporte</div>`:""}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                    <span class="bau-case-status-badge ${k.class}">${k.text}</span>
                </div>
            </li>
        `}function O(f){let y=i.querySelector("#bau-case-list-container"),k=i.querySelector("#bau-dashboard-metrics");if(!y||!k)return;let v=Array.isArray(f)?f.filter(Boolean):[];if(v.length===0){k.innerHTML="",y.innerHTML=`
                <div class="bau-empty-state">
                    ${Fe.empty}
                    <h3 class="bau-empty-title">Nenhum caso recente</h3>
                    <p class="bau-empty-subtitle">Seus casos BAU aparecer\xE3o aqui</p>
                </div>
            `;return}let L=v.filter(I=>I.status==="PENDING_TL_CREATION").length,g=v.filter(I=>I.status==="CREATED").length;k.innerHTML=`
            <div class="bau-metric-card">
                <span class="bau-metric-value">${L}</span>
                <span class="bau-metric-label">Aguardando TL</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${g}</span>
                <span class="bau-metric-label">Criados / Aprovados</span>
            </div>
        `,y.innerHTML="";let G=v.slice(0,5),$=v.slice(5);if(G.forEach(I=>{y.insertAdjacentHTML("beforeend",q(I))}),$.length>0){let I=document.createElement("li");I.className="bau-accordion-container";let b=document.createElement("button");b.className="bau-accordion-toggle",b.innerHTML=`${Fe.expand} <span>Mostrar ${$.length} casos mais antigos</span>`;let C=document.createElement("ul");C.className="bau-case-list bau-accordion-content",C.style.display="none",$.forEach(A=>{C.insertAdjacentHTML("beforeend",q(A))}),b.addEventListener("click",()=>{let A=C.style.display==="none";C.style.display=A?"block":"none",b.classList.toggle("expanded",A),b.querySelector("span").textContent=A?"Esconder casos mais antigos":`Mostrar ${$.length} casos mais antigos`,P.playClick()}),I.appendChild(b),I.appendChild(C),y.appendChild(I)}}function R(){c.querySelectorAll(".bau-step").forEach((f,y)=>{f.classList.toggle("active",y+1===a)}),h.innerHTML="";for(let f=1;f<=n;f++){let y=document.createElement("div");y.className=`bau-progress-step ${f===a?"active":f<a?"completed":""}`,y.textContent=f,h.appendChild(y)}S.style.display=a>1?"inline-block":"none",T.style.display=a<n?"inline-block":"none",M.style.display=a===n?"flex":"none",a===n&&_()}function Y(f){let y=Ve.steps.find(k=>k.id===f);if(!y||!y.fields)return!0;for(let k of y.fields)if(k.validation){let v=c.querySelector(`[name="${k.name}"]`);if(v&&v.value.trim())if(new RegExp(k.validation.regex).test(v.value.trim())){v.classList.remove("invalid-cid");let g=c.querySelector("#bau-cid-error");g&&(g.style.display="none")}else{X(`Erro: ${k.validation.error}`,{error:!0}),v.classList.add("invalid-cid");let g=c.querySelector("#bau-cid-error");return g&&(g.style.display="flex"),!1}}return!0}function D(f){let y=Ve.steps.find(k=>k.id===f);if(!y||!y.fields)return!0;for(let k of y.fields)if(k.required)if(k.type==="checkbox-grid"){if(!c.querySelector(`input[name="${k.name}"]:checked`))return X(`Erro: Selecione pelo menos uma op\xE7\xE3o para "${k.label}".`,{error:!0}),!1}else if(k.type==="datetime-group"){let v=c.querySelector(`input[name="${k.fields[0].name}"]`);if(!v||!v.value.trim())return X(`Erro: O campo "${k.fields[0].label}" \xE9 obrigat\xF3rio.`,{error:!0}),!1}else{let v=c.querySelector(`[name="${k.name}"]`);if(!v||!v.value.trim())return X(`Erro: O campo '${k.label}' \xE9 obrigat\xF3rio.`,{error:!0}),!1}return!0}T.addEventListener("click",()=>{Y(a)&&D(a)&&(a++,R(),P.playClick())}),S.addEventListener("click",()=>{a>1&&(a--,R(),P.playClick())});async function F(){let f=await xe()||{};(!f.amName||f.amName==="N/A")&&(f.amName=f.internalEmail||"N/A"),o=f;let y=c.querySelector("#bau-vital-highlights");if(y){let v=[{label:"Anunciante",value:f.advName},{label:"CID",value:f.cid},{label:"Website",value:f.site||f.website},{label:"Case ID",value:f.caseId}];y.innerHTML=v.map(L=>{let g=L.value&&L.value!=="N/A"&&L.value!=="undefined"&&L.value!=="null"?L.value:"N\xE3o capturado";return`
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${L.label}</span>
                        <span class="bau-highlight-value">${g}</span>
                    </div>
                `}).join("")}Ve.steps.forEach(v=>{v.fields&&v.fields.forEach(L=>{if(L.isSmart){let g=f[L.id],G=c.querySelector(`[name="${L.name}"]`),$=i.querySelector(`#wrapper-${L.id}`);if(G&&(G.value=g&&g!=="N/A"?g:""),$){let I=g&&g!==""&&g!=="N/A"&&g!=="undefined"&&g!=="null";$.style.display=I?"none":"block"}}})});let k=i.querySelector("#bau-all-data");if(k){let v=[{label:"Anunciante",value:f.advName},{label:"CID",value:f.cid},{label:"AM",value:f.amName},{label:"SE ID",value:f.seId},{label:"Site",value:f.site},{label:"Email",value:f.email},{label:"Timezone",value:f.timezone},{label:"Case ID",value:f.caseId},{label:"Programa",value:f.salesProgram},{label:"Idioma",value:f.language}];k.innerHTML=`
                <div class="bau-context-badges-grid">
                    ${v.filter(L=>L.value&&L.value!=="N/A"&&L.value!=="---"&&L.value!=="undefined"&&L.value!=="null").map(L=>`
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${L.label}:</span>
                                <span class="bau-badge-value">${L.value}</span>
                            </div>
                        `).join("")}
                </div>
            `}}i.querySelector("#bau-top-se-search")?.addEventListener("click",f=>{f.preventDefault(),rt("bau-form-seId")});let z=i.querySelector("#bau-form-cid");z&&z.addEventListener("input",()=>Y(1));function _(){let f=new FormData(c),y=Object.fromEntries(f.entries()),k=f.getAll("taskType"),v=i.querySelector("#bau-confirmation-details");if(!v)return;let L=k.length>0?k.join(", "):"Nenhuma",g=[y.availability_1,y.availability_2,y.availability_3].filter(G=>G&&G.trim()).map(G=>G.replace("T"," ")).join(", ")||"N\xE3o definida";v.innerHTML=`
            <div class="bau-confirm-row"><span class="bau-confirm-label">Anunciante:</span><span class="bau-confirm-value">${y.advName||"---"}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">CID:</span><span class="bau-confirm-value">${y.cid||"---"}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">AM:</span><span class="bau-confirm-value">${y.amName||"---"}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Speakeasy ID:</span><span class="bau-confirm-value">${y.seId||"N\xE3o informado"}</span></div>
            <div class="bau-confirm-divider"></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">O que deve ser feito:</span><span class="bau-confirm-value">${y.reason||"---"}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Tasks:</span><span class="bau-confirm-value">${L}</span></div>
            <div class="bau-confirm-divider"></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Justificativa BAU:</span><span class="bau-confirm-value">${y.nonImplementationReason||"---"}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Descri\xE7\xE3o:</span><span class="bau-confirm-value">${y.description||"---"}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Disponibilidade:</span><span class="bau-confirm-value">${g}</span></div>
        `}c.onsubmit=async f=>{f.preventDefault();for(let I=1;I<n;I++)if(!Y(I)||!D(I)){a=I,R();return}let y=i.querySelector(".bau-btn-submit");y.disabled=!0,y.innerHTML="Enviando...";let k=new FormData(c),v=Object.fromEntries(k.entries()),L=k.getAll("taskType"),g=o||{},G=[v.availability_1,v.availability_2,v.availability_3].filter(I=>I&&I.trim()!=="").join(" | "),$={...g,...v,advEmail:g.email||"",website:g.site||"",taskType:L.join(", "),availability:G};try{await zt($,g.agentEmail||"anon"),P.playSuccess(),N("success")}catch(I){X("Erro: "+(I.message||"Erro desconhecido"),{error:!0}),console.error("Payload que tentou enviar:",$)}finally{y.disabled=!1,y.innerHTML=`${Fe.send} Enviar para o TL`}};function x(){c.reset(),a=1,R(),c.querySelectorAll(".bau-task-item.active").forEach(f=>f.classList.remove("active"))}i.querySelector("#bau-new-case-btn").addEventListener("click",()=>{x(),N("form"),F()}),i.querySelector("#bau-form-back-btn").addEventListener("click",()=>N("dashboard")),i.querySelector("#bau-success-back-btn").addEventListener("click",()=>N("dashboard"));async function E(){t=!t,i.style.display=t?"flex":"none",t&&(N("dashboard"),Z()),ue(t,i,"cw-btn-bauform")}return R(),E}function da(){if(window.techSolInitialized){At();return}window.techSolInitialized=!0;let t="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{Gt();try{P.initGlobalListeners(),P.playStartup()}catch(u){console.warn("\xC1udio bloqueado:",u)}le.fetchTips(),At();let e=fo(),o=vo(),a=So(),n=Eo(),i=Oo(),s=Io(),r=qo(),l=Do(),m=Ao();ro({toggleNotes:e,toggleEmail:o,toggleScript:a,toggleLinks:n,toggleTimezone:i,toggleLibrary:s,toggleConfigs:r,toggleBAUForm:l,broadcastControl:m}),setTimeout(()=>{le.logEvent("App","Start","Session Start"),ko(),setTimeout(()=>{Fo(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),X("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}da();})();
