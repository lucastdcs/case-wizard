(()=>{var Bo=Object.defineProperty;var $o=(t,e)=>()=>(t&&(e=t(t=0)),e);var Po=(t,e)=>{for(var o in e)Bo(t,o,{get:e[o],enumerable:!0})};var ct={};Po(ct,{NotesState:()=>lt,notesState:()=>J});var lt,J,tt=$o(()=>{lt=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.consent=!1,this.tagSupportUsed=!1,this.forcedScreenshots=new Set,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1,this.excludedFields=new Set,this.activeFields=[];let e=typeof localStorage<"u"?localStorage.getItem("cw-notes-favorites"):null;this.favorites=new Set(JSON.parse(e||"[]")),this.screenshotMode="implementation",this.notify()}setCaseType(e){this.currentCaseType!==e&&(this.currentCaseType=e,this.isDirty=!0,this.notify())}setLanguage(e){this.currentLang!==e&&(this.currentLang=e,this.notify())}setPortugalCase(e){this.isPortugalCase!==e&&(this.isPortugalCase=e,this.isDirty=!0,this.notify())}setConsent(e){this.consent!==e&&(this.consent=e,this.isDirty=!0,this.notify())}setTagSupportUsed(e){this.tagSupportUsed=e,e||this.forcedScreenshots.clear(),this.isDirty=!0,this.notify()}setActiveFields(e){this.activeFields=[...e],this.isDirty=!0,this.notify()}removeField(e){this.activeFields=this.activeFields.filter(o=>o!==e),this.isDirty=!0,this.notify()}addFieldAt(e,o){this.activeFields.includes(e)||(this.activeFields.splice(o,0,e),this.isDirty=!0,this.notify())}setForcedScreenshots(e){this.forcedScreenshots=new Set(e),this.isDirty=!0,this.notify()}toggleForcedScreenshot(e,o){o?this.forcedScreenshots.add(e):this.forcedScreenshots.delete(e),this.isDirty=!0,this.notify()}setExcludedFields(e){this.excludedFields=new Set(e),this.isDirty=!0,this.notify()}toggleFieldExclusion(e,o){o?this.excludedFields.add(e):this.excludedFields.delete(e),this.isDirty=!0,this.notify()}setStatus(e){this.currentStatus!==e&&(this.currentStatus=e,this.isDirty=!0,this.notify())}setSubStatus(e){this.currentSubStatus!==e&&(this.currentSubStatus=e,this.isDirty=!0,this.notify())}setScreenshotMode(e){this.screenshotMode=e,this.notify()}setActiveTasks(e){this.activeTasks=e,this.isDirty=!0,this.notify()}toggleFavorite(e){this.favorites.has(e)?this.favorites.delete(e):this.favorites.add(e),typeof localStorage<"u"&&localStorage.setItem("cw-notes-favorites",JSON.stringify([...this.favorites])),this.notify()}updateField(e,o){this.formData[e]!==o&&(this.formData[e]=o,this.isDirty=!0,this.notify())}listeners=[];subscribe(e){return this.listeners.push(e),()=>this.listeners=this.listeners.filter(o=>o!==e)}notify(){this.listeners.forEach(e=>e(this))}},J=new lt});var Ho=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Bt="AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg",jo=Ho?`https://script.google.com/a/macros/google.com/s/${Bt}/dev`:`https://script.google.com/a/macros/google.com/s/${Bt}/exec`,St="cw_data_broadcast",$t="cw_data_tips",Go=["Processando...","Mantenha o foco!","Aguarde..."];function Te(t,e={}){return new Promise((o,a)=>{let n="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script"),s=setTimeout(()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(new Error("Timeout: A API demorou muito para responder. (Apps Script bloqueado ou erro 500)"))},15e3);window[n]=g=>{clearTimeout(s),document.body.contains(i)&&document.body.removeChild(i),delete window[n],o(g)};let r=Object.keys(e).map(g=>encodeURIComponent(g)+"="+encodeURIComponent(e[g])).join("&"),l=`${jo}?op=${t}&callback=${n}&t=${Date.now()}&${r}`;i.src=l,i.onerror=()=>{clearTimeout(s),document.body.contains(i)&&document.body.removeChild(i),delete window[n],a(new Error("Erro de conex\xE3o JSONP."))},document.body.appendChild(i)})}var ce={fetchTips:async()=>{try{let t=await Te("tips");t?.tips&&localStorage.setItem($t,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await Te("broadcast");if(t?.broadcast)return localStorage.setItem(St,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(St)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(St)||"[]"),getRandomTip:()=>{let t=Go,e=localStorage.getItem($t);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await ce._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await ce._performOp("update_broadcast",o)},deleteBroadcast:async t=>await ce._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`Executando ${t}...`,e);let o=await Te(t,e);return o&&o.status==="success"?(console.log("Sucesso:",t),!0):(console.warn("Falha:",o),!1)}catch(o){return console.error("Erro JSONP:",o),!1}},logEvent:(t,e,o="",a=null)=>{try{let n="anon";try{let s=fe();s&&(n=s.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:n,version:"v5.1",category:t,action:e,label:o,value:a||""};Te("log",i).catch(s=>{})}catch(n){console.warn("Analytics error",n)}},logUsage:()=>{},sendBAUEscalation:async(t,e)=>{let o={...t,user:e,date:new Date().toISOString()};try{console.log("Executando create_bau...",o);let a=await Te("create_bau",o);if(a&&a.status==="success")return console.log("Sucesso: create_bau"),a;throw new Error(a?.error||a?.message||"Falha na opera\xE7\xE3o BAU")}catch(a){throw console.error("Erro JSONP (BAU):",a),a}},readAgentBAU:async()=>{let t=fe();if(!t)return console.warn("Email n\xE3o encontrado. N\xE3o foi poss\xEDvel buscar casos BAU."),[];try{console.log("Buscando casos BAU para:",t);let e=await Te("read_agent_bau",{user:t});if(e&&e.status==="success"&&Array.isArray(e.cases))return e.cases;if(e&&e.status==="error")throw new Error(e.message||"Erro retornado pela API de leitura");return[]}catch(e){throw console.error("Erro ao buscar casos BAU:",e),e}},updateBAUStatus:async(t,e,o={})=>{let a=fe();try{console.log(`Atualizando status BAU ${t} para ${e}...`);let n=await Te("update_bau_status",{id:t,status:e,user:a,...o});return n&&n.status==="success"}catch(n){return console.error("Erro ao atualizar status BAU:",n),!1}},updateBAUEscalation:async(t,e)=>{let o=fe(),a={...e,id:t,user:o,date_edited:new Date().toISOString()};try{console.log(`Executando update_bau para ${t}...`,a);let n=await Te("update_bau",a);if(n&&n.status==="success")return console.log("Sucesso: update_bau"),n;throw new Error(n?.error||n?.message||"Falha na atualiza\xE7\xE3o BAU")}catch(n){throw console.error("Erro JSONP (Update BAU):",n),n}},fetchUserProfile:async t=>{try{console.log(`Buscando perfil para: ${t}`);let e=await Te("get_user_profile",{ldap:t});return console.log("Resposta bruta do servidor:",e),e&&e.status==="success"&&e.profile?e.profile:null}catch(e){return console.error("Erro ao buscar perfil:",e),null}},getUserSnippets:async t=>{try{return console.log("Buscando snippets para:",t),await Te("get_user_snippets",{user:t})}catch(e){return console.error("Erro ao carregar snippets:",e),{status:"error",snippets:[]}}},saveSnippet:async(t,e)=>{let o={id:t.id,type:t.type,title:t.title,content:t.content,subject:t.subject||"",isCode:t.isCode,isRich:t.isRich,user:e};try{console.log("Salvando snippet na nuvem:",o);let a=await Te("save_snippet",o);return a&&a.status==="success"}catch(a){return console.error("Erro ao salvar snippet:",a),!1}},deleteSnippet:async(t,e)=>{try{console.log(`Deletando snippet ${t}...`);let o=await Te("delete_snippet",{id:t,user:e});return o&&o.status==="success"}catch(o){return console.error("Erro ao deletar snippet:",o),!1}}},Pt=ce.sendBAUEscalation,Ht=ce.readAgentBAU,fa=ce.updateBAUStatus,jt=ce.updateBAUEscalation,it=ce.fetchUserProfile,xa=ce.getUserSnippets,ha=ce.saveSnippet,ya=ce.deleteSnippet;var ie=t=>new Promise(e=>setTimeout(e,t));function he(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function Xe(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}function xe(t){return t?Object.entries(t).map(([e,o])=>`${e.replace(/[A-Z]/g,a=>"-"+a.toLowerCase())}:${o}`).join(";"):""}function Pe(t,e,o){return Math.max(e,Math.min(t,o))}var st="",Qe="",Ct=null;async function Et(){try{let t=document.querySelector('material-button[debug-id="toggle-translation-button"]');if(t){let e=t.textContent.toLowerCase();(e.includes("show original")||e.includes("mostrar original"))&&(console.log("TechSol: Tradu\xE7\xE3o detectada. Revertendo para o idioma original..."),t.click(),await ie(400))}}catch(t){console.warn("TechSol: Erro ao tentar reverter tradu\xE7\xE3o:",t)}}async function At(){if(st&&Qe)return st;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await ie(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let n=document.querySelector("profile-details img");if(n&&n.src.includes("/photos/")){let i=n.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let a=document.querySelector("profile-details .email");return a&&(Qe=a.textContent.trim(),console.log("TechSol: Identidade confirmada ->",Qe)),t.click(),document.body.click(),st=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function et(){return st||"Consultor"}function fe(){return Qe||null}function Gt(t){let e=new Date,o=e.getHours(),a=e.getDay(),n="Ol\xE1",i="";o>=5&&o<12?(n="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(n="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(n="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let s=[];o>=0&&o<5?s=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?a===1?s=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:a===5?s=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:s=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?s=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:s=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(a===0||a===6)&&(s=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=s[Math.floor(Math.random()*s.length)];return{prefix:`${n},`,name:t,suffix:r,icon:i,isFriday:a===5}}async function Uo(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,a=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');a&&(a.click(),await ie(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(s=>{let r=s.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Vo(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function Yo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Google Ads External Customer ID")||n.textContent.includes("Customer ID"));if(e){let n=e.closest("home-data-item")||e.parentElement;if(n){let i=n.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let a=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(a)return a[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"N/A"}function Wo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Account Manager")||o.textContent.includes("AM Name")||o.textContent.includes("Sales Rep"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar AM:",t)}return null}function Xo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("customer time zone")||o.textContent.toLowerCase().includes("time zone")||o.textContent.toLowerCase().includes("timezone"));if(e){let o=e.parentElement;if(o){let a=o.querySelector("sanitized-content");if(a&&a.textContent.trim())return a.textContent.trim();let n=o.querySelector(".data-pair-content")||e.nextElementSibling;if(n&&n.textContent.trim()){let i=n.textContent.trim();if(i&&i!=="---"&&i!=="N/A")return i}}}}catch(t){console.warn("Erro ao capturar Timezone:",t)}return null}async function Jo(){let t="---";try{t=window.location.href.split("/").pop()}catch(e){console.warn("Falha URL:",e)}return t}function Ko(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.toLowerCase().includes("sales program")||o.textContent.toLowerCase().trim()==="program"||o.textContent.toLowerCase().includes("programa"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector('sanitized-content ng-template[debug-id="html-value"]')||o.querySelector("sanitized-content");if(a)return a.textContent.trim();let n=o.querySelector(".data-pair-content")||o.nextElementSibling;if(n)return n.textContent.trim()}}catch(t){console.warn("Erro ao capturar Sales Program:",t)}return""}function Zo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(o=>o.textContent.includes("Language")||o.textContent.includes("Idioma"));if(e){let o=e.closest(".data-pair")||e.parentElement,a=o.querySelector(".data-pair-content")||o.nextElementSibling;if(a)return a.textContent.trim()}}catch(t){console.warn("Erro ao capturar Idioma:",t)}return"N/A"}function Qo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label, .form-label")).find(n=>n.textContent.includes("Speakeasy ID")||n.textContent.includes("SE ID"));if(e){let n=e.closest(".data-pair")||e.parentElement,i=n.querySelector(".data-pair-content")||n.nextElementSibling;if(i&&i.textContent.trim())return i.textContent.trim()}let o=/Speakeasy.*?(P\d{15,25})/i,a=Array.from(document.querySelectorAll("textarea, .preview, .message-body, .notes-content"));for(let n=a.length-1;n>=0;n--){let s=(a[n].value||a[n].innerText||"").match(o);if(s&&s[1])return s[1]}}catch(t){console.warn("Erro ao capturar SE ID:",t)}return"N/A"}async function Fe(){await Et(),Qe||await At();let t="Cliente",e="";try{let f=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(f&&f.nextElementSibling){let y=f.nextElementSibling.innerText.trim();y&&(t=y)}}catch(x){console.warn("Falha Nome:",x)}try{let f=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(f&&f.nextElementSibling){let y=f.nextElementSibling.innerText.trim();y&&(e=y)}}catch(x){console.warn("Falha URL:",x)}let o=await Uo(),a=Vo(),n=Yo(),i=Wo(),s=Xo(),r=await Jo(),l=Ko(),g=Zo(),c=Qo(),p=fe();if(p&&!Ct){let x=p.split("@")[0];try{Ct=await it(x)}catch(f){console.warn("Falha ao carregar perfil do usu\xE1rio:",f)}}return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:a,cid:n,amName:i,timezone:s,agentName:et(),agentEmail:fe(),caseId:r,userProfile:Ct,advName:t,site:e,email:o,salesProgram:l,language:g,seId:c}}var je=null,kt=null,Ne=.3;var ze=localStorage.getItem("cw_sounds_muted")==="true";function He(){if(!je){let t=window.AudioContext||window.webkitAudioContext;t&&(je=new t)}return je&&je.state==="suspended"&&je.resume(),je}function Ut(t){if(kt)return kt;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),a=o.getChannelData(0);for(let n=0;n<e;n++)a[n]=Math.random()*2-1;return kt=o,o}var P={setMuted:t=>{ze=t,localStorage.setItem("cw_sounds_muted",t)},isMuted:()=>ze,playClick:()=>{if(ze)return;let t=He();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Ut(t);let a=t.createBiquadFilter();a.type="highpass",a.frequency.value=4e3;let n=t.createGain();n.gain.setValueAtTime(Ne*.8,e),n.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{if(ze)return;let t=He();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let a=t.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Ne*.1,e+.005),a.gain.linearRampToValueAtTime(0,e+.02),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{if(ze)return;let t=He();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((a,n)=>{let i=t.createOscillator(),s=t.createGain();i.type="sine",i.frequency.value=a,s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(Ne*.6,e+.05),s.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(s),s.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{if(ze)return;let t=He();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Ut(t);let a=t.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(100,e),a.frequency.exponentialRampToValueAtTime(800,e+.2);let n=t.createGain();n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(Ne*.5,e+.05),n.gain.linearRampToValueAtTime(0,e+.25),o.connect(a),a.connect(n),n.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{if(ze)return;let t=He();if(!t)return;let e=t.currentTime,o=t.createOscillator(),a=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),a.gain.setValueAtTime(Ne,e),a.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{if(ze)return;let t=He();if(!t)return;let e=t.currentTime,o=.12,a=t.createOscillator(),n=t.createGain(),i=t.createBiquadFilter();a.type="square",a.frequency.setValueAtTime(400,e),a.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),n.gain.setValueAtTime(Ne*4,e),n.gain.exponentialRampToValueAtTime(.001,e+.1),a.connect(i),i.connect(n),n.connect(t.destination),a.start(e),a.stop(e+.12);let s=t.createOscillator(),r=t.createGain();s.type="sine",s.frequency.setValueAtTime(150,e),s.frequency.exponentialRampToValueAtTime(50,e+.15),r.gain.setValueAtTime(Ne*1.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),s.connect(r),r.connect(t.destination),s.start(e),s.stop(e+.15),[55,55.4,110.5].forEach(g=>{let c=t.createOscillator(),p=t.createGain(),x=t.createBiquadFilter();c.type="sawtooth",c.frequency.value=g,x.type="lowpass",x.frequency.setValueAtTime(30,e),x.frequency.linearRampToValueAtTime(900,e+o+.2),x.frequency.exponentialRampToValueAtTime(40,e+3),p.gain.setValueAtTime(0,e),p.gain.linearRampToValueAtTime(Ne*.6,e+o+.1),p.gain.exponentialRampToValueAtTime(.001,e+3.5),c.connect(x),x.connect(p),p.connect(t.destination),c.start(e),c.stop(e+3.6)})},playNotification:()=>{if(ze)return;let t=He();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(a=>{let n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(a.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Ne*a.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+a.dur),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+a.dur+.1)})},playSwoosh:()=>{P.playGenieOpen()},playReset:()=>{P.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!je)return;let a=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!a||a.contains(o.relatedTarget))return;let n=Date.now();n-t<e||(P.playHover(),t=n)},{passive:!0})}};var Vt=1e4;function Yt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function ee(t,e={}){let o=document.createElement("div"),a=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:a,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?P.playError():P.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function Wt(t,e=null){let o=0,a=0,n=0,i=0,s=e||t;s.style.cursor="grab",s.onmousedown=r;function r(c){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(c.target.tagName)||c.target.closest(".no-drag"))return;c=c||window.event,s.style.cursor="grabbing",t.style.transition="none";let p=t.getBoundingClientRect();t.style.transform="none",t.style.left=p.left+"px",t.style.top=p.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",Vt++,t.style.zIndex=Vt,n=c.clientX,i=c.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=g,document.onmousemove=l}function l(c){c=c||window.event,c.preventDefault(),o=n-c.clientX,a=i-c.clientY,n=c.clientX,i=c.clientY;let p=t.offsetTop-a,x=t.offsetLeft-o,f=16,y=window.innerWidth,m=window.innerHeight,E=t.offsetWidth,_=t.offsetHeight;x=Pe(x,f,y-E-f),p=Pe(p,f,m-_-f),t.style.top=p+"px",t.style.left=x+"px"}function g(){document.onmouseup=null,document.onmousemove=null,s.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var ye={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08),
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Tt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Xt={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Jt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};async function ea(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await ie(200);for(let a=0;a<e.length;a++){let n=e.charAt(a),i=document.createElement("span");i.textContent=n,o&&o.parentNode===t?o.before(i):t.appendChild(i);let s=Math.floor(Math.random()*60)+30;a===0&&(s=150),a>e.length-3&&(s=30),await ie(s)}await ie(600),o&&(o.style.display="none")}async function Ft(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await ie(200);let e=await At(),o=Gt(e),a=t.querySelector("#w-icon"),n=t.querySelector("#p1"),i=t.querySelector("#p2"),s=t.querySelector("#p3"),r=t.querySelector("#p-sextou");a&&(a.innerHTML=o.icon),n&&(n.textContent=o.prefix),s&&(s.textContent=o.suffix),await ie(300);let l=a?a.querySelector("svg"):null;if(l&&(l.style.opacity="1",l.style.transform="scale(1)"),await ie(400),n&&(n.style.opacity="1"),P.playStartup(),i&&await ea(i,o.name),s&&(s.style.opacity="1",s.style.transform="translateY(0)"),o.isFriday&&r){await ie(400),r.style.display="block",r.offsetWidth;let g=r.querySelector(".sextou-badge");g&&(g.style.opacity="1",g.style.transform="scale(1)")}await ie(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await ie(900),t.parentNode&&t.parentNode.removeChild(t)}}function Kt(t){if(!t)return;let e=t.getBoundingClientRect(),o=window.innerWidth,a=window.innerHeight,n=24,i=o-e.width-n,s=a-e.height-n,r=parseFloat(t.style.left)||e.left,l=parseFloat(t.style.top)||e.top,g=Pe(r,n,i),c=Pe(l,n,s);if(g!==r||c!==l){let p=t.style.transition;t.style.transition="left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",t.style.left=`${g}px`,t.style.top=`${c}px`,setTimeout(()=>{t.style.transition=p},300)}}var qe={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function _e(t,e){e.onmousedown=o;function o(a){a.stopPropagation(),a.preventDefault();let n=t.style.transition;t.style.transition="none";let i=a.clientX,s=a.clientY,r=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),l=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),g=i,c=s,p=!1;function x(m){g=m.clientX,c=m.clientY,p||(window.requestAnimationFrame(()=>{f(),p=!1}),p=!0)}function f(){let m=r+(g-i),E=l+(c-s);m>360&&(t.style.width=m+"px"),E>300&&(t.style.height=E+"px")}function y(){document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",y),setTimeout(()=>{t.style.transition=n},50)}document.addEventListener("mousemove",x),document.addEventListener("mouseup",y)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function rt(t){if(!t||t==="N/A"||t==="undefined")return"Data indispon\xEDvel";if(String(t).includes(" | "))return t.split(" | ").map(e=>rt(e.trim())).filter(e=>e!=="Data indispon\xEDvel").join(" | ");try{let e=new Date(t);if(isNaN(e.getTime()))return"Data indispon\xEDvel";let o=e.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}),a=e.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});return`${o} \xE0s ${a}`}catch{return"Data indispon\xEDvel"}}function Zt(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}function Qt(){let t=document.createElement("div");return Object.assign(t.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),t}function eo(){let t=document.createElement("div");return Object.assign(t.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),t}function ve(t,e={}){return new Promise(o=>{let a=Qt(),n=eo(),i=e.danger?"#FF3B30":"#007AFF",s=e.confirmText||(e.danger?"Excluir":"Confirmar");n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${t}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${i}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${s}</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)"});let r=c=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(c)},300)},l=n.querySelector("#cw-conf-cancel"),g=n.querySelector("#cw-conf-ok");[l,g].forEach(c=>c.onmouseenter=()=>P.playHover()),l.onclick=()=>{P.playClick(),r(!1)},g.onclick=()=>{P.playClick(),r(!0)}})}function to(t,e=""){return new Promise(o=>{let a=Qt(),n=eo();n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${t}</div>
            <input type="text" id="cw-prompt-input" value="${e}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,a.appendChild(n),document.body.appendChild(a);let i=n.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{a.style.opacity=1,n.style.transform="scale(1)",setTimeout(()=>i.focus(),100)});let s=g=>{a.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{a.remove(),o(g)},300)},r=n.querySelector("#cw-prompt-cancel"),l=n.querySelector("#cw-prompt-ok");[r,l].forEach(g=>g.onmouseenter=()=>P.playHover()),r.onclick=()=>{P.playClick(),s(null)},l.onclick=()=>{P.playClick(),s(i.value)},i.onkeydown=g=>{g.key==="Enter"&&l.click(),g.key==="Escape"&&r.click()}})}tt();var ta={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},oo={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function ge(t,e,o,a,n,i){let s=document.createElement("div");Object.assign(s.style,ta),Wt(t,s);let r=document.createElement("div");if(Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",backgroundSize:"300% auto",zIndex:"10",opacity:"0.8"}),!document.getElementById("cw-header-anim")){let _=document.createElement("style");_.id="cw-header-anim",_.innerHTML=`
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `,document.head.appendChild(_)}r.style.animation="cw-header-flow 6s linear infinite",s.appendChild(r),n&&(n.googleLine=r);let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center",gap:"12px"});let g=document.createElement("img");g.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(g.style,{width:"20px",height:"20px",pointerEvents:"none"});let c=document.createElement("span");c.textContent=e,l.appendChild(g),l.appendChild(c);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"4px"});let x='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',f='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',y=document.createElement("div");y.innerHTML=x,Object.assign(y.style,oo),y.title="Sobre & Feedback",y.classList.add("no-drag"),y.onmouseenter=()=>{y.style.background="rgba(255,255,255,0.1)",y.style.color="#FFF"},y.onmouseleave=()=>{y.style.color!=="rgb(138, 180, 248)"&&(y.style.background="transparent",y.style.color="#9AA0A6")};let m=document.createElement("div");m.innerHTML=f,Object.assign(m.style,oo),m.title="Fechar",m.classList.add("no-drag","cw-header-close"),m.onmouseenter=()=>{m.style.background="rgba(242, 139, 130, 0.2)",m.style.color="#F28B82"},m.onmouseleave=()=>{m.style.background="transparent",m.style.color="#9AA0A6"},m.onmousedown=_=>_.stopPropagation(),y.onmousedown=_=>_.stopPropagation(),m.onclick=i;let E=oa(t,e,o,a);return y.onclick=_=>{_.stopPropagation(),E.style.opacity==="1"?(E.style.opacity="0",E.style.pointerEvents="none",y.style.color="#9AA0A6",y.style.background="transparent"):(E.style.opacity="1",E.style.pointerEvents="auto",y.style.color="#8AB4F8",y.style.background="rgba(138, 180, 248, 0.1)")},p.appendChild(y),p.appendChild(m),s.appendChild(l),s.appendChild(p),s}function oa(t,e,o,a){let n=document.createElement("div");return Object.assign(n.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),n.innerHTML=`
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
    `,setTimeout(()=>{let i=n.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let s=n.querySelector("#close-help-internal");s&&(s.onmouseover=()=>s.style.backgroundColor="#f8f9fa",s.onmouseout=()=>s.style.backgroundColor="white",s.onclick=()=>{n.style.opacity="0",n.style.pointerEvents="none"})},0),t.appendChild(n),n}var j={blue:"#4285F4",red:"#EA4335",yellow:"#FBBC05",green:"#34A853",primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#34A853",warning:"#FBBC05",error:"#EA4335"},me={small:"8px",medium:"12px",large:"20px",pill:"100px"},Re={subtle:"0 1px 3px rgba(0,0,0,0.08)",card:"0 4px 12px rgba(0,0,0,0.05)",elevated:"0 12px 24px rgba(0,0,0,0.08)",apple:"0 20px 40px rgba(0,0,0,0.12)"},de="cubic-bezier(0.34, 1.56, 0.64, 1)",aa={width:"100%",padding:"14px 16px",borderRadius:me.medium,border:`1.5px solid ${j.border}`,backgroundColor:j.bgInput,fontSize:"14px",color:j.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`all 0.3s ${de}`,outline:"none"},qa={...aa,minHeight:"120px",resize:"vertical",lineHeight:"1.6"},_a={fontSize:"12px",fontWeight:"700",color:j.textSub,textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px 0"},Da={display:"block",fontSize:"14px",fontWeight:"600",color:j.text,marginBottom:"10px",marginTop:"20px"},Ma={fontSize:"12px",color:j.warning,marginTop:"8px",display:"flex",alignItems:"center",gap:"8px",fontWeight:"500"},It={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:j.primary},Na={display:"flex",alignItems:"center",marginBottom:"12px",fontSize:"14px",fontWeight:"500",color:j.text,cursor:"pointer",padding:"16px 20px",backgroundColor:j.surface,border:`1px solid ${j.border}`,borderRadius:me.large,transition:`all 0.4s ${de}`,userSelect:"none",boxShadow:Re.subtle},za={padding:"14px 28px",color:"#fff",backgroundColor:j.primary,border:"none",borderRadius:me.pill,fontSize:"15px",fontWeight:"600",cursor:"pointer",boxShadow:"0 4px 14px 0 rgba(26,115,232,0.39)",transition:`all 0.25s ${de}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",outline:"none"},Ra={width:"100%",padding:"12px",background:"#FFFFFF",border:`1.5px dashed ${j.primary}`,color:j.primary,borderRadius:me.medium,cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"16px",transition:`all 0.25s ${de}`},Ba={background:"transparent",border:`1px solid ${j.border}`,borderRadius:me.pill,color:j.textSub,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",margin:"20px auto",transition:`all 0.25s ${de}`};function ao(t,e){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,ye,{right:"100px",width:"520px",height:"740px",display:"flex",flexDirection:"column",transition:`width 0.4s ${de}, height 0.4s ${de}, transform 0.4s ${de}, opacity 0.3s ease`,borderRadius:me.large,boxShadow:Re.apple,border:"1px solid rgba(255, 255, 255, 0.7)"});let a={popup:o,googleLine:null},n=ge(o,"Case Notes",t,"Gera notas padronizadas com excel\xEAncia visual.",a,e);o.appendChild(n);let i=document.createElement("div");i.className="cw-popup-content",Object.assign(i.style,{padding:"24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"24px",background:j.surface}),o.appendChild(i);let s=document.createElement("div");s.textContent="created by lucaste@",Object.assign(s.style,Jt,{padding:"16px 24px",borderTop:`1px solid ${j.bgInput}`,color:j.textSub,fontSize:"11px",marginTop:"auto",fontWeight:"500",letterSpacing:"0.5px"}),o.appendChild(s);let r=document.createElement("div");return Object.assign(r.style,qe),r.className="no-drag",o.appendChild(r),_e(o,r),na(),{popup:o,content:i,header:n,animRefs:a,credit:s}}function na(){if(document.getElementById("cw-notes-refactor-styles"))return;let t=document.createElement("style");t.id="cw-notes-refactor-styles",t.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100% !important;
            padding: 12px 16px !important;
            border-radius: ${me.medium} !important;
            border: 1.5px solid ${j.border} !important;
            font-size: 14px !important;
            font-family: 'Google Sans', Roboto, sans-serif !important;
            transition: all 0.2s ${de} !important;
            box-sizing: border-box !important;
            background: ${j.bgInput} !important;
            color: ${j.text} !important;
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
            transition: border-color 0.2s ${de}, background-color 0.2s ${de}, box-shadow 0.2s ${de} !important;
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
            border-radius: ${me.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${de};
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
            border-radius: ${me.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${de};
        }
        .cw-btn-secondary:hover {
            background: ${j.bgInput};
            border-color: #bdc1c6;
            color: ${j.text};
        }
    `,document.head.appendChild(t)}var Ie={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"Selecione",substatus:"Substatus:",select_substatus:"Selecione o Status",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",limpar:"Limpar",preencher_email_automaticamente:"Preencher email automaticamente?",gostaria_de_adicionar_uma_task:"Gostaria de adicionar uma task",rascunhos_salvos:"Rascunhos Salvos",nenhum_rascunho:"Nenhum rascunho guardado",guardar:"Guardar",acesso_rapido:"Acesso R\xE1pido",buscar_catalogo:"Buscar no cat\xE1logo...",selecione_tarefas:"Selecione tarefas para ver os campos.",utilizou_tag_support:"Utilizou o Tag Support para criar/verificar?",motivo_ts:"Qual foi o Motivo?",lembre_preencher_form:"Lembre-se de preencher o Form!",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",ts_disclaimer:"N\xE3o s\xE3o necess\xE1rios os screenshots em casos de convers\xF5es criadas/verificadas pelo Tag Support",incluir_mesmo_assim:"Incluir mesmo assim",ajuda_scenarios:"Como usar os Cen\xE1rios?",ajuda_scenarios_desc:"Os cen\xE1rios preenchem automaticamente v\xE1rios campos da nota. Clique em um chip para aplicar. Voc\xEA pode combinar v\xE1rios cen\xE1rios (ex: Instala\xE7\xE3o GTM + WhatsApp).",ts_output_disclaimer:"Tag criada/verificada pelo Tag Support, assim como a nota adicionada autom\xE1ticamente ao caso indica. N\xE3o incluo os screenshots, de acordo com orienta\xE7\xE3o do Win Criteria.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F Anunciante consentiu com a grava\xE7\xE3o?",sim:"Sim",nao:"N\xE3o",pronto_comecar:"Pronto para come\xE7ar?",selecione_status_ajuda:"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Task(s) solicitada(s):",passos_executados:"\u{1F463} Seguimos com os passos:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 D\xFAvidas do anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tasks implementadas na call:",proximos_passos:"\u{1F680} Pr\xF3ximos passos (Acompanhamento):",consideracoes:"\u{1F4A1} Considera\xE7\xF5es adicionais:",contexto_call:"\u{1F4AC} Contexto/O que foi feito:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Minha A\xE7\xE3o:",dia:"\u{1F4C5} Dia do Follow-up (se aplic\xE1vel):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Data do reagendamento:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evid\xEAncias de Contato",ligacao_1:"Liga\xE7\xE3o 1",ligacao_2:"Liga\xE7\xE3o 2",mensagem_am:"Mensagem para AM"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"Seleccione",substatus:"Subestado:",select_substatus:"Seleccione el Estado",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",limpar:"Limpiar",preencher_email_automaticamente:"\xBFRellenar correo autom\xE1ticamente?",gostaria_de_adicionar_uma_task:"Me gustar\xEDa agregar una tarea",rascunhos_salvos:"Borradores Guardados",nenhum_rascunho:"No hay borradores guardados",guardar:"Guardar",acesso_rapido:"Acceso R\xE1pido",buscar_catalogo:"Buscar en el cat\xE1logo...",selecione_tarefas:"Seleccione tareas para ver los campos.",utilizou_tag_support:"\xBFUtiliz\xF3 Tag Support para crear/verificar?",motivo_ts:"\xBFCu\xE1l fue el motivo?",lembre_preencher_form:"\xA1Recuerde completar el Formulario!",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",ts_disclaimer:"No se requieren capturas de pantalla en casos de conversiones creadas/verificadas por Tag Support",incluir_mesmo_assim:"Incluir de todos modos",ajuda_scenarios:"\xBFC\xF3mo usar los Escenarios?",ajuda_scenarios_desc:"Los escenarios completan autom\xE1ticamente varios campos de la nota. Haga clic en un chip para aplicar. Puede combinar varios escenarios (ej: Instalaci\xF3n GTM + WhatsApp).",ts_output_disclaimer:"Etiqueta creada/verificada por Tag Support, como indica la nota a\xF1adida autom\xE1ticamente al caso. No incluyo las capturas de pantalla, seg\xFAn la gu\xEDa de Win Criteria (con un enlace a https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A2:A8)",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\u23FA\uFE0F \xBFEl anunciante consinti\xF3 la grabaci\xF3n?",sim:"S\xED",nao:"No",pronto_comecar:"\xBFListo para empezar?",selecione_status_ajuda:"Seleccione un estado y subestado para<br>comenzar su nota t\xE9cnica.",speakeasy_id:"\u{1F194} Speakeasy ID:",on_call:"\u{1F4DE} On Call signaled on time?",tasks_solicitadas:"\u{1F3AF} Tarea(s) solicitada(s):",passos_executados:"\u{1F463} Pasos ejecutados:",resultado:"\u{1F3C6} Resultado:",duvidas:"\u2753 Dudas del anunciante:",problemas:"\u26A0\uFE0F Problema inicial:",resolucoes:"\u2705 Resoluciones/Explicaciones:",gtm_ga4_verificado:"\u{1F6E1}\uFE0F GTM/GA4 Verificado:",tasks_implementadas_call:"\u{1F6E0}\uFE0F Tareas implementadas en la call:",proximos_passos:"\u{1F680} Pr\xF3ximos pasos:",consideracoes:"\u{1F4A1} Consideraciones adicionales:",contexto_call:"\u{1F4AC} Contexto/Qu\xE9 se hizo:",impedimento_cliente:"\u{1F6A7} Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"\u{1F468}\u200D\u{1F4BB} Mi Acci\xF3n:",dia:"\u{1F4C5} D\xEDa de Follow-up (si aplica):",screenshots:"\u{1F4F8} Screenshots:",comentarios:"\u{1F4AC} OnCall Comments:",motivo_reagendamento:"\u{1F4AC} OnCall Comments:",data_reagendamento:"\u{1F4C5} Fecha de reprogramaci\xF3n:",multiple_cids:"\u{1F4C2} Multiple CIDs:",reason_comments:"\u{1F4CC} Reason/Comments:",tags_implemented:"\u{1F6E0}\uFE0F Tag Implemented:",screenshots_list:"\u{1F4F8} Screenshots:",label_substatus:"\u{1F4CB} Substatus:",evidencias_contato:"Evidencias de Contacto",ligacao_1:"Llamada 1",ligacao_2:"Llamada 2",mensagem_am:"Mensaje para AM"}},Le={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},De={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Caso Reagendado."}},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","MOTIVO_REAGENDAMENTO","DATA_REAGENDAMENTO","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Reagendamento aceit\xE1vel."}},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","DIA","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Aguardando Valida\xE7\xF5es no Google Ads."}},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","CONTEXTO_CALL","TASKS_SOLICITADAS","IMPEDIMENTO_CLIENTE","MINHA_ACAO","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","COMENTARIOS","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"]},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","TASKS_SOLICITADAS","TASKS_IMPLEMENTADAS_CALL","PASSOS_EXECUTADOS","RESULTADO","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Task implementada com sucesso."}},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","DUVIDAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para tirar d\xFAvidas do anunciante."}},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,templateFields:["SPEAKEASY_ID","ON_CALL","label_substatus","REASON_COMMENTS","PROBLEMAS","RESOLUCOES","PROXIMOS_PASSOS","CONSIDERACOES","GTM_GA4_VERIFICADO","TAGS_IMPLEMENTED","SCREENSHOTS_LIST","MULTIPLE_CIDS"],fieldPrefixes:{REASON_COMMENTS:"Consultoria utilizada para testar e solucinar problemas da convers\xE3o."}},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,templateFields:["SPEAKEASY_ID","label_substatus","REASON_COMMENTS","COMENTARIOS"],customFooter:"Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Je={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},Ke=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],dt=["CONSIDERACOES","COMENTARIOS"],pt={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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

Irei solicitar descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var no="cw-automation-styles";if(!document.getElementById(no)){let t=document.createElement("style");t.id=no,t.innerHTML=`
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
    `,document.head.appendChild(t)}function io(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function ut(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica..."),await Et();let e=document.getElementById(t),o="";io(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let a=document.querySelector('material-button[debug-id="dock-item-case-log"]');a&&!a.classList.contains("selected")&&(Xe(a),await ie(1200));let n=document.querySelector("search-filter dropdown-button .button");if(n&&!(n.innerText||"").includes("All")){Xe(n),await ie(600);let x=document.querySelector('material-checkbox[debug-id="check-all-box"]');x&&x.getAttribute("aria-checked")!=="true"&&(Xe(x),await ie(300));let f=document.querySelector('material-button[debug-id="apply-filter"]');f&&(Xe(f),await ie(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await ie(500));let s=Array.from(document.querySelectorAll(".message-header"));for(let p=s.length-1;p>=0;p--){let x=s[p],f=x.querySelector("i.material-icons-extended"),y=f&&f.innerText.trim()==="phone_in_talk",m=x.innerText||"",E=m.includes("Agent joined")||m.includes("outbound-call")||m.includes("Speakeasy");if(y||E){x.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",x),e&&(e.placeholder="Lendo mensagem..."),Xe(x),await ie(1e3));break}}let l=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),g=/Speakeasy.*?(P\d{15,25})/i,c=null;for(let p=l.length-1;p>=0;p--){let x=l[p];if(x.offsetParent===null)continue;let f=(x.innerText||"").match(g);if(f&&f[1]){c=f[1];break}}if(e)if(c){try{await navigator.clipboard.writeText(c)}catch{}e.tagName==="INPUT"||e.tagName==="TEXTAREA"?e.value=c:e.textContent=c,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),P.playSuccess(),ee(`ID Localizado: ${c}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else P.playError(),ee("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(a){console.error("Erro na automa\xE7\xE3o:",a),ee("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),io(!1)}}function so(t){t.dataset.bulletEnabled!=="true"&&(t.dataset.bulletEnabled="true",(t.value.trim()===""||t.value.trim()==="\u2022")&&(t.value="\u2022 "),t.addEventListener("keydown",function(e){let o=this.selectionStart,a=this.selectionEnd,n=this.value,i=n.lastIndexOf(`
`,o-1)+1,s=n.substring(i,o);if(e.key==="Enter"){e.preventDefault();let r=s.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(s.trim()==="\u2022"){this.value=n.substring(0,i)+`
`+n.substring(a),this.selectionStart=this.selectionEnd=i+1;return}let l=`
`+r;this.value=n.substring(0,o)+l+n.substring(a),this.selectionStart=this.selectionEnd=o+l.length}else if(e.key==="Tab")e.preventDefault(),e.shiftKey?s.startsWith("  ")&&(this.value=n.substring(0,i)+s.substring(2)+n.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=n.substring(0,i)+"  "+s+n.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(e.key==="Backspace"&&o===a&&o>0){let r=n.substring(0,o);r.endsWith("\u2022 ")?(e.preventDefault(),this.value=r.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2):r.endsWith("  ")&&s.trim().startsWith("\u2022")&&(e.preventDefault(),this.value=r.substring(0,o-2)+n.substring(a),this.selectionStart=this.selectionEnd=o-2)}}))}function Lt(t,e,o){if(e.innerHTML="",!!De[t]&&(o.activeFields.forEach(n=>{if(["TAGS_IMPLEMENTED","SCREENSHOTS_LIST","CONSENTIU_GRAVACAO","CASO_PORTUGAL","label_substatus"].includes(n))return;let i=`field-${n}`,s=document.createElement("label"),r=p=>Ie[o.currentLang]?.[p]||Ie.pt?.[p]||p;s.textContent=r(n.toLowerCase())!==n.toLowerCase()?r(n.toLowerCase()):n.replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase())+":",Object.assign(s.style,{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px",fontWeight:"700",color:j.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let l=document.createElement("span");if(l.textContent=s.textContent,s.innerHTML="",s.appendChild(l),n==="SPEAKEASY_ID"){let p=document.createElement("button");p.innerHTML="\u2728 Auto Busca",p.style.cssText=`font-size: 11px; font-weight: 700; color: ${j.primary}; background-color: ${j.primaryBg}; border: none; border-radius: ${me.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${de};`,p.onmouseenter=()=>p.style.backgroundColor="#d2e3fc",p.onmouseleave=()=>p.style.backgroundColor=j.primaryBg,p.onclick=x=>{x.preventDefault(),ut(i)},s.appendChild(p)}let g=document.createElement("button");g.innerHTML="\u2715",g.style.cssText=`font-size: 14px; background: ${j.bgInput}; border: none; color: ${j.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${de};`,g.onmouseenter=()=>{g.style.background=j.error,g.style.color=j.surface},g.onmouseleave=()=>{g.style.background=j.bgInput,g.style.color=j.textSub},g.onclick=async p=>{p.preventDefault(),await ve(`Tem certeza que deseja remover o campo "${l.textContent.replace(":","")}"?`)&&(o.removeField(n),Lt(t,e,o))},s.appendChild(g);let c;Ke.includes(n)?(c=document.createElement("textarea"),c.classList.add("bullet-textarea","cw-textarea"),c.placeholder="Utilize marcadores para detalhar...",so(c)):dt.includes(n)?(c=document.createElement("textarea"),c.classList.add("cw-textarea"),c.placeholder="Descreva as considera\xE7\xF5es..."):(c=document.createElement("input"),c.type="text",c.classList.add("cw-input")),c.id=i,c.value=o.formData[i]||"",c.addEventListener("input",p=>o.updateField(i,p.target.value)),e.appendChild(s),e.appendChild(c)}),o.activeFields.includes("CONSENTIU_GRAVACAO"))){let n=r=>Ie[o.currentLang]?.[r]||Ie.pt?.[r]||r,i=document.createElement("label");i.textContent=n("consentiu_gravacao"),Object.assign(i.style,{display:"block",fontSize:"13px",fontWeight:"700",color:j.textSub,marginBottom:"8px",marginTop:"24px",textTransform:"uppercase",letterSpacing:"0.5px"});let s=document.createElement("select");s.className="cw-select",s.innerHTML=`
            <option value="false">${n("nao")}</option>
            <option value="true">${n("sim")}</option>
        `,s.value=o.consent?"true":"false",s.onchange=()=>o.setConsent(s.value==="true"),e.appendChild(i),e.appendChild(s)}}function Ot(t,e,o,a=null){let n=t.currentSubStatus;if(!n)return null;let i=De[n],s=Ie[t.currentLang]||Ie.pt,r=c=>s[c]||Ie.pt?.[c]||c,l='style="margin-bottom: 12px; padding-left: 30px;"',g="";if(t.activeFields.forEach(c=>{let p=r(c.toLowerCase()),x="N/A";if(c==="label_substatus")p=r("label_substatus"),x=i.name;else if(c==="TAGS_IMPLEMENTED"){p=r("tags_implemented");let f=[];e.getCheckedElements().forEach(m=>{let E=m.value,_=Le[E],F=m.count||1,q=E==="ads_conversion_tracking"||E==="ads_enhanced_conversions";t.tagSupportUsed&&q&&!t.forcedScreenshots.has(E)?f.push(`${_.name} - ${r("ts_output_disclaimer")}`):f.push(F>1?`${_.name} (x${F})`:_.name)}),x=f.join(", ")||"N/A"}else if(c==="SCREENSHOTS_LIST"){p=r("screenshots_list");let f="",y=e.screenshotsElement;y&&Array.from(y.querySelectorAll('input[id^="name-"]')).forEach(E=>{let _=E.value,F=E.closest(".cw-screen-card");if(F){let q=F.querySelectorAll('input[id^="screen-"]'),$=!1,W="";q.forEach(ae=>{let I=ae.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",H=ae.value.trim();H&&(W+=`<li>${I} - ${H}</li>`,$=!0)}),$&&(f+=`<div style="margin-bottom: 8px;"><b>${_}</b><ul ${l}>${W}</ul></div>`)}}),x=f||"N/A"}else if(c==="CASO_PORTUGAL")p=r("caso_portugal"),x=r("sim");else if(c==="CONSENTIU_GRAVACAO")p=r("consentiu_gravacao"),x=t.consent?r("sim"):r("nao");else{let f=`field-${c}`,y=t.formData[f],m="";if(i.fieldPrefixes&&i.fieldPrefixes[c]&&(m=i.fieldPrefixes[c]+" "),y&&y.trim()!==""&&y.trim()!=="\u2022"){let E=y.trim();if(Ke.includes(c)){let _=E.split(`
`).map(F=>F.trim()).filter(F=>F!==""&&F!=="\u2022").map(F=>F.startsWith("\u2022 ")?F.substring(2):F).map(F=>`<li>${F}</li>`).join("");x=_?`${m}<ul ${l}>${_}</ul>`:"N/A"}else dt.includes(c)?x=m+E.split(`
`).filter(_=>_.trim()!=="").map(_=>`<p style="margin: 0 0 8px 0;">${_}</p>`).join(""):x=m+E}else m&&(x=m.trim())}g+=`<b>${p}</b><br>${x}<br><br>`}),a){let c="";a.l1&&(c+=`<li>${r("ligacao_1")}: ${a.l1}</li>`),a.l2&&(c+=`<li>${r("ligacao_2")}: ${a.l2}</li>`),a.msg&&(c+=`<li>${r("mensagem_am")}: ${a.msg}</li>`),c&&(g+=`<b>${r("evidencias_contato")}</b><br><ul ${l}>${c}</ul><br>`)}if(i.customFooter&&(g+=`${i.customFooter}<br><br>`),o?.getOutput){let c=o.getOutput();c&&(g+=`${c}<br><br>`)}return g+="<i>Nota criada atrav\xE9s do Cases Wizard.</i>",g.replace(/(<br>\s*){3,}/g,"<br><br>").trim()}function ro(t){let e=document.createElement("div");e.className="cw-step-scenarios";let o="Passe o mouse sobre um cen\xE1rio para visualizar o texto...",a=document.createElement("div");Object.assign(a.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"44px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"});let i=document.createElement("span");i.style.transition="opacity 0.2s ease, transform 0.2s ease",i.textContent=o,n.appendChild(i);let s=new Set,r=null;return e.render=(l,g)=>{s.clear();let c=Object.entries(pt).filter(([p,x])=>{let f=!x.type||x.type==="all"||x.type===g,y=!1;return l.startsWith("NI_")?y=p.includes("-ni-")||p.includes("attempted"):l.startsWith("SO_")?y=p.includes("gtm")||p.includes("whatsapp")||p.includes("form")||p.includes("ecw4")||p.includes("ga4")||p.includes("-so-"):l.startsWith("AS_")?y=p.includes("-as-"):l.startsWith("IN_")?y=p.includes("-in-"):l.startsWith("DC_")&&(y=p.includes("-dc-")),f&&y});a.innerHTML="",c.forEach(([p,x])=>{let f=document.createElement("div"),y=p.replace("quickfill-","").replace(/-/g," ");f.textContent=y,f.dataset.id=p,Object.assign(f.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"});let m=x["field-REASON_COMMENTS"]||x["field-CONTEXTO_CALL"]||p;f.onmouseenter=()=>{r&&clearTimeout(r),s.has(p)||(f.style.background="#f1f3f4"),i.style.opacity="0",i.style.transform="translateY(5px)",r=setTimeout(()=>{i.textContent=m.substring(0,120)+(m.length>120?"...":""),i.style.opacity="1",i.style.transform="translateY(0)"},50)},f.onmouseleave=()=>{r&&clearTimeout(r),s.has(p)||(f.style.background="#ffffff"),r=setTimeout(()=>{s.size===0&&(i.style.opacity="0",setTimeout(()=>{i.textContent=o,i.style.opacity="1"},50))},100)},f.onclick=()=>{P.playClick();let E=!s.has(p);E?(s.add(p),f.style.background="#e8f0fe",f.style.borderColor="#1a73e8",f.style.color="#1967d2"):(s.delete(p),f.style.background="#ffffff",f.style.borderColor="#dadce0",f.style.color="#3c4043"),t(p,E)},a.appendChild(f)}),c.length===0?e.style.display="none":e.style.display="block"},e.appendChild(a),e.appendChild(n),e}var se={bg:j.bgInput,white:j.surface,border:j.border,textMain:j.text,textSub:j.textSub,blue:j.blue,blueLight:j.primaryBg,brands:{ads:{id:"ads",label:"Google Ads",color:j.blue,bg:j.primaryBg,icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:j.yellow,bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:j.primary,bg:j.primaryBg,icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:j.green,bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Ge={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function lo(t,e,o){let a={},n="implementation";o&&o.subscribe(()=>{W(),ae()});function i(B){let I=B.toLowerCase();return I.includes("ads")||I.includes("conversion")||I.includes("remarketing")?se.brands.ads:I.includes("ga4")||I.includes("analytics")?se.brands.ga4:I.includes("gtm")||I.includes("tag manager")||I.includes("container")?se.brands.gtm:I.includes("merchant")||I.includes("shopping")||I.includes("feed")?se.brands.gmc:se.brands.default}let s=Object.entries(Le).filter(([B,I])=>I.popular),r={};Object.entries(Le).forEach(([B,I])=>{if(I.popular)return;let H=i(I.name);r[H.label]||(r[H.label]={brand:H,tasks:[]}),r[H.label].tasks.push({key:B,...I})});let l="cw-zen-tasks";if(!document.getElementById(l)){let B=document.createElement("style");B.id=l,B.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${se.font}; background: ${se.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${se.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${se.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${se.white}; 
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
                font-size: 12px; font-weight: 500; color: ${se.textMain}; line-height: 1.2; 
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
                color: ${se.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${se.border}; border-radius: 10px; background: ${se.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${se.blue}; box-shadow: 0 0 0 3px ${se.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${se.border}; border-radius: 10px; background: ${se.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${se.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${se.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${se.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${se.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${se.blueLight}; }
            .cw-task-item.ts-success { background: #F0FDF4 !important; border-left: 4px solid #22C55E; }
            .cw-task-item.ts-success .cw-task-label { color: #166534 !important; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${se.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${se.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${se.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${se.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${se.border};
                border-bottom-left-radius: 11px;
                border-bottom-right-radius: 11px;
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${se.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${se.textMain}; }
            
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
                font-family: ${se.font}; font-size: 15px; font-weight: 600; color: ${se.textMain};
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
                border-color: ${se.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${se.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${se.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${se.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 11px; font-weight: 700; color: ${se.textSub};
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
        `,document.head.appendChild(B)}let g=document.createElement("div");g.className="cw-zen-container";let c=document.createElement("div");Object.assign(c.style,{display:"none"});let p=document.createElement("div");p.className="cw-screens-container",c.appendChild(p),g.innerHTML=`
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
    `;let x=g.querySelector(".cw-hero-grid"),f=g.querySelector(".cw-acc-container"),y=g.querySelector(".cw-results-container"),m=g.querySelector(".cw-search-input"),E=g.querySelector(".cw-status-bar"),_=g.querySelector(".cw-status-text"),F=g.querySelector(".cw-footer-icons");s.forEach(([B,I])=>{let H=i(I.name),K=document.createElement("div");K.className="cw-hero-card",K.id=`hero-${B}`,K.style.setProperty("--hero-color",H.color),K.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Ge[H.icon]}</div>
                <div class="cw-hero-label">${I.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,K.onclick=G=>{if(G.target.closest(".cw-step-btn"))return;let D=a[B]?a[B].count:0;$(B,D>0?-D:1,I)},K.querySelector(".minus").onclick=()=>$(B,-1,I),K.querySelector(".plus").onclick=()=>$(B,1,I),K.dataset.color=H.color,x.appendChild(K)});function q(B,I){let H=i(I.name),K=document.createElement("div");return K.className="cw-task-item",K.dataset.id=B,K.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${H.bg}; color:${H.color}">
                    ${Ge[H.icon]||Ge.default}
                </div>
                <div class="cw-task-label">${I.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,K.onclick=G=>{if(G.target.closest(".cw-step-btn"))return;let D=a[B]?a[B].count:0;$(B,D>0?-D:1,I)},K.querySelector(".minus").onclick=()=>$(B,-1,I),K.querySelector(".plus").onclick=()=>$(B,1,I),K}Object.entries(r).forEach(([B,I])=>{let H=document.createElement("div");H.className="cw-acc-group";let K=document.createElement("div");K.className="cw-acc-header",K.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${I.brand.color}"></div>
                ${B}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,K.onclick=()=>{f.querySelectorAll(".cw-acc-group.open").forEach(D=>{D!==H&&D.classList.remove("open")}),H.classList.toggle("open")};let G=document.createElement("div");G.className="cw-acc-body",I.tasks.forEach(D=>{let U=q(D.key,D);G.appendChild(U)}),H.appendChild(K),H.appendChild(G),f.appendChild(H)});function $(B,I,H){a[B]||(a[B]={count:0,data:H,brand:i(H.name)}),a[B].count+=I,a[B].count<=0&&delete a[B],W(),ae(),t&&t()}function W(){let B=o.tagSupportUsed;s.forEach(([D])=>{let U=x.querySelector(`#hero-${D}`);if(!U)return;let h=a[D];h?(U.classList.add("active"),U.querySelector(".cw-step-val").textContent=h.count,U.querySelector(".cw-step-val").style.color=U.dataset.color,B&&(D==="ads_conversion_tracking"||D==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(D)?U.classList.add("ts-success"):U.classList.remove("ts-success")):(U.classList.remove("active"),U.classList.remove("ts-success"))}),g.querySelectorAll(".cw-task-item").forEach(D=>{let U=D.dataset.id,h=a[U];h?(D.classList.add("selected"),D.querySelector(".cw-step-val").textContent=h.count,B&&(U==="ads_conversion_tracking"||U==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(U)?D.classList.add("ts-success"):D.classList.remove("ts-success")):(D.classList.remove("selected"),D.classList.remove("ts-success"))});let H=Object.keys(a),K=0,G=[];if(H.forEach(D=>{let U=a[D];K+=U.count;for(let h=0;h<U.count;h++)G.length<6&&G.push(U.brand)}),K>0){E.classList.add("visible");let D=K>1?"A\xE7\xF5es":"A\xE7\xE3o",U=K>1?"definidas":"definida";_.textContent=`${K} ${D} ${U}`,F.innerHTML="",G.forEach(h=>{let w=document.createElement("div");w.className="cw-mini-icon",w.innerHTML=Ge[h.icon]||Ge.default;let C=w.querySelector("svg");C&&(C.style.width="14px",C.style.height="14px"),F.appendChild(w)})}else E.classList.remove("visible")}m.addEventListener("input",B=>{let I=B.target.value.toLowerCase();if(I.length>0){f.style.display="none",y.style.display="block",y.innerHTML="";let H=!1;Object.entries(Le).forEach(([K,G])=>{if(G.name.toLowerCase().includes(I)){H=!0;let D=q(K,G);a[K]&&(D.classList.add("selected"),D.querySelector(".cw-step-val").textContent=a[K].count),y.appendChild(D)}}),H||(y.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else f.style.display="block",y.style.display="none"});function ae(){p.innerHTML="";let B=Object.keys(a),I=!1;if(B.length===0){p.innerHTML=`<div class="cw-empty-state">${e("selecione_tarefas")}</div>`,c.style.display="none";return}let H=o.tagSupportUsed,K=document.createElement("div");K.className="cw-info-banner",K.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,p.appendChild(K),B.forEach(G=>{let D=a[G].data,U=a[G].count,h=a[G].brand,C=H&&(G==="ads_conversion_tracking"||G==="ads_enhanced_conversions")&&!o.forcedScreenshots.has(G),M=o.screenshotMode||"implementation",Z=D.screenshots?.[M]||[];if(Z.length>0||C){I=!0;for(let oe=1;oe<=U;oe++){let O=document.createElement("div");O.className="cw-screen-card",C&&O.classList.add("ts-success"),O.style.setProperty("--brand-color",h.color),O.style.setProperty("--brand-bg",h.bg),O.style.setProperty("--brand-shadow",h.color+"40");let R=document.createElement("div");R.className="cw-card-header";let z=document.createElement("div");z.className="cw-card-icon",z.innerHTML=Ge[h.icon]||Ge.default;let Q=document.createElement("div");Q.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let d=document.createElement("input");d.className="cw-card-title-input",d.id=`name-${G}-${oe}`,d.value=`${D.name}${U>1?" #"+oe:""}`,d.title="Clique para renomear esta task";let v=document.createElement("span");if(v.className="cw-edit-hint",v.innerHTML="\u270E Renomear",Q.appendChild(d),Q.appendChild(v),R.appendChild(z),R.appendChild(Q),O.appendChild(R),C){let k=document.createElement("div");k.className="cw-ts-disclaimer-box",k.innerHTML=`
                <span>${e("ts_disclaimer")}</span>
                <button class="cw-btn-ts-force">${e("incluir_mesmo_assim")}</button>
            `,k.querySelector("button").onclick=()=>{o.toggleForcedScreenshot(G,!0)},O.appendChild(k)}else Z.forEach((k,b)=>{let S=document.createElement("div");S.className="cw-input-group";let A=document.createElement("label");A.className="cw-input-label",A.textContent=k;let T=document.createElement("input");T.className="cw-input-field",T.id=`screen-${G}-${oe}-${b}`,T.placeholder="Cole o link aqui...",T.setAttribute("autocomplete","off"),T.addEventListener("input",()=>{T.value.trim().length>5?T.classList.add("filled"):T.classList.remove("filled")});let u=document.createElement("div");u.className="cw-input-check",u.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',S.appendChild(A),S.appendChild(T),S.appendChild(u),O.appendChild(S)});p.appendChild(O)}}}),c.style.display=I?"block":"none"}return{selectionElement:g,screenshotsElement:c,updateSubStatus:()=>ae(),getCheckedElements:()=>Object.keys(a).map(B=>({value:B,count:a[B].count})),setTaskCount:(B,I)=>{a[B]&&delete a[B],I>0&&Le[B]&&$(B,I,Le[B])},toggleTask:(B,I=!0)=>{let H=a[B];I&&!H?$(B,1,Le[B]):!I&&H&&$(B,-H.count,Le[B])},setLanguage:B=>{e=B;let I=g.querySelector(".js-hero-title");I&&(I.textContent=e("acesso_rapido"));let H=g.querySelector(".cw-search-input");H&&(H.placeholder=e("buscar_catalogo")),ae()},reset:()=>{for(let B in a)delete a[B];m.value="",f.style.display="block",y.style.display="none",W(),ae()}}}var ia={marginTop:"24px",marginBottom:"16px",padding:"20px",background:"#fff9e6",borderRadius:"20px",border:"1.5px solid #fbbc0540",display:"none",boxShadow:"0 4px 12px rgba(251, 188, 5, 0.05)"},sa={fontSize:"12px",color:"#b06000",marginTop:"8px",lineHeight:"1.4"},ra={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1.5px solid #dadce0",fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",background:"#fff"},la={display:"flex",gap:"20px",marginBottom:"12px"};function co(t){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,ia);let o=document.createElement("label");o.className="js-ts-main-label",o.textContent=t("utilizou_tag_support"),Object.assign(o.style,Tt,{marginTop:"0"});let a=document.createElement("div");Object.assign(a.style,la);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,It);let i=document.createElement("label");i.textContent="Sim";let s=document.createElement("div");Object.assign(s.style,{display:"flex",alignItems:"center"}),s.appendChild(n),s.appendChild(i);let r=document.createElement("input");r.type="radio",r.name="ts_usage_mod",r.value="N\xE3o",r.checked=!0,Object.assign(r.style,It);let l=document.createElement("label");l.textContent="N\xE3o";let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center"}),g.appendChild(r),g.appendChild(l),a.appendChild(s),a.appendChild(g);let c=document.createElement("div");c.style.display="block";let p=document.createElement("label");p.className="js-ts-reason-label",p.textContent=t("motivo_ts"),Object.assign(p.style,Tt,{fontSize:"12px"});let x=document.createElement("input");x.type="text",Object.assign(x.style,ra);let f=document.createElement("div");f.className="js-ts-warning",f.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`,Object.assign(f.style,sa),c.appendChild(p),c.appendChild(x),c.appendChild(f),e.appendChild(o),e.appendChild(a),e.appendChild(c),n.onchange=()=>{c.style.display="none",Promise.resolve().then(()=>(tt(),ct)).then(F=>F.notesState.setTagSupportUsed(!0))},r.onchange=()=>{c.style.display="block",Promise.resolve().then(()=>(tt(),ct)).then(F=>F.notesState.setTagSupportUsed(!1))};function y(F,q){if(e.style.display="none",!F||!q||q.length===0)return;q.some(W=>W==="ads_conversion_tracking"||W==="ads_enhanced_conversions")?e.style.display="block":(_(),Promise.resolve().then(()=>(tt(),ct)).then(W=>W.notesState.setTagSupportUsed(!1)))}function m(){if(e.style.display==="none")return"";let F=`<br><b>Utilizou Tag Support?</b> ${n.checked?"\u2705 Sim":"\u274C N\xE3o"}`;return r.checked&&x.value.trim()!==""&&(F+=`<br><b>Motivo:</b> ${x.value}`),F+="<br>",F}function E(F){t=F,o.textContent=t("utilizou_tag_support"),p.textContent=t("motivo_ts"),f.innerHTML=`\u26A0\uFE0F <strong>${t("lembre_preencher_form")}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`}function _(){e.style.display="none",r.checked=!0,n.checked=!1,c.style.display="block",x.value=""}return{element:e,updateVisibility:y,getOutput:m,setLanguage:E,reset:_}}var qt="cw_notes_parking_lot",mt="cw_notes_emergency_save";var we={getAll:()=>{try{return JSON.parse(localStorage.getItem(qt)||"[]")}catch{return[]}},save:t=>{let e=we.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...t};return e.unshift(o),e.length>5&&e.pop(),localStorage.setItem(qt,JSON.stringify(e)),o},delete:t=>{let e=we.getAll();return e=e.filter(o=>o.id!==t),localStorage.setItem(qt,JSON.stringify(e)),e},getCount:()=>we.getAll().length,saveEmergency:t=>{let e={timestamp:Date.now(),data:t};localStorage.setItem(mt,JSON.stringify(e))},getEmergency:()=>{try{let t=localStorage.getItem(mt);if(!t)return null;let e=JSON.parse(t);return Date.now()-e.timestamp>432e5?(localStorage.removeItem(mt),null):!e.data||!e.data.subStatus?null:e.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(mt)}};var gt=["lucaste","ricardogi"];var re={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"};function bt(t){let e=document.getElementById("cw-btn-notes");if(!e)return;let o=e.querySelector(".cw-dot-dirty");t?o||(o=document.createElement("div"),o.className="cw-dot-dirty",e.appendChild(o)):o&&o.remove()}function po(t){let e="cw-command-center-style";if(!document.getElementById(e)){let m=document.createElement("style");m.id=e,m.innerHTML=`
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
                
                background: ${re.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${re.glassBorder}; border-radius: 50px;
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
                cursor: pointer; position: relative; color: ${re.iconIdle};
                flex-shrink: 0;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn { transition: background 0.2s ease, color 0.2s ease !important; }
            }
            .cw-btn:hover {
                background: ${re.glassHighlight};
                color: ${re.iconActive};
                transform: scale(1.18) translateY(-2px) !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn:hover { transform: none !important; }
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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${re.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            @media (prefers-reduced-motion: reduce) {
                .cw-grip:hover .cw-grip-bar { transform: none !important; }
            }
            .cw-pill.dragging .cw-grip-bar { background-color: ${re.blue}; width: 16px; opacity: 1; }

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
            
            .cw-center-success { display: none; color: ${re.green}; margin-bottom: 10px; }
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
                50% { transform: scale(1.02); box-shadow: 0 0 20px ${re.blue}; }
                100% { transform: scale(1); box-shadow: 0 12px 32px rgba(0,0,0,0.25); }
            }
            .cw-pill.system-ready {
                animation: cw-system-ready 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.system-ready { animation: fadeIn 0.3s ease; }
            }
        `,document.head.appendChild(m)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',bauform:'<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>'},a=document.createElement("div");a.id="cw-floating-trigger",a.className="cw-pill side-right collapsed",a.innerHTML=`
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
    `;let n=document.createElement("div");n.className="cw-focus-backdrop",document.body.appendChild(n),document.body.appendChild(a);let i=(m,E)=>{P.playClick(),a.querySelector(`.${m}`).classList.toggle("active"),E()};if(a.querySelector(".notes").onclick=m=>{m.stopPropagation(),i("notes",t.toggleNotes)},a.querySelector(".bauform").onclick=m=>{m.stopPropagation(),i("bauform",t.toggleBAUForm)},a.querySelector(".email").onclick=m=>{m.stopPropagation(),i("email",t.toggleEmail)},a.querySelector(".script").onclick=m=>{m.stopPropagation(),i("script",t.toggleScript)},a.querySelector(".links").onclick=m=>{m.stopPropagation(),i("links",t.toggleLinks)},a.querySelector(".library").onclick=m=>{m.stopPropagation(),i("library",t.toggleLibrary)},a.querySelector(".timezone").onclick=m=>{m.stopPropagation(),i("timezone",t.toggleTimezone)},a.querySelector(".configs").onclick=m=>{m.stopPropagation(),i("configs",t.toggleConfigs)},a.querySelector(".broadcast").onclick=m=>{m.stopPropagation(),i("broadcast",()=>{let E=m.currentTarget.querySelector(".cw-badge");E&&E.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},a.querySelectorAll(".cw-btn").forEach(m=>{m.addEventListener("mouseenter",()=>P.playHover())}),t.broadcastControl&&t.broadcastControl.hasUnread){let m=document.createElement("div");m.className="cw-badge",a.querySelector(".broadcast").appendChild(m)}let s=null;a.onmouseleave=()=>{a.querySelector(".cw-btn.active")||a.classList.contains("processing-center")||(s=setTimeout(()=>{a.classList.add("collapsed")},3e3))},a.onmouseenter=()=>{s&&clearTimeout(s)},(async function(){let E=()=>{let F=fe();if(F){let q=F.split("@")[0].toLowerCase();if(gt.includes(q)){let $=a.querySelector("#cw-admin-tag");$&&$.classList.add("visible")}}else setTimeout(E,2e3)};E(),await ie(2800),a.classList.add("docked"),await ie(300);let _=a.querySelectorAll(".cw-btn");a.querySelectorAll(".cw-sep").forEach(F=>F.classList.add("visible"));for(let F=0;F<_.length;F++)_[F].classList.add("popped"),await ie(40);await ie(100),a.classList.add("system-check"),await ie(100),a.classList.add("system-ready"),setTimeout(()=>a.classList.remove("system-ready"),400)})();let r=!1,l,g,c,p,x=3;a.onmousedown=m=>{if(m.target.closest("button"))return;m.preventDefault(),l=m.clientX,g=m.clientY;let E=a.getBoundingClientRect();c=E.left,p=E.top,document.addEventListener("mousemove",f),document.addEventListener("mouseup",y)};function f(m){let E=m.clientX-l,_=m.clientY-g;!r&&Math.sqrt(E*E+_*_)>x&&(r=!0,a.classList.add("dragging"),a.style.transition="none",s&&clearTimeout(s)),r&&(a.style.left=`${c+E}px`,a.style.top=`${p+_}px`,a.style.right="auto",a.style.bottom="auto",a.style.transform="none")}function y(m){if(document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",y),r){r=!1,a.classList.remove("dragging");let E=window.innerWidth,_=window.innerHeight,F=a.getBoundingClientRect(),q=F.left+F.width/2,$;q<E/2?($=24,a.classList.remove("side-right"),a.classList.add("side-left")):($=E-F.width-24,a.classList.remove("side-left"),a.classList.add("side-right"));let W=Pe(F.top,24,_-F.height-24);setTimeout(()=>{a.style.setProperty("transition","left 0.3s cubic-bezier(0.4, 0, 0.2, 1), top 0.3s cubic-bezier(0.4, 0, 0.2, 1)","important"),a.style.left=`${$}px`,a.style.top=`${W}px`,a.style.bottom="auto",a.style.transform=""},10),setTimeout(()=>{a.style.transition="",a.style.removeProperty("transition")},700)}else{let E=a.querySelector(".cw-btn.active"),_=m.target.closest("button");if(a.classList.contains("collapsed")){let F=a.getBoundingClientRect(),q=window.innerHeight,$=F.top>q/2;if(a.style.setProperty("transition","none","important"),$){let W=q-F.bottom;a.style.top="auto",a.style.bottom=`${W}px`}else a.style.bottom="auto",a.style.top=`${F.top}px`;a.offsetWidth,a.style.removeProperty("transition"),a.classList.remove("collapsed"),P.playGenieOpen()}else!E&&!_&&(a.classList.add("collapsed"),P.playGenieOpen());_&&(_.style.transform="scale(0.9)",setTimeout(()=>_.style.transform="",150))}}}function ot(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${ce.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let a=document.createElement("div");a.className="cw-abort-btn",a.textContent="Cancelar",a.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,ee("Cancelado!",{duration:3e3}),o.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},o.appendChild(a),t.appendChild(o);let n=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(o))return;let s=Date.now()-n,r=Math.max(0,2e3-s);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(o))return;let l=o.querySelector(".cw-center-dots"),g=o.querySelector(".cw-center-text"),c=o.querySelector(".cw-center-success"),p=o.querySelector(".cw-abort-btn");l&&(l.style.display="none"),g&&(g.style.display="none"),p&&(p.style.display="none"),c&&c.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{o.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},r)}}function uo(t){let{onSaveCurrent:e,onLoadDraft:o,t:a}=t,n=document.createElement("button");n.className="js-btn-park",n.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${a("guardar")}</span>
    `,n.style.cssText=`
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${me.pill};
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
        transition: all 0.2s ${de};
        box-shadow: ${Re.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `,n.onmouseenter=()=>{n.style.backgroundColor="#F8F9FA",n.style.borderColor="#202124",n.style.color="#202124",n.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",n.style.transform="translateY(-1px)"},n.onmouseleave=()=>{n.style.backgroundColor="#FFFFFF",n.style.borderColor="#DADCE0",n.style.color="#5F6368",n.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",n.style.transform="translateY(0)"},n.onmousedown=()=>n.style.transform="scale(0.96)",n.onmouseup=()=>n.style.transform="scale(1) translateY(-1px)",n.onclick=async()=>{if(await ve("Deseja guardar o rascunho atual e limpar os campos?"))try{let m=await e();m?(we.save(m),f(),r(),P.playSuccess(),ee("Rascunho salvo com sucesso!")):ee("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(m){console.error("Erro ao salvar rascunho:",m),ee("Erro ao salvar.",{error:!0})}};let i=document.createElement("div");i.title="Meus Rascunhos",i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let s=document.createElement("div");s.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(s),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=y=>{y.stopPropagation(),x()};function r(){let y=we.getCount();bt(y>0),y>0?(s.style.display="block",s.textContent=y,s.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):s.style.display="none"}let l=document.createElement("div");l.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${j.surface}; z-index: 100;
        border-radius: ${me.large} ${me.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${de};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;let g=document.createElement("div");g.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",g.innerHTML=`<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${a("rascunhos_salvos")}</span>`;let c=document.createElement("button");c.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',c.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",c.onmouseenter=()=>c.style.background="#F1F3F4",c.onmouseleave=()=>c.style.background="transparent",c.onclick=()=>x(!1),g.appendChild(c);let p=document.createElement("div");p.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",l.appendChild(g),l.appendChild(p);function x(y){let m=l.style.transform==="translateY(0%)";(y!==void 0?y:!m)?(f(),l.style.transform="translateY(0%)"):l.style.transform="translateY(110%)"}function f(){let y=we.getAll();if(p.innerHTML="",y.length===0){p.innerHTML=`
                <div style="text-align:center; padding:80px 20px; color:${j.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:600;">${a("nenhum_rascunho")}</div>
                </div>`;return}y.forEach(m=>{let E=document.createElement("div");E.style.cssText=`
                background: ${j.surface}; padding: 20px; border-radius: ${me.large};
                border: 1.5px solid ${j.bgInput}; box-shadow: ${Re.subtle};
                position: relative; transition: all 0.3s ${de};
            `;let F=new Date(m.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),q="";m.summaryTags&&m.summaryTags.length>0&&(q=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${m.summaryTags.slice(0,3).join(", ")+(m.summaryTags.length>3?"...":"")}</div>`),E.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${m.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${F}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${m.cid||"---"}</span>
                    <span style="display:block; color:${m.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${m.subStatus||m.status||"Sem Status"}</span>
                    ${q}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let $=E.querySelector(".cw-resume-btn");$.onclick=async()=>{await ve("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(m),we.delete(m.id),f(),r(),x(!1),P.playSwoosh(),ee("Rascunho carregado."))};let W=E.querySelector(".cw-del-btn");W.onclick=async()=>{await ve("Excluir este rascunho?",{danger:!0})&&(we.delete(m.id),f(),r())},p.appendChild(E)})}return r(),{parkButton:n,historyBtnWrapper:i,drawer:l}}function at(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let a=window.getSelection();a.removeAllRanges(),a.addRange(o);try{document.execCommand("copy")}catch{ee("Falha ao copiar",{error:!0})}a.removeAllRanges(),document.body.removeChild(e)}function ft(t){["input","change","keydown","keyup"].forEach(o=>{let a=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(a)})}function mo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function xt(){console.log("Iniciando processo de Nova Nota...");let t=mo(),e=t.length,a=Array.from(document.querySelectorAll("i.material-icons-extended")).find(s=>s.innerText.trim()==="description");if(a){let s=a.closest("material-fab")||a.closest("material-button");s?(s.style&&(s.style.display="block",s.style.visibility="visible"),he(s)):he(a)}else{let s=document.querySelector("material-fab-speed-dial");if(s){let r=s.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),he(r)):s.click(),await ie(800);let g=Array.from(document.querySelectorAll("i.material-icons-extended")).find(c=>c.innerText.trim()==="description");g&&he(g)}}let n=null,i=0;for(;!n&&i<20;){await ie(300);let s=mo();if(s.length>e)n=s.find(r=>!t.includes(r)),n||(n=s[s.length-1]);else if(i>10){let r=s.filter(l=>l.offsetParent!==null);r.length>0&&(n=r[r.length-1])}i++}return n}function go(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let a=document.createElement("div");a.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(a),e.appendChild(o),o.addEventListener("scroll",()=>{a.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let n={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function s({id:q,label:$,type:W="text",placeholder:ae="",required:B=!1,parent:I=o}){let H=document.createElement("div");H.style.cssText=n.inputWrapper;let K=document.createElement("label");K.style.cssText=n.label,K.innerHTML=`${$} ${B?'<span style="color:#D93025">*</span>':""}`;let G;return W==="textarea"?(G=document.createElement("textarea"),G.style.cssText=n.input+n.textarea):(G=document.createElement("input"),G.type=W,G.style.cssText=n.input),G.id=q,G.placeholder=ae,G.addEventListener("focus",()=>{G.style.borderColor="#1a73e8",G.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),G.addEventListener("blur",()=>{G.style.borderColor="#DADCE0",G.style.boxShadow="none",B&&G.value.trim()!==""&&(G.style.backgroundColor="#FFF")}),i[q]={input:G,wrapper:H,required:B},H.appendChild(K),H.appendChild(G),I.appendChild(H),H}function r({id:q,label:$,options:W=["Yes","No"],defaultValue:ae="No",onChange:B=null}){let I=document.createElement("div");I.style.cssText=n.inputWrapper;let H=document.createElement("label");H.style.cssText=n.label,H.textContent=$,I.appendChild(H);let K=document.createElement("div");K.style.cssText=n.radioGroup;let G=document.createElement("input");return G.type="hidden",G.id=q,G.value=ae,I.appendChild(G),W.forEach(D=>{let U=document.createElement("div");U.textContent=D,U.style.cssText=n.radioLabel,D===ae&&(U.style.cssText+=n.radioActive),U.onclick=()=>{Array.from(K.children).forEach(w=>w.style.cssText=n.radioLabel),U.style.cssText+=n.radioActive,G.value=D,B&&B(D)},K.appendChild(U)}),i[q]={input:G,wrapper:I,required:!1},I.appendChild(K),o.appendChild(I),I}let l=document.createElement("div");l.style.cssText=n.banner,l.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(l);let g=document.createElement("div");g.style.marginBottom="24px";let c=document.createElement("button");c.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",c.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",c.onmouseover=()=>c.style.background="#E1EFFF",c.onmouseout=()=>c.style.background="#F0F7FF",g.appendChild(c),o.appendChild(g);let p=document.createElement("div");p.style.cssText=n.section,p.innerHTML=`<div style="${n.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(p),s({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:p}),s({id:"ga4",label:"GA4 Property ID",parent:p}),s({id:"gtm",label:"GTM Container ID",parent:p});let x=document.createElement("div");x.style.cssText=n.hiddenField,p.appendChild(x),r({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:q=>{q==="Yes"?x.style.cssText=n.visibleField+"margin-bottom:14px;":(x.style.cssText=n.hiddenField,i.accessEmail.input.value="")}}),s({id:"accessEmail",label:"User Access Email",parent:x}),r({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let f=document.createElement("div");f.style.cssText=n.section,f.innerHTML=`<div style="${n.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(f),s({id:"name",label:"Advertiser Name",required:!0,parent:f}),s({id:"url",label:"Website URL",parent:f}),s({id:"phone",label:"Phone Number",parent:f}),s({id:"email",label:"Contact Email",parent:f}),s({id:"callback",label:"Preferred Callback Time (Timezone)",parent:f}),s({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:f}),s({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:f}),s({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:f});let y=document.createElement("div");y.style.cssText=n.section,y.innerHTML=`<div style="${n.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(y),s({id:"cc_adv",label:"Advertiser Contact",parent:y}),s({id:"cc_am",label:"Account Manager",parent:y});let m=document.createElement("div");m.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let E=document.createElement("button");E.innerHTML="Voltar",E.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",E.onclick=t;let _=document.createElement("button");_.textContent="Gerar Nota",_.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",m.appendChild(E),m.appendChild(_),e.appendChild(m),c.onclick=async()=>{let q=c.innerHTML;c.innerHTML="\u23F3 Buscando dados...";try{let $=await Fe(),W=0,ae=(H,K)=>{let G=i[H];K&&G&&G.input.value===""&&(G.input.value=K,G.input.style.backgroundColor="#E6F4EA",G.input.style.borderColor="#34A853",setTimeout(()=>{G.input.style.backgroundColor="#FFF",G.input.style.borderColor="#DADCE0"},1e3),W++)};ae("name",$.advertiserName),ae("url",$.websiteUrl),$.clientEmail&&(ae("email",$.clientEmail),ae("cc_adv",$.clientEmail));let I=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);I&&ae("cid",I[0]),W>0?ee(`${W} campos preenchidos!`):ee("Nenhum dado novo encontrado.")}catch($){console.error($),ee("Erro ao ler p\xE1gina.")}finally{c.innerHTML=q}};let F=()=>{let q=!0,$=null;return Object.values(i).forEach(W=>{W.required&&!W.input.value.trim()&&(q=!1,W.input.style.cssText+=n.inputError,W.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),$||($=W.input))}),$&&$.scrollIntoView({behavior:"smooth",block:"center"}),q};return _.onclick=async()=>{if(!F()){ee("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let q=H=>i[H].input.value||"N/A",$=q("hasAccess"),W=$==="Yes"?q("accessEmail"):"N/A",B=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${q("cid")}
<b>GA4 ID:</b> ${q("ga4")}
<b>GTM ID:</b> ${q("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${$==="Yes"?"Y":"N"}
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
`.replace(/\n/g,"<br>");at(B);let I=await xt();I?(I.innerText.trim()===""&&(I.innerHTML=""),document.execCommand("insertHTML",!1,B),ft(I),ee("Nota gerada e inserida!")):ee("Copiado! Abra uma nota para colar.")},e}function ke(t,e="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,o[e]||o.info)}function ht(t,e){if(!t)return;let o=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,a=document.getElementById(o);a&&a.remove();let n=t.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
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
    `;let s=i.querySelector(".cw-close-btn");s.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&s.click()},25e3)}async function yt(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await ie(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await ie(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function _t(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let a=o.offsetParent!==null,n=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return a&&!n&&i});return e&&ke("Editor visualmente detectado.","success"),e}async function bo(){ke("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="email");if(o&&o.offsetParent!==null){ke("Bot\xE3o de email direto encontrado.");let p=o.closest("material-button")||o.closest("material-fab")||o;he(p),t=!0}else{ke("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let p=document.querySelector("material-fab-speed-dial");if(p){let x=p.querySelector(".trigger");if(x){he(x),await ie(800);let y=Array.from(document.querySelectorAll("i.material-icons-extended")).find(m=>m.innerText.trim()==="email");y&&(he(y),t=!0)}}}if(!t)return ee("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ke("\u{1F680} FASE 2: Verificando rascunhos...");let a=null,n=0,i=20;for(;n<i;){await ie(250);let p=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(a=Array.from(p).find(x=>x.offsetParent!==null),a){ke("\u26A0\uFE0F Rascunho detectado!","warn");break}n++}if(a){ke("\u{1F5D1}\uFE0F Descartando..."),he(a),a.click();let p=null,x=0;for(;x<15;){await ie(300);let f=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(p=Array.from(f).find(y=>y.offsetParent!==null),p)break;x++}p&&(he(p),ee("Limpando rascunho antigo...",{duration:2e3}),await ie(2500))}ke("\u{1F680} FASE 3: Buscando editor final...");let s=0,r=null;for(;s<20&&(r=_t(),!r);)await ie(250),s++;if(!r)return ee("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let l=r.closest('[id="email-body-content-top"]'),c=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(l){if(c){let x=c.closest('[aria-hidden="true"]');x&&x.removeAttribute("aria-hidden"),c.focus(),he(c)}await ie(300),l.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let p=l.querySelector("#cases-body-field");if(p){let x=document.createRange();x.selectNodeContents(p),x.collapse(!0);let f=window.getSelection();f.removeAllRanges(),f.addRange(x)}return!0}return!1}async function vt(t){if(!t||!await bo())return;let o=await Fe();ke("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let a=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(a&&(a.click(),await ie(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await yt(i,o.clientEmail),ht(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await yt(i,o.internalEmail),ht(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await ie(500);let n=document.querySelector('material-button[debug-id="canned_response_button"]');if(n){he(n),await ie(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){he(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),ke("\u23F3 Buscando resultado da Canned Response...","info");let s=null,r=0,l=15e3,g=500;for(;r<l&&(s=document.querySelector("material-select-dropdown-item"),!s);)await ie(g),r+=g;if(s){he(s),await ie(1500);let c=_t();if(c){let x=Array.from(c.querySelectorAll("span.field")).filter(y=>y.innerText.includes("{Requested Task Type}"));if(x.length>0){let y=x.map(E=>E.closest("tr")).filter(E=>E!==null),m=[...new Set(y)];if(m.length>0){let _=m[0].querySelector('td[width="100%"]');_&&(_.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let F=1;F<m.length;F++)m[F].remove()}}let f=c.innerHTML;o.advertiserName&&f.includes("{%ADVERTISER_NAME%}")&&(f=f.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),f.includes("{%^79285%}")&&(f=f.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),c.innerHTML=f}ee("Canned Response aplicada!")}else ke(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),ee(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else ee("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function fo(t){if(ke(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await bo())return;let o=await Fe(),a=et();await ie(600);let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await ie(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await yt(r,o.clientEmail),ht(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await yt(r,o.internalEmail),ht(r,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await ie(300));let s=_t();if(s){let l=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');l&&(l.focus(),he(l));let g=new Date;g.setDate(g.getDate()+3);let c=g.getDay();c===6?g.setDate(g.getDate()+2):c===0&&g.setDate(g.getDate()+1);let p=g.toLocaleDateString("pt-BR"),x=t.body;x=x.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),x=x.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),x=x.replace(/\[URL\]/g,o.websiteUrl||"seu site"),x=x.replace(/\[Seu Nome\]/g,a),x=x.replace(/\[MM\/DD\/YYYY\]/g,p),document.execCommand("insertHTML",!1,x),l&&(l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),ee("Email preenchido com sucesso!",{duration:2e3}),ke("\u2705 Processo finalizado com sucesso.","success")}else ee("Erro ao focar no editor.",{error:!0})}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function be(t,e,o){let a=document.getElementById(o);if(!e)return;let n=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(a){let c=a.getBoundingClientRect();i.x=c.left+c.width/2,i.y=c.top+c.height/2}let s,r;if(!n)s=window.innerWidth/2,r=window.innerHeight/2;else{let c=e.getBoundingClientRect();s=c.left+c.width/2,r=c.top+c.height/2,s===0&&r===0&&(s=window.innerWidth/2,r=window.innerHeight/2)}let l=i.x-s,g=i.y-r;t?(P.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",n?e.style.transform=`translate(${l}px, ${g}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${l}px), calc(-50% + ${g}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),a&&a.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",n?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof xo=="function"&&xo(e,o)):(P.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",n?e.style.transform=`translate(${l}px, ${g}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${l}px), calc(-50% + ${g}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),a&&a.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof Dt=="function"&&Dt(e))}function xo(t,e){Dt(t);let o=a=>{if(!t.classList.contains("open"))return;let n=t.contains(a.target),i=document.querySelector(".cw-pill"),s=i&&i.contains(a.target);n?(t.classList.remove("idle"),t.style.zIndex="2147483648"):s||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function Dt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}function ho(){let t="v4.0.0",{popup:e,content:o,header:a,animRefs:n,credit:i}=ao(t,K),s=co(b),r=lo(()=>{M(),J.setActiveTasks(r.getCheckedElements())},b,J),l=document.createElement("div");l.style.display="none";let g=ro((u,L)=>{Z(u,L)});l.appendChild(g);let c=document.createElement("div");c.id="evidence-container",Object.assign(c.style,{display:"none",marginTop:"16px",padding:"16px",background:j.bgInput,border:`1px solid ${j.border}`,borderRadius:me.medium,boxShadow:Re.subtle});let p=document.createElement("div");p.className="cw-section-title",p.textContent=b("evidencias_contato"),c.appendChild(p);let x={},f=(u,L)=>{let N=document.createElement("div");N.style.marginBottom="12px";let X=document.createElement("label");X.textContent=L,X.setAttribute("for",u),X.style.cssText=`display: block; font-size: 11px; font-weight: 700; color: ${j.textSub}; margin-bottom: 6px; text-transform: uppercase;`;let V=document.createElement("input");return V.type="text",V.id=u,V.className="cw-input",V.placeholder="https://screenshot.googleplex.com/...",V.style.marginBottom="0",N.appendChild(X),N.appendChild(V),x[u]=V,N};c.appendChild(f("evidence-l1",b("ligacao_1"))),c.appendChild(f("evidence-l2",b("ligacao_2"))),c.appendChild(f("evidence-msg",b("mensagem_am")));let y=uo({onSaveCurrent:async()=>{let u=await d();return Q(),u},onLoadDraft:u=>{k(u)},t:u=>b(u)}),m=D(),E=U(),_=document.createElement("div"),F=A(),q=oe(y,b);o.appendChild(m),o.appendChild(E),o.appendChild(F),o.appendChild(l),o.appendChild(_),o.appendChild(c),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none";let $=document.createElement("button");$.id="manual-task-toggle",$.textContent=b("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task",$.style.cssText=`display: none; width: 100%; padding: 14px; border: 2px dashed ${j.primary}; background: ${j.surface}; color: ${j.primary}; border-radius: ${me.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${de}; text-transform: uppercase; letter-spacing: 0.5px;`,$.onmouseenter=()=>{$.style.background=j.primaryBg},$.onmouseleave=()=>{$.style.background=j.surface},$.onclick=()=>{r.selectionElement.style.display="block",r.screenshotsElement.style.display="block",$.style.display="none"},o.appendChild($),o.appendChild(r.selectionElement),o.appendChild(s.element),o.appendChild(r.screenshotsElement),o.appendChild(q);let W=document.createElement("div");W.style.display="none",W.style.flexGrow="1",W.style.minHeight="0",W.style.overflow="hidden";let ae=go(()=>G());ae.style.height="100%",W.appendChild(ae),e.insertBefore(W,i);let B=a.lastElementChild;B&&(B.insertBefore(y.historyBtnWrapper,B.firstChild),B.insertBefore(S(),B.firstChild)),e.appendChild(y.drawer);let I=null;J.subscribe(u=>{T(u),H(),u.isDirty?(I&&clearTimeout(I),I=setTimeout(async()=>{let L=await d(!0);L.subStatus?we.saveEmergency(L):we.clearEmergency(),u.isDirty=!1},2e3)):I&&(clearTimeout(I),I=null)});function H(){let u=we.getCount()>0,L=!!J.currentSubStatus;bt(u||L)}function K(){J.visible=!J.visible,be(J.visible,e,"cw-btn-notes")}function G(){J.isSplitView=!J.isSplitView,J.isSplitView?(o.style.display="none",W.style.display="flex",W.style.flexDirection="column",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",W.style.display="none",n.googleLine&&(n.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function D(){let u=document.createElement("div");if(u.innerHTML=`
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
        `,!document.getElementById("cw-segmented-styles")){let N=document.createElement("style");N.id="cw-segmented-styles",N.innerHTML=`
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
                    transition: all 0.3s ${de};
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
            `,document.head.appendChild(N)}let L=(N,X)=>{let te=u.querySelector(`#${N}`).querySelector(".cw-segmented-indicator");te&&(te.style.transform=`translateX(${X*100}%) translateX(${X*2}px)`)};return u.querySelectorAll("#lang-selector button").forEach((N,X)=>{N.onclick=()=>{J.setLanguage(N.dataset.lang),u.querySelectorAll("#lang-selector button").forEach(V=>V.classList.remove("active")),N.classList.add("active"),L("lang-selector",X),P.playHover(),J.currentSubStatus&&C(J.currentSubStatus)}}),u.querySelectorAll("#type-selector button").forEach((N,X)=>{N.onclick=()=>{J.setCaseType(N.dataset.type),u.querySelectorAll("#type-selector button").forEach(V=>V.classList.remove("active")),N.classList.add("active"),L("type-selector",X),P.playHover(),J.currentSubStatus&&C(J.currentSubStatus)}}),u.querySelectorAll("#portugal-selector button").forEach((N,X)=>{N.onclick=()=>{J.setPortugalCase(N.dataset.val==="true"),u.querySelectorAll("#portugal-selector button").forEach(V=>V.classList.remove("active")),N.classList.add("active"),L("portugal-selector",X),P.playHover(),J.currentSubStatus&&C(J.currentSubStatus)}}),u}function U(){let u=document.createElement("div");u.className="cw-status-section",u.style.cssText="display: flex; flex-direction: column; gap: 8px;",u.innerHTML=`
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
        `;let L=u.querySelector("#main-status-select"),N=u.querySelector("#sub-status-select");return L.onchange=()=>{J.setStatus(L.value),w(L.value,N),J.setSubStatus(""),C("")},N.onchange=()=>{J.setSubStatus(N.value),C(N.value)},u}function h(){return c.style.display==="none"?null:{l1:x["evidence-l1"]?.value.trim()||"",l2:x["evidence-l2"]?.value.trim()||"",msg:x["evidence-msg"]?.value.trim()||""}}function w(u,L){if(L.innerHTML=`<option value="">${b("select_substatus")}</option>`,!u){L.disabled=!0;return}for(let N in De)if(De[N].status===u){let X=document.createElement("option");X.value=N,X.textContent=De[N].name,L.appendChild(X)}L.disabled=!1}function C(u){let L=De[u],N=u==="NI_Attempted_Contact"||L&&L.name&&L.name.toLowerCase().includes("attempted contact");if(g.render&&g.render(u,J.currentCaseType),!u){c.style.display="none",x["evidence-l1"]&&(x["evidence-l1"].value=""),x["evidence-l2"]&&(x["evidence-l2"].value=""),x["evidence-msg"]&&(x["evidence-msg"].value=""),l.style.display="none",_.style.display="none";let le=document.getElementById("manual-task-toggle");le&&(le.style.display="none"),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",F.style.display="flex",F.style.opacity="1",q.style.display="none";return}N?c.style.display="block":(c.style.display="none",x["evidence-l1"]&&(x["evidence-l1"].value=""),x["evidence-l2"]&&(x["evidence-l2"].value=""),x["evidence-msg"]&&(x["evidence-msg"].value="")),F.style.opacity="0",setTimeout(()=>{J.currentSubStatus&&(F.style.display="none")},400),q.style.display="grid",L&&L.templateFields&&J.setActiveFields(L.templateFields),z(),Lt(u,_,J),_.style.display="block",l.style.display="block";let X=u.startsWith("SO_"),V=u==="NI_Awaiting_Validation",te=document.getElementById("manual-task-toggle");X||V?(r.selectionElement.style.display="block",te.style.display="none"):(r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",te.style.display="block");let Y=u==="SO_Education_Only"?"education":"implementation";J.setScreenshotMode(Y),J.currentCaseType==="lm"?J.toggleFieldExclusion("field-ON_CALL",!0):J.toggleFieldExclusion("field-ON_CALL",!1),r.updateSubStatus(u),M();let ne=document.getElementById("email-automation-toggle-row");ne&&(ne.style.display=Je[u]?"flex":"none")}function M(){let u=r.getCheckedElements().map(L=>L.value);s.updateVisibility(J.currentSubStatus,u)}function Z(u,L){let N=pt[u];if(N){for(let X in N)if(X==="linkedTask")r.toggleTask(N.linkedTask,L);else if(X==="activeTasks")N.activeTasks.forEach(V=>{L?r.setTaskCount(V.value,V.count):r.setTaskCount(V.value,0)});else if(X.startsWith("field-")){let V=X,te=N[X],Y=document.getElementById(V);if(Y){let ne=Ke.includes(V.replace("field-",""));if(L)if(ne){let le=Y.value.trim();le.includes(te.trim())||(Y.value=le?le+`
`+te.trim():te.trim())}else Y.value=te;else if(ne){let le=Y.value.trim(),Ae=te.trim();le.includes(Ae)&&(Y.value=le.replace(Ae,"").trim().replace(/\n{3,}/g,`

`))}else Y.value.trim()===te.trim()&&(Y.value="");J.updateField(V,Y.value),Y.dispatchEvent(new Event("input"))}}}}function oe(u,L){let N=document.createElement("div");if(N.className="cw-actions-section",N.style.cssText=`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${j.bgInput};
            border-radius: 12px;
            border: 1px solid ${j.border};
        `,!document.getElementById("cw-actions-hover-styles")){let le=document.createElement("style");le.id="cw-actions-hover-styles",le.innerHTML=`
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
            `,document.head.appendChild(le)}let X=document.createElement("div");X.id="email-automation-toggle-row",X.style.cssText="grid-column: span 2; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;",X.innerHTML=`
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${j.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${j.primary};">
                <span class="js-label-email-toggle">${L("preencher_email_automaticamente")}</span>
            </label>
        `;let V=u.parkButton;V.classList.add("js-btn-park"),V.style.cssText="width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;";let te=document.createElement("button");te.className="cw-btn-secondary js-btn-reset",te.textContent=L("limpar"),te.style.cssText=`width: 100%; height: 34px; background: ${j.surface}; color: ${j.textSub}; border: 1px solid ${j.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,te.onclick=()=>Q();let Y=document.createElement("button");Y.className="cw-btn-secondary js-btn-copy",Y.textContent=L("copiar"),Y.style.cssText=`width: 100%; height: 34px; background: ${j.surface}; color: ${j.primary}; border: 1px solid ${j.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`,Y.onclick=()=>O();let ne=document.createElement("button");return ne.className="cw-btn-primary js-btn-generate",ne.textContent=L("preencher"),ne.style.cssText=`width: 100%; height: 38px; background: ${j.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: span 2; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`,ne.onclick=()=>R(),N.appendChild(X),N.appendChild(V),N.appendChild(te),N.appendChild(Y),N.appendChild(ne),N}async function O(){if(!J.currentSubStatus){ee(b("select_substatus"),{error:!0});return}let u=Ot(J,r,s,h());u?(at(u),ee(b("copiado_sucesso")),P.playClick()):ee(b("select_substatus"),{error:!0})}async function R(){if(!J.currentSubStatus){ee(b("select_substatus"),{error:!0});return}let u=Ot(J,r,s,h());at(u),K();let L=ot(),N=await xt();if(N){N.focus(),document.execCommand("insertHTML",!1,u),ft(N);let X=document.getElementById("email-automation-checkbox");(!X||X.checked)&&J.currentSubStatus&&Je[J.currentSubStatus]&&await vt(Je[J.currentSubStatus]),ee(b("inserido_copiado")),P.playSuccess(),Q()}L()}function z(){if(J.currentSubStatus){if(J.currentCaseType==="lm")J.removeField("ON_CALL");else{let u=De[J.currentSubStatus];u&&u.templateFields.includes("ON_CALL")&&J.addFieldAt("ON_CALL",1)}J.isPortugalCase?(J.addFieldAt("CASO_PORTUGAL",1),J.addFieldAt("CONSENTIU_GRAVACAO",2)):(J.removeField("CASO_PORTUGAL"),J.removeField("CONSENTIU_GRAVACAO"))}}function Q(){J.reset(),r.reset(),s.reset(),H(),we.clearEmergency(),o.querySelectorAll("select").forEach(L=>L.value=""),o.querySelector("#sub-status-select").disabled=!0;let u=document.getElementById("email-automation-toggle-row");u&&(u.style.display="none"),_.innerHTML="",l.style.display="none",F.style.display="flex",F.style.opacity="1",q.style.display="none",document.getElementById("manual-task-toggle")&&(document.getElementById("manual-task-toggle").style.display="none"),r.selectionElement.style.display="none",r.screenshotsElement.style.display="none",c.style.display="none",x["evidence-l1"]&&(x["evidence-l1"].value=""),x["evidence-l2"]&&(x["evidence-l2"].value=""),x["evidence-msg"]&&(x["evidence-msg"].value="")}async function d(u=!1){let L={};_.querySelectorAll("input, textarea, select").forEach(Y=>{(Y.id.startsWith("field-")||Y.id==="consent-select")&&(L[Y.id]=Y.value)});let N="Cliente",X="---";if(!u)try{let Y=await Fe();N=Y.advertiserName,X=Y.cid}catch(Y){console.warn("Erro ao coletar pageData:",Y)}let V=r.getCheckedElements().map(Y=>({key:Y.value,count:Y.count})),te=V.map(Y=>{let ne=Le[Y.key];return ne?ne.name:Y.key});return{currentCaseType:J.currentCaseType,currentLang:J.currentLang,isPortugalCase:J.isPortugalCase,consent:J.consent,tagSupportUsed:J.tagSupportUsed,forcedScreenshots:[...J.forcedScreenshots],excludedFields:[...J.excludedFields],activeFields:J.activeFields,status:J.currentStatus,subStatus:J.currentSubStatus,formData:L,activeTasks:V,summaryTags:te,clientName:N,cid:X,timestamp:new Date().toISOString()}}let v=u=>new Promise(L=>setTimeout(L,u));async function k(u){J.setLanguage(u.currentLang||"pt"),J.setCaseType(u.currentCaseType||"bau"),J.setPortugalCase(u.isPortugalCase||!1),J.setConsent(u.consent||!1),J.setExcludedFields(u.excludedFields||[]),u.activeFields&&J.setActiveFields(u.activeFields);let L=o.querySelector(`#lang-selector button[data-lang="${J.currentLang}"]`);L&&L.classList.add("active"),o.querySelectorAll("#lang-selector button").forEach(V=>{V!==L&&V.classList.remove("active")});let N=o.querySelector(`#type-selector button[data-type="${J.currentCaseType}"]`);N&&N.classList.add("active"),o.querySelectorAll("#type-selector button").forEach(V=>{V!==N&&V.classList.remove("active")});let X=o.querySelector(`#portugal-selector button[data-val="${J.isPortugalCase}"]`);if(X&&X.classList.add("active"),o.querySelectorAll("#portugal-selector button").forEach(V=>{V!==X&&V.classList.remove("active")}),u.status){let V=o.querySelector("#main-status-select");V.value=u.status,J.setStatus(u.status);let te=o.querySelector("#sub-status-select");if(w(u.status,te),await v(50),u.subStatus){if(te.value=u.subStatus,J.setSubStatus(u.subStatus),C(u.subStatus),await v(100),u.tagSupportUsed!==void 0){J.setTagSupportUsed(u.tagSupportUsed);let Y=s.element.querySelector('input[value="Sim"]'),ne=s.element.querySelector('input[value="N\xE3o"]');u.tagSupportUsed&&Y?Y.checked=!0:ne&&(ne.checked=!0),s.element.querySelector("div:last-child").style.display=u.tagSupportUsed?"none":"block"}u.forcedScreenshots&&J.setForcedScreenshots(u.forcedScreenshots);for(let Y in u.formData){let ne=document.getElementById(Y);ne&&(ne.value=u.formData[Y],J.updateField(Y,ne.value))}u.activeTasks&&(u.activeTasks.forEach(Y=>r.setTaskCount(Y.key,Y.count)),J.setActiveTasks(r.getCheckedElements()))}}J.isDirty=!1}function b(u){return Ie[J.currentLang]?.[u]||Ie.pt?.[u]||u}function S(){let u=document.createElement("div");return u.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',u.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",u.onclick=L=>{L.stopPropagation(),G()},u.title="Alternar para Split & Transfer",u}function A(){let u=document.createElement("div");return u.id="notes-empty-state",u.style.cssText=`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${de};
        `,u.innerHTML=`
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
                    ${b("pronto_comecar")||"Pronto para come\xE7ar?"}
                </div>
                <div style="font-size: 13px; color: ${j.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${b("selecione_status_ajuda")||"Selecione um status e substatus para<br>come\xE7ar a sua nota t\xE9cnica."}
                </div>
            </div>
        `,u}function T(u){let L=o.querySelector(".js-label-idioma");L&&(L.textContent=b("idioma"));let N=o.querySelector(".js-label-fluxo");N&&(N.textContent=b("fluxo"));let X=o.querySelector(".js-label-portugal");X&&(X.textContent=b("caso_portugal"));let V=o.querySelector(".js-label-status");V&&(V.textContent=b("status_principal"));let te=o.querySelector(".js-label-substatus");te&&(te.textContent=b("substatus"));let Y=o.querySelector(".js-btn-copy");Y&&(Y.textContent=b("copiar"));let ne=o.querySelector(".js-btn-generate");ne&&(ne.textContent=b("preencher"));let le=o.querySelector(".js-btn-reset");le&&(le.textContent=b("limpar"));let Ae=document.getElementById("manual-task-toggle");Ae&&(Ae.textContent=b("gostaria_de_adicionar_uma_task")||"Gostaria de adicionar uma task");let Se=o.querySelector(".js-btn-park span");Se&&(Se.textContent=b("guardar")),p.textContent=b("evidencias_contato");let Oe=c.querySelector('label[for="evidence-l1"]');Oe&&(Oe.textContent=b("ligacao_1"));let We=c.querySelector('label[for="evidence-l2"]');We&&(We.textContent=b("ligacao_2"));let Ce=c.querySelector('label[for="evidence-msg"]');Ce&&(Ce.textContent=b("mensagem_am"));let pe=e.querySelector(".js-drawer-title");pe&&(pe.textContent=b("rascunhos_salvos"));let Me=o.querySelector(".js-label-email-toggle");Me&&(Me.textContent=b("preencher_email_automaticamente")),s&&s.setLanguage&&s.setLanguage(b),r&&r.setLanguage&&r.setLanguage(b)}return F.style.display="flex",q.style.display="none",J.setLanguage("pt"),J.setCaseType("bau"),H(),setTimeout(async()=>{let u=we.getEmergency();u&&(await ve("Detectamos um rascunho n\xE3o salvo da sua \xFAltima sess\xE3o. Deseja restaurar?")?(k(u),ee("Sess\xE3o restaurada!")):we.clearEmergency())},3e3),document.body.appendChild(e),K}var yo=[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",category:"Tentativas & Agendamento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",placeholders:[{key:"[Seu Nome]",label:"Seu Nome",type:"text",auto:"agentName"},{key:"[INSERIR URL]",label:"URL do Site",type:"text"},{key:"[LINK DO MEET]",label:"Link da Reuni\xE3o",type:"text"}],template:"<p>Ol\xE1,</p><br><p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p><br><p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p><p><strong>Ads Conversion Tracking</strong></p><br><p>Em seu site: <strong>[INSERIR URL]</strong></p><p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"reschedule2",name:"Proposta de Reagendamento",category:"Tentativas & Agendamento",subject:"Reagendamento de Consultoria",placeholders:[{key:"[DATA 1]",label:"Data 1",type:"text"},{key:"[HORA 1]",label:"Hora 1",type:"text"},{key:"[DATA 2]",label:"Data 2",type:"text"},{key:"[HORA 2]",label:"Hora 2",type:"text"},{key:"[DATA 3]",label:"Data 3",type:"text"},{key:"[HORA 3]",label:"Hora 3",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p><ul><li><strong>[DATA 1] \xE0s [HORA 1]</strong></li><li><strong>[DATA 2] \xE0s [HORA 2]</strong></li><li><strong>[DATA 3] \xE0s [HORA 3]</strong></li></ul><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email nas pr\xF3ximas 48 horas o caso ser\xE1 encerrado.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",category:"Tentativas & Agendamento",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Espero que este e-mail o encontre bem.</p><p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p><br><p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p><br><p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p><br><p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]",label:"A\xE7\xE3o Pendente",type:"text"},{key:"[MM/DD/YYYY]",label:"Data do Pr\xF3ximo Contato",type:"date"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p><br><p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p><p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",category:"Follow Up",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[URL]",label:"URL do Site",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, <strong>[Nome do Cliente]</strong></p><br><p>Espero que voc\xEA esteja bem!</p><p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p><br><p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p><ul><li>Ajuda a rastrear convers\xF5es em tempo real</li><li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li><li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li><li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li></ul><br><p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p><p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p><br><p>Fico \xE0 disposi\xE7\xE3o.</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>"},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",category:"Follow Up",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",placeholders:[{key:"[Disponibilidade em BAU]",label:"Pr\xF3xima Disponibilidade",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:"<p>Ol\xE1, tudo bem?</p><br><p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p><br><p>Para isso, pe\xE7o, por favor, que me envie algumas das pr\xF3ximas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p><p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p><br><p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p><p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p><br><p>Atenciosamente,</p><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>"},{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Task pedida pelo AM]",label:"Task Solicitada",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'},{id:"nrp_dfa",name:"NRP - DFA",category:"NRP / Encerramento",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",placeholders:[{key:"[Nome do Cliente]",label:"Nome do Cliente",type:"text"},{key:"[Seu Nome]",label:"Assinatura",type:"text",auto:"agentName"}],template:'<p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p><br><p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p><p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p><p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p><br><p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p><p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p><ul><li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li><li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li><li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li></ul><p><strong>Em rela\xE7\xE3o ao Shopping</strong></p><ul><li><a href="https://www.google.com/retail/">Google for Retail</a></li><li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li><li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li><li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li><li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li></ul><br><p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>'}];var vo={_templates:null,async getTemplates(){return this._templates?this._templates:(this._templates=yo,this._templates)}};var wo="cw_personal_library_v1",Ze=!1,Ee={getSnippets:(t="all")=>{let e=Ee._loadFromLocal(),o=fe();return o&&o.includes("@")&&!Ze&&Ee._syncWithServer(o),t==="all"?e:e.filter(a=>a.type===t)},save:async t=>{let e=fe();if(!e)return ee("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;Ze=!0;let o=Ee._loadFromLocal(),a=new Date().toISOString(),n={id:t.id||"local_"+Date.now(),type:t.type||"general",title:t.title||"Sem t\xEDtulo",content:t.content||"",subject:t.subject||"",isCode:t.isCode||!1,isRich:t.isRich||!1,updated:a},i=o.filter(s=>s.id!==n.id);i.unshift(n),Ee._saveToLocal(i);try{await ce.saveSnippet(n,e)?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}catch(s){console.error("Erro na nuvem:",s)}finally{setTimeout(()=>{Ze=!1},2e3)}return n},delete:async t=>{let e=fe();Ze=!0;let a=Ee._loadFromLocal().filter(n=>n.id!==t);return Ee._saveToLocal(a),e?ce.deleteSnippet(t,e).then(()=>{setTimeout(()=>{Ze=!1},2e3)}):Ze=!1,!0},_syncWithServer:async t=>{if(window._cw_library_syncing)return;window._cw_library_syncing=!0,setTimeout(()=>{window._cw_library_syncing=!1},3e4),console.log("\u{1F504} Sincronizando biblioteca...");let e=await ce.getUserSnippets(t);if(e&&e.status==="success"&&Array.isArray(e.snippets)){let o=e.snippets,a=Ee._loadFromLocal(),n=JSON.stringify(o),i=JSON.stringify(a);n!==i&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),Ee._saveToLocal(o))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(wo)||"[]")}catch{return[]}},_saveToLocal:t=>{localStorage.setItem(wo,JSON.stringify(t))}};function So(){let t="v6.0.0",e=!1,o=[],a=null,n="",i="Todos",s=new Set,r={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"},l=document.createElement("div");l.id="email-assistant-popup",l.classList.add("cw-module-window");let g=document.createElement("style");g.textContent=`
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
    `,document.head.appendChild(g),Object.assign(l.style,ye,{width:"850px",height:"650px",display:"none",flexDirection:"column",fontFamily:"'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",borderRadius:"12px",overflow:"hidden"});let c=ge(l,"Email Assistant",t,"Refatora\xE7\xE3o completa do m\xF3dulo de e-mail para uma experi\xEAncia moderna e eficiente.",{popup:l},()=>U()),p=document.createElement("div");Object.assign(p.style,{display:"flex",flex:"1",overflow:"hidden",backgroundColor:r.bgApp});let x=document.createElement("div");Object.assign(x.style,{width:"320px",backgroundColor:"#EFEFF0",borderRight:`1px solid ${r.borderSubtle}`,display:"flex",flexDirection:"column",flexShrink:"0"});let f=document.createElement("div");Object.assign(f.style,{padding:"16px",borderBottom:`1px solid ${r.borderSubtle}`,position:"relative"});let y=document.createElement("input");y.placeholder="Buscar templates...",Object.assign(y.style,{width:"100%",padding:"10px 14px 10px 36px",borderRadius:"10px",border:"1.5px solid transparent",backgroundColor:"#E3E3E8",fontSize:"15px",outline:"none",boxSizing:"border-box",color:r.textPrimary,backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",transition:"all 0.2s ease-in-out"}),y.onfocus=()=>{y.style.backgroundColor="#FFFFFF",y.style.borderColor=r.primary,y.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)",y.style.transform="scale(1.02)"},y.onblur=()=>{y.style.backgroundColor="#E3E3E8",y.style.borderColor="transparent",y.style.boxShadow="none",y.style.transform="scale(1)"};let m=document.createElement("div");m.id="email-template-list",Object.assign(m.style,{flex:"1",overflowY:"auto",padding:"8px",scrollBehavior:"smooth"});let E=document.createElement("div");E.innerHTML="\u2715",Object.assign(E.style,{position:"absolute",right:"26px",top:"50%",transform:"translateY(-50%)",fontSize:"10px",color:"#fff",cursor:"pointer",display:"none",backgroundColor:"#C7C7CC",width:"16px",height:"16px",borderRadius:"50%",textAlign:"center",lineHeight:"16px",fontWeight:"bold"}),E.onclick=()=>{y.value="",n="",E.style.display="none",w(),y.focus()},f.appendChild(y),f.appendChild(E),x.appendChild(f),x.appendChild(m);let _=document.createElement("div");Object.assign(_.style,{flex:"1",display:"flex",flexDirection:"column",overflow:"hidden",backgroundColor:r.bgApp,transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"});let F=document.createElement("div");Object.assign(F.style,{padding:"20px",borderBottom:`1px solid ${r.borderSubtle}`,backgroundColor:r.bgSurface,maxHeight:"250px",overflowY:"auto",display:"none"});let q=document.createElement("div");Object.assign(q.style,{flex:"1",display:"flex",flexDirection:"column",padding:"20px",backgroundColor:r.bgApp,overflow:"hidden"});let $=document.createElement("div");Object.assign($.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"});let W=document.createElement("span");W.textContent="Preview do E-mail",Object.assign(W.style,{fontSize:"12px",fontWeight:"600",color:r.textSecondary,textTransform:"uppercase",letterSpacing:"0.5px"});let ae=document.createElement("div");Object.assign(ae.style,{display:"flex",gap:"8px"});let B=(O,R=!1)=>{let z=document.createElement("button");return z.textContent=O,Object.assign(z.style,{padding:"8px 14px",borderRadius:"10px",border:R?"none":`1.5px solid ${r.primary}`,background:R?r.primary:"transparent",color:R?"#fff":r.primary,fontSize:"13px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 1, 0.5, 1)",boxShadow:R?"0 4px 12px rgba(0, 122, 255, 0.3)":"none"}),z.onmouseenter=()=>{R?(z.style.backgroundColor="#0062CC",z.style.transform="translateY(-1px)",z.style.boxShadow="0 6px 16px rgba(0, 122, 255, 0.4)"):z.style.backgroundColor="rgba(0, 122, 255, 0.05)"},z.onmouseleave=()=>{R?(z.style.backgroundColor=r.primary,z.style.transform="translateY(0)",z.style.boxShadow="0 4px 12px rgba(0, 122, 255, 0.3)"):(z.style.backgroundColor="transparent",z.style.transform="translateY(0)")},z.onmousedown=()=>z.style.transform="scale(0.94)",z.onmouseup=()=>z.style.transform="scale(1)",z},I=B("Copiar HTML"),H=B("Preencher no CRM",!0),K=B("Smart CR");K.style.borderColor="#E67E22",K.style.color="#E67E22",K.style.display="none",ae.appendChild(K),ae.appendChild(I),ae.appendChild(H),$.appendChild(W),$.appendChild(ae);let G=document.createElement("div");G.contentEditable="true",Object.assign(G.style,{flex:"1",backgroundColor:r.bgSurface,border:`1px solid ${r.borderSubtle}`,borderRadius:"8px",padding:"20px",fontSize:"15px",lineHeight:"1.6",color:r.textPrimary,overflowY:"auto",outline:"none",boxShadow:"inset 0 1px 2px rgba(0,0,0,0.02)"}),q.appendChild($),q.appendChild(G),oe(),_.appendChild(F),_.appendChild(q),p.appendChild(x),p.appendChild(_),l.appendChild(c),l.appendChild(p);let D=document.createElement("div");Object.assign(D.style,qe),l.appendChild(D),_e(l,D),document.body.appendChild(l);function U(){e=!e,e?(l.style.display="flex",Kt(l),o.length===0&&h()):l.style.display="none",be(e,l,"cw-btn-email")}async function h(){m.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>',o=await vo.getTemplates(),w()}function w(){m.innerHTML="";let O=o.filter(v=>v.name.toLowerCase().includes(n.toLowerCase())||v.category.toLowerCase().includes(n.toLowerCase())),R=Object.entries(Je).filter(([v,k])=>k&&(v.toLowerCase().includes(n.toLowerCase())||k.toLowerCase().includes(n.toLowerCase()))).map(([v,k])=>({id:v,name:v.replace(/_/g," "),category:"\u26A1 Smart CRs",code:k,isSmartCR:!0})),z=Ee.getSnippets("email").filter(v=>v.title.toLowerCase().includes(n.toLowerCase())||v.subject&&v.subject.toLowerCase().includes(n.toLowerCase())).map(v=>{let k=[],b=v.content.match(/\[([^\]]+)\]/g);return b&&[...new Set(b)].forEach(S=>{k.push({key:S,label:S.replace("[","").replace("]",""),type:S.toLowerCase().includes("data")?"date":"text",auto:S.toLowerCase().includes("nome")&&S.toLowerCase().includes("seu")?"agentName":null})}),{id:v.id||`snippet-${Math.random()}`,name:v.title,category:"\u{1F464} Pessoal",subject:v.subject||"Sem Assunto",template:v.content,placeholders:k}}),Q=[...O,...R,...z];if(Q.length===0){m.innerHTML=`
                <div style="padding: 40px 20px; text-align: center; color: ${r.textSecondary}; opacity: 0.6;">
                    <div style="font-size: 32px; margin-bottom: 12px;">\u{1F50D}</div>
                    <div style="font-size: 14px; font-weight: 500;">Nenhum resultado para "${n}"</div>
                </div>`;return}[...new Set(Q.map(v=>v.category))].sort((v,k)=>v.localeCompare(k)).forEach(v=>{let k=s.has(v)||n.length>0,b=Q.filter(N=>N.category===v),S=document.createElement("div");Object.assign(S.style,{padding:"12px 16px 12px 24px",fontSize:"11px",fontWeight:"700",color:r.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",position:"sticky",top:"-8px",backgroundColor:"rgba(239, 239, 240, 0.9)",zIndex:"10",backdropFilter:"blur(20px)",margin:"0 -8px 8px -8px",borderBottom:`0.5px solid ${r.borderSubtle}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none",transition:"background-color 0.2s ease"}),S.onmouseenter=()=>S.style.backgroundColor="rgba(230, 230, 232, 0.9)",S.onmouseleave=()=>S.style.backgroundColor="rgba(239, 239, 240, 0.9)";let A=document.createElement("span");A.textContent=v,S.appendChild(A);let T=document.createElement("span");T.textContent=b.length,Object.assign(T.style,{backgroundColor:"rgba(0, 0, 0, 0.05)",padding:"2px 8px",borderRadius:"10px",fontSize:"10px",color:r.textSecondary});let u=document.createElement("span");u.innerHTML=k?"\u{10012A}":"\u{10012B}",u.innerHTML=k?"\u25BE":"\u25B8",u.style.marginLeft="8px",u.style.transition="transform 0.3s ease";let L=document.createElement("div");L.style.display="flex",L.style.alignItems="center",L.appendChild(T),L.appendChild(u),S.appendChild(L),S.onclick=()=>{s.has(v)?s.delete(v):s.add(v),w()},m.appendChild(S),k&&b.forEach(N=>{let X=a&&a.id===N.id,V=document.createElement("div");if(Object.assign(V.style,{padding:"12px 14px",fontSize:"14px",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",borderRadius:"10px",color:r.textPrimary,margin:"4px 6px",display:"flex",alignItems:"center",gap:"12px",backgroundColor:X?r.primary:r.bgSurface,boxShadow:X?"0 4px 12px rgba(0, 122, 255, 0.3)":"0 1px 2px rgba(0,0,0,0.05)",border:X?"none":`1px solid ${r.borderSubtle}`,position:"relative",overflow:"hidden"}),X){let ne=document.createElement("div");Object.assign(ne.style,{position:"absolute",left:"0",top:"0",bottom:"0",width:"4px",backgroundColor:"#fff",borderRadius:"0 4px 4px 0"}),V.appendChild(ne)}let te=document.createElement("span");te.innerHTML=N.isSmartCR?"\u26A1":N.category==="\u{1F464} Pessoal"?"\u{1F464}":"\u{1F4C4}",te.style.fontSize="12px",te.style.opacity="0.7",te.style.flexShrink="0",V.appendChild(te);let Y=document.createElement("span");Y.textContent=N.name,Y.style.overflow="hidden",Y.style.textOverflow="ellipsis",Y.style.whiteSpace="nowrap",Y.style.flex="1",V.appendChild(Y),X&&(V.style.color="#fff",V.style.fontWeight="600",te.style.opacity="1"),V.onmouseenter=()=>{X||(V.style.backgroundColor="#f8f8f9",V.style.transform="translateY(-1px) scale(1.01)",V.style.boxShadow="0 4px 8px rgba(0,0,0,0.08)",V.style.borderColor="rgba(0, 122, 255, 0.2)")},V.onmouseleave=()=>{X||(V.style.backgroundColor=r.bgSurface,V.style.transform="translateY(0) scale(1)",V.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",V.style.borderColor=r.borderSubtle)},V.onmousedown=()=>{V.style.transform=X?"scale(0.97)":"scale(0.98)"},V.onmouseup=()=>{V.style.transform=X?"scale(1)":"translateY(-1px) scale(1.01)"},V.onclick=()=>{M(N)},m.appendChild(V)})})}let C=null;async function M(O){a?.id!==O.id&&(a=O,C&&clearTimeout(C),_.style.opacity="0",_.style.transform="translateY(5px)",C=setTimeout(()=>{K.style.display=O.isSmartCR?"block":"none",H.style.display=O.isSmartCR?"none":"block",I.style.display=O.isSmartCR?"none":"block",w(),Z(),oe(),_.style.opacity="1",_.style.transform="translateY(0)",C=null},150))}function Z(){if(F.innerHTML="",!a||a.isSmartCR){a?.isSmartCR?(F.style.display="block",F.innerHTML=`<div style="padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">\u{1F4A1}</span>
                    <span>Este \xE9 um <b>Smart CR</b>. Clique no bot\xE3o laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`):F.style.display="none";return}let O=a.placeholders&&a.placeholders.length>0;if(F.style.display=O?"block":"none",!O)return;let R=document.createElement("div");Object.assign(R.style,{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}),(a.placeholders||[]).forEach(z=>{let Q=document.createElement("div"),d=document.createElement("label");d.textContent=z.label,Object.assign(d.style,{display:"block",fontSize:"11px",fontWeight:"700",color:r.textSecondary,marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.5px"});let v=document.createElement("input");v.type=z.type||"text",v.dataset.key=z.key,Object.assign(v.style,{width:"100%",padding:"10px 12px",borderRadius:"8px",border:`1.5px solid ${r.borderSubtle}`,backgroundColor:"#FBFBFD",fontSize:"14px",boxSizing:"border-box",transition:"all 0.2s ease",outline:"none"}),v.onfocus=()=>{v.style.borderColor=r.primary,v.style.backgroundColor="#FFFFFF",v.style.boxShadow="0 0 0 4px rgba(0, 122, 255, 0.1)"},v.onblur=()=>{v.style.borderColor=r.borderSubtle,v.style.backgroundColor="#FBFBFD",v.style.boxShadow="none"},z.auto==="agentName"&&(v.value=et().split(" ")[0]),v.addEventListener("input",oe),Q.appendChild(d),Q.appendChild(v),R.appendChild(Q)}),F.appendChild(R)}function oe(){if(!a){G.innerHTML=`
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
                </div>`;return}if(a.isSmartCR){G.innerHTML=`<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">\u26A1</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${a.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho ir\xE1 preencher automaticamente os destinat\xE1rios e abrir o menu de Canned Responses do CRM.</div></div>`;return}let O=a.template;(F.querySelectorAll("input")||[]).forEach(z=>{let Q=z.dataset.key,d=z.value;if(z.type==="date"&&d){let[k,b,S]=d.split("-");d=`${b}/${S}/${k}`}d=d||`<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${Q}</span>`;let v=Q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");O=O.replace(new RegExp(v,"g"),d)}),G.innerHTML=O}return y.addEventListener("input",O=>{n=O.target.value,E.style.display=n?"block":"none",w()}),I.onclick=()=>{let O=G.innerHTML,R=new Blob([O],{type:"text/html"}),z=G.innerText,Q=[new ClipboardItem({"text/html":R,"text/plain":new Blob([z],{type:"text/plain"})})];navigator.clipboard.write(Q).then(()=>ee("E-mail copiado com sucesso!"),()=>ee("Erro ao copiar e-mail",{error:!0}))},H.onclick=async()=>{if(!a)return;let O=ot(),R={...a,body:G.innerHTML};try{await fo(R),U()}catch{ee("Erro ao preencher e-mail",{error:!0})}finally{O()}},K.onclick=async()=>{if(!a||!a.isSmartCR)return;let O=ot();try{await vt(a.code),U()}catch{ee("Erro ao aplicar Smart CR",{error:!0})}finally{O()}},U}var Co={"PT BAU":{inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{inicio:["Introducci\xF3n (Nombre y Equipo).","La llamada puede ser grabada con fines de entrenamiento y calidad de acuerdo con nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xF3n.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar contenido sensible antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos pasos (\xBFCu\xE1nto tiempo seguir\xE1 el caso?)","Encuesta de Satisfacci\xF3n.","Estar\xE9 monitoreando su caso durante XX d\xEDas para asegurarme de que todo est\xE9 funcionando correctamente. Durante este tiempo, nuestro equipo de calidad podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la cuenta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condiciones.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las herramientas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfacci\xF3n.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes d\xEDas."]},"EN BAU":{inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function Eo(){let t="v3.0.0",e={bgApp:"#F5F5F7",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.07)",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",textPrimary:"#1D1D1F",textSecondary:"#6E6E73",shadowCard:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",success:"#34A853"},o="csa-local-styles";if(!document.getElementById(o)){let b=document.createElement("style");b.id=o,b.innerHTML=`
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
      `,document.head.appendChild(b)}let a={progressBarContainer:{height:"6px",background:e.borderSubtle,width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 3px 3px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:e.bgApp,scrollBehavior:"smooth"},card:{background:e.bgSurface,border:`1px solid ${e.borderSubtle}`,borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:e.shadowCard},cardTitle:{fontSize:"11px",fontWeight:"700",color:e.textSecondary,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"10px",transition:"all 0.2s ease",color:e.textPrimary,fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{background:"rgba(0, 0, 0, 0.02)"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"50%",border:`2px solid ${e.borderSubtle}`,marginRight:"12px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},n={},i="PT",s="BAU",r=!1,l=document.createElement("div");l.id="call-script-popup",l.classList.add("cw-module-window"),Object.assign(l.style,ye,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let g={popup:l,googleLine:null},c=null;function p(){r&&Fe().then(b=>{let S=l.querySelector("#cw-ctx-name"),A=l.querySelector("#cw-ctx-cid"),T=l.querySelector("#cw-ctx-email");if(S&&(S.textContent=b.advertiserName||"Cliente Desconhecido"),A){let u=b.cid||"---";A.textContent!==u&&(A.textContent=u)}if(T){let u=b.clientEmail||"N\xE3o encontrado";T.textContent!==u&&(T.textContent=u,T.title=u)}})}function x(){Fe().then(b=>{let S=new Date().toLocaleDateString("pt-BR"),A=l.querySelector("#cw-am-message-area"),T=l.querySelector("#cw-am-review-container"),u=`Ol\xE1. Bom dia!

Estou com um caso do seu cliente (${b.advertiserName||"Cliente"}) em andamento hoje (${S}). Fiz a primeira tentativa de contato agora h\xE1 pouco, mas n\xE3o tive sucesso.

Farei uma nova tentativa em alguns minutos. Caso ele n\xE3o atenda novamente, seguirei com o e-mail padr\xE3o de reagendamento/no-show e te mantenho no radar.

Dados do caso para seu controle:

Cliente: ${b.advertiserName||"---"}
CID: ${b.cid||"---"}
Case ID: ${b.caseId||"---"}
E-mail: ${b.clientEmail||"---"}`;A&&(A.value=u),T&&(T.style.display="block",T.style.maxHeight="300px",T.style.opacity="1",T.scrollIntoView({behavior:"smooth",block:"end"}))})}function f(){r=!r,be(r,l,"cw-btn-script"),r?(p(),c||(c=setInterval(p,2e3))):c&&(clearInterval(c),c=null)}let y=ge(l,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",g,()=>{f()});l.appendChild(y);let m=document.createElement("div");Object.assign(m.style,a.contextBanner),m.innerHTML=`
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
  `;let E=m.querySelector("#csa-toggle-options"),_=m.querySelector("#csa-options-content"),F=m.querySelector("#csa-options-arrow"),q=!1;E.onclick=()=>{q=!q,F.style.transform=q?"rotate(180deg)":"rotate(0deg)",_.style.maxHeight=q?"400px":"0",_.style.opacity=q?"1":"0",_.style.marginTop=q?"8px":"0",P.playClick()};let $=m.querySelector("#cw-pill-message"),W=m.querySelector("#cw-am-copy-final"),ae=m.querySelector("#cw-am-message-area");$.onmouseenter=()=>{$.style.borderColor="#007AFF",$.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},$.onmouseleave=()=>{$.style.borderColor="#DADCE0",$.style.boxShadow="0 1px 2px rgba(0,0,0,0.02)"},$.addEventListener("click",()=>{x()}),W.addEventListener("click",()=>{ae.value&&(navigator.clipboard.writeText(ae.value),ee("Mensagem copiada!"),P.playSuccess(),W.style.background="#34A853",W.textContent="Copiado!",setTimeout(()=>{W.style.background="#1A73E8",W.textContent="Copiar Mensagem Final"},2e3))});let B=(b,S)=>{let A=m.querySelector(b),T=m.querySelector(S);A.onclick=()=>{let u=T.textContent;!u||u.includes("---")||u.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(u),P.playSuccess(),A.classList.add("copied"),setTimeout(()=>A.classList.remove("copied"),1500))}};l.appendChild(m);let I=document.createElement("div");Object.assign(I.style,a.progressBarContainer);let H=document.createElement("div");H.className="csa-progress-fill",Object.assign(H.style,a.progressBarFill),I.appendChild(H),l.appendChild(I);let K=document.createElement("div");K.id="csa-content",Object.assign(K.style,a.contentArea),l.appendChild(K);let G=document.createElement("div");Object.assign(G.style,a.footer);let D=document.createElement("span");D.textContent="by lucaste@",Object.assign(D.style,{fontSize:"10px",color:"#bdc1c6"});let U=document.createElement("button");U.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(U.style,a.resetBtn),U.onmouseenter=()=>U.style.background="#fce8e6",U.onmouseleave=()=>U.style.background="transparent",U.onclick=()=>{U.style.transform="scale(0.9)",setTimeout(()=>U.style.transform="scale(1)",150);for(let b in n)delete n[b];d()},G.appendChild(D),G.appendChild(U),l.appendChild(G);let h=document.createElement("div");Object.assign(h.style,{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"16px"});let w=document.createElement("div");w.className="csa-segmented-control",w.innerHTML=`
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `;let C=document.createElement("div");C.className="csa-segmented-control",C.innerHTML=`
      <div class="csa-segmented-indicator" id="lang-indicator" style="width: calc(33.33% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-lang="PT">PT</button>
      <button data-lang="ES">ES</button>
      <button data-lang="EN">EN</button>
  `,h.appendChild(w),h.appendChild(C),K.appendChild(h);let M=w.querySelectorAll("button"),Z=w.querySelector("#type-indicator");M.forEach((b,S)=>{b.onclick=()=>{M.forEach(A=>A.classList.remove("active")),b.classList.add("active"),Z.style.transform=`translateX(${S*(w.offsetWidth/2-2)}px)`,s=b.dataset.type,P.playClick(),d()}});let oe=C.querySelectorAll("button"),O=C.querySelector("#lang-indicator");oe.forEach((b,S)=>{b.onclick=()=>{oe.forEach(A=>A.classList.remove("active")),b.classList.add("active"),O.style.transform=`translateX(${S*(C.offsetWidth/3-1)}px)`,i=b.dataset.lang,P.playClick(),d()}});let R=document.createElement("div");R.id="csa-checklist-area",K.appendChild(R);let z=document.createElement("div");Object.assign(z.style,qe),z.className="no-drag",z.title="Redimensionar",l.appendChild(z),_e(l,z),document.body.appendChild(l),B("#cw-pill-cid","#cw-ctx-cid"),B("#cw-pill-email","#cw-ctx-email");function Q(b){return b}function d(){R.innerHTML="";let b=`${i} ${s}`,S=Co[b];if(!S){R.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',H.style.width="0%";return}let A=e.primary,T=0,u=0;["inicio","meio","fim"].forEach(L=>{S[L]&&(T+=S[L].length)}),["inicio","meio","fim"].forEach((L,N)=>{let X=S[L];if(!X||X.length===0)return;let V=document.createElement("div");Object.assign(V.style,a.card);let te=document.createElement("div");Object.assign(te.style,a.cardTitle);let Y="";L==="inicio"?i.includes("ES")?Y="Apertura":i.includes("EN")?Y="Opening":Y="Abertura":L==="meio"?i.includes("ES")?Y="Implementaci\xF3n":i.includes("EN")?Y="Implementation":Y="Implementa\xE7\xE3o (Tag Support)":L==="fim"&&(i.includes("ES")?Y="Cierre":i.includes("EN")?Y="Closing":Y="Fechamento"),te.textContent=Y;let ne=document.createElement("span");ne.style.fontSize="11px",ne.style.opacity="0.7",ne.style.fontWeight="500",ne.style.background="#f1f3f4",ne.style.padding="2px 8px",ne.style.borderRadius="10px",te.appendChild(ne),V.appendChild(te);let le=0;X.forEach((Ae,Se)=>{let Oe=`${b}-${L}-${Se}`,We=!!n[Oe];We&&(u++,le++);let Ce=document.createElement("div");Object.assign(Ce.style,a.itemRow);let pe=document.createElement("div");Object.assign(pe.style,a.checkbox);let Me=document.createElement("span");Me.className="csa-item-text"+(We?" completed":""),Me.innerHTML=Ae,Me.style.flex="1",We?(Object.assign(Ce.style,a.itemCompleted),pe.style.background=A,pe.style.borderColor=A,pe.style.transform="scale(1)",pe.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(pe.style.background="transparent",pe.style.borderColor=e.borderSubtle,pe.style.transform="scale(1)",pe.innerHTML=""),Ce.onclick=()=>{let Rt=!n[Oe];n[Oe]=Rt,P.playClick(),Rt?(pe.style.transform="scale(1.15)",setTimeout(()=>pe.style.transform="scale(1)",150),Object.assign(Ce.style,a.itemCompleted),Me.classList.add("completed"),pe.style.background=A,pe.style.borderColor=A,pe.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(Ce.style.background="transparent",Me.classList.remove("completed"),pe.style.background="transparent",pe.style.borderColor=e.borderSubtle,pe.innerHTML=""),v(b,S)},Ce.onmouseenter=()=>{n[Oe]||(Ce.style.background="rgba(0, 0, 0, 0.03)",pe.style.borderColor=A)},Ce.onmouseleave=()=>{n[Oe]||(Ce.style.background="transparent",pe.style.borderColor=e.borderSubtle)},Ce.appendChild(pe),Ce.appendChild(Me),V.appendChild(Ce)}),le===X.length&&X.length>0&&(ne.style.color="#1e8e3e",ne.style.background="#e6f4ea",V.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),ne.textContent=`${le}/${X.length}`,R.appendChild(V)}),k(T,u)}function v(b,S){let A=0,T=0;["inicio","meio","fim"].forEach(u=>{let L=S[u]||[];A+=L.length,L.forEach((N,X)=>{n[`${b}-${u}-${X}`]&&T++})}),k(A,T),setTimeout(()=>d(),200)}function k(b,S){let A=b===0?0:S/b*100;H.style.width=`${A}%`,A===100?(H.style.background=e.success,H.classList.remove("csa-progress-fill")):(H.style.background="",H.classList.add("csa-progress-fill"))}return d(),f}var nt={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Ue={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},wt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},Mt="cw_link_history_v4";function Ao(t,e){try{let o=JSON.parse(localStorage.getItem(Mt)||"[]");o=o.filter(a=>a.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(Mt,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function ca(){try{return JSON.parse(localStorage.getItem(Mt)||"[]")}catch{return[]}}function ko(){let t="v4.6",e="",o=!1,a=null,n=!1,i={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},s=document.createElement("div");s.id="links-popup",s.classList.add("cw-module-window"),Object.assign(s.style,ye,{right:"100px",width:"600px",height:"650px",background:i.bgApp,overflow:"hidden"});let l=ge(s,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:s,googleLine:null},()=>G());s.appendChild(l);let g=document.createElement("div");g.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",s.appendChild(g);let c=document.createElement("div");c.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${i.bgSidebar};
      border-right: 1px solid ${i.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,g.appendChild(c);let p=document.createElement("div");p.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",g.appendChild(p);let x=document.createElement("div");x.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let f=document.createElement("div");f.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let y=document.createElement("div");y.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',y.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let m=document.createElement("input");m.type="text",m.placeholder="Buscar ferramenta ou SOP...",m.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${i.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,m.onfocus=()=>{f.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",f.style.border="1px solid #1a73e8"},m.onblur=()=>{f.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",f.style.border="1px solid transparent"},f.appendChild(y),f.appendChild(m),x.appendChild(f),p.appendChild(x);let E=document.createElement("div");E.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",p.appendChild(E);let _=null;function F(){if(_)return;_=document.createElement("div"),_.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let D=document.createElement("div");D.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",D.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let U=document.createElement("button");U.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',U.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",U.onclick=()=>{$(),n=!1,I()},D.appendChild(U),_.appendChild(D);let h=document.createElement("div");h.id="cw-history-list",h.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",_.appendChild(h),p.appendChild(_)}function q(){_||F();let D=_.querySelector("#cw-history-list");D.innerHTML="";let U=ca();U.length===0?D.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':U.forEach(h=>{let w=K(h,Ue[h._originalCat],!0,h._originalCat);D.appendChild(w)}),requestAnimationFrame(()=>_.style.transform="translateY(0)")}function $(){_&&(_.style.transform="translateY(100%)")}function W(){c.innerHTML="";let D=ae("history","Recentes",Ue.history);D.id="cw-sidebar-btn-history",D.onclick=()=>{P.playClick(),n=!n,n?q():$(),I()},c.appendChild(D);let U=document.createElement("div");U.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",c.appendChild(U),Object.keys(nt).forEach(h=>{let w=nt[h],C=ae(h,w.label,Ue[h]);C.id=`cw-sidebar-btn-${h}`,C.onclick=()=>{P.playClick(),n&&(n=!1,$()),B(h)},c.appendChild(C)})}function ae(D,U,h){let w=document.createElement("div");w.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${i.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,w.title=U,w.dataset.key=D;let C=document.createElement("div");C.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",C.innerHTML=h||Ue.tasks;let M=document.createElement("div");return M.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",M.textContent=U,w.appendChild(C),w.appendChild(M),w.onmouseenter=()=>{a!==D&&!(D==="history"&&n)&&(w.style.background="#F1F3F4",C.style.transform="scale(1.1)")},w.onmouseleave=()=>{a!==D&&!(D==="history"&&n)&&(w.style.background="transparent",C.style.transform="scale(1)")},w}function B(D){let U=document.getElementById(`cat-anchor-${D}`);U&&(U.scrollIntoView({behavior:"smooth",block:"start"}),a=D,I())}function I(){Object.keys(nt).forEach(U=>{let h=c.querySelector(`#cw-sidebar-btn-${U}`);if(h)if(a===U&&!n){let w=wt[U];h.style.background=w.bg,h.style.color=w.color,h.querySelector("div:first-child").style.transform="scale(1.1)"}else h.style.background="transparent",h.style.color=i.textSecondary,h.querySelector("div:first-child").style.transform="scale(1)"});let D=c.querySelector("#cw-sidebar-btn-history");D&&(n?(D.style.background="#3C4043",D.style.color="#FFFFFF"):(D.style.background="transparent",D.style.color=i.textSecondary))}function H(){if(E.innerHTML="",e.trim()!==""){let U=[];if(Object.entries(nt).forEach(([w,C])=>{let M=C.links.filter(Z=>Z.name.toLowerCase().includes(e.toLowerCase())||Z.desc.toLowerCase().includes(e.toLowerCase()));U.push(...M.map(Z=>({...Z,_cat:w})))}),U.length===0){E.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let h=document.createElement("div");h.innerHTML="Resultados da busca",h.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",E.appendChild(h),U.forEach(w=>{let C=K(w,Ue[w._cat],!1,w._cat);E.appendChild(C)});return}Object.entries(nt).forEach(([U,h])=>{let w=wt[U],C=document.createElement("div"),M=document.createElement("div");M.id=`cat-anchor-${U}`,M.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${w.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,M.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${w.color};"></div>
            ${h.label}
          `,C.appendChild(M);let Z=document.createElement("div");Z.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",h.links.forEach(oe=>{let O=K(oe,Ue[U],!1,U);Z.appendChild(O)}),C.appendChild(Z),E.appendChild(C)});let D=document.createElement("div");D.style.height="80px",E.appendChild(D)}function K(D,U,h,w){let C=document.createElement("div"),M=wt[w]||wt.history;C.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let Z=document.createElement("div");Z.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${M.bg}; color: ${M.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,Z.innerHTML=U||Ue.tasks;let oe=Z.querySelector("svg");oe&&(oe.style.width="22px",oe.style.height="22px");let O=document.createElement("div");O.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let R=document.createElement("div");R.style.cssText=`font-size: 14px; font-weight: 600; color: ${i.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,R.textContent=D.name;let z=document.createElement("div");z.style.cssText=`font-size: 12px; color: ${i.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,z.textContent=D.desc,O.appendChild(R),O.appendChild(z);let Q=document.createElement("div");return Q.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Q.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,Q.title="Copiar URL",C.onmouseenter=()=>{C.style.transform="translateY(-2px)",C.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",C.style.borderColor="rgba(0,0,0,0.05)",C.style.borderLeft=`4px solid ${M.color}`,Q.style.opacity="1",Q.style.background="#F1F3F4"},C.onmouseleave=()=>{C.style.transform="translateY(0)",C.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",C.style.border="1px solid transparent",Q.style.opacity="0",Q.style.background="transparent"},C.onclick=()=>{!h&&w&&Ao(D,w),window.open(D.url,"_blank")},Q.onclick=d=>{d.stopPropagation(),P.playClick(),navigator.clipboard.writeText(D.url),!h&&w&&Ao(D,w),ee("Link copiado!")},C.appendChild(Z),C.appendChild(O),C.appendChild(Q),C}m.addEventListener("input",D=>{e=D.target.value,H()});function G(){o=!o,be(o,s,"cw-btn-links")}return document.body.appendChild(s),W(),H(),G}var Be=[];function Nt(t){Be=t}var da=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function To(){let t="v4.9",e=!1,o=null,a=null;function n(h){if(!h)return"";try{let w=new Date(h);return isNaN(w.getTime())?String(h):w.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(h)}}if(!document.getElementById("cw-broadcast-hd-css")){let h=document.createElement("style");h.id="cw-broadcast-hd-css",h.innerHTML=`
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
      `,document.head.appendChild(h)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},s={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(h){if(!h||typeof h!="string")return"";let w=h;return w=w.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),w=w.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),w=w.replace(/_(.*?)_/g,"<i>$1</i>"),w=w.replace(/\n/g,"<br>"),w=Zt(w),w}let l=document.createElement("div");l.id="broadcast-popup",l.classList.add("cw-module-window"),Object.assign(l.style,ye,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let g={popup:l,googleLine:null};function c(){if(e=!e,be(e,l,"cw-btn-broadcast"),e){let h=document.getElementById("cw-btn-broadcast");h&&h.classList.remove("has-new"),ae()}}let p=ge(l,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",g,()=>c()),x=p.querySelector(".cw-header-actions")||p.lastElementChild,f=null;function y(){let h=null;try{h=fe()}catch{console.warn("TechSol: Auth Pending")}if(h){let w=h.split("@")[0].toLowerCase(),C=gt.includes(w);if(window._cwIsAdmin=C,window._cwCurrentUser=w,C&&x&&!x.querySelector("#cw-admin-btn")){let M=document.createElement("div");M.id="cw-admin-btn",M.className="cw-btn-interactive",M.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(M.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),M.title="Novo Aviso",M.onclick=Z=>{Z.stopPropagation(),_()},x.insertBefore(M,x.firstChild),f||E(),I()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(y,2e3))}if(x){let h=document.createElement("button");h.textContent="Limpar",h.className="cw-btn-interactive",Object.assign(h.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),h.onclick=w=>{w.stopPropagation(),P.playSuccess();let C=Be.map(M=>M.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(C)),I(),B()},x.insertBefore(h,x.firstChild)}l.appendChild(p);let m=document.createElement("div");m.id="cw-update-status",m.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",l.appendChild(m);function E(){f=document.createElement("div"),f.className="cw-editor-overlay",f.innerHTML=`
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
      `,f.querySelectorAll('input[name="cw-bc-type"]').forEach(M=>{M.addEventListener("change",()=>{f.querySelectorAll(".cw-radio-option").forEach(Z=>Z.classList.remove("checked")),M.parentElement.classList.add("checked")})}),setTimeout(()=>{let M=f.querySelector(".cw-radio-option.info");M&&M.classList.add("checked")},100);let h=f.querySelector("#cw-bc-cancel"),w=f.querySelector("#cw-bc-close-x"),C=f.querySelector("#cw-bc-send");h.onclick=F,w.onclick=F,C.onclick=q,l.appendChild(f)}function _(h=null){if(!f)return;let w=f.querySelector("#cw-editor-title-label"),C=f.querySelector("#cw-bc-title"),M=f.querySelector("#cw-bc-text"),Z=f.querySelector("#cw-bc-send");if(h){a=h.id,w.textContent="Editar Aviso",C.value=h.title||"",M.value=h.text||"",Z.textContent="Salvar Altera\xE7\xF5es";let oe=h.type||"info",O=f.querySelector(`input[name="cw-bc-type"][value="${oe}"]`);O&&O.click()}else{a=null,w.textContent="Novo Aviso",C.value="",M.value="",Z.textContent="Publicar";let oe=f.querySelector('input[name="cw-bc-type"][value="info"]');oe&&oe.click()}f.classList.add("active"),setTimeout(()=>C.focus(),300)}function F(){f&&f.classList.remove("active"),a=null}async function q(){let h=f.querySelector("#cw-bc-send"),w=f.querySelector("#cw-bc-title"),C=f.querySelector("#cw-bc-text"),M=f.querySelector('input[name="cw-bc-type"]:checked'),Z=M?M.value:"info";if(!w.value.trim()||!C.value.trim()){ee("Preencha todos os campos!",{error:!0});return}h.textContent="Salvando...",h.style.opacity="0.7";let oe=!1;a?oe=await ce.updateBroadcast(a,{title:w.value,text:C.value,type:Z}):oe=await ce.sendBroadcast({title:w.value,text:C.value,type:Z,author:window._cwCurrentUser||"admin"}),oe?(ee(a?"Atualizado!":"Publicado!"),P.playSuccess(),F(),setTimeout(()=>ae(),1500)):(ee("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),h.textContent=a?"Salvar Altera\xE7\xF5es":"Publicar",h.style.opacity="1")}async function $(h){if(await ve("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await ce.deleteBroadcast(h)){ee("Aviso removido."),P.playClick();let M=Be.findIndex(Z=>Z.id===h);M>-1&&Be.splice(M,1),I(),setTimeout(()=>ae(),1500)}else ee("Erro ao excluir.",{error:!0})}let W=document.createElement("div");W.className="cw-nice-scroll",Object.assign(W.style,i.feedContainer),l.appendChild(W);async function ae(){e&&(m.style.display="block",m.innerHTML="\u{1F504} Sincronizando...");try{let h=await ce.fetchData();h&&h.broadcast&&(Nt(h.broadcast),B(),e&&(I(),m.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{m.style.display="none"},1500)))}catch{e&&(m.innerHTML="\u26A0\uFE0F Offline")}}function B(){let h=document.getElementById("cw-btn-broadcast");if(!h)return;let w=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Be.some(M=>!w.includes(M.id))){if(h.classList.add("has-new"),!h.querySelector(".cw-badge")){let M=document.createElement("div");M.className="cw-badge",Object.assign(M.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),h.appendChild(M)}}else{h.classList.remove("has-new");let M=h.querySelector(".cw-badge");M&&M.remove()}}function I(){W.innerHTML="";let h=l.querySelector("#cw-bau-widget");h&&h.remove();let w=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),C=[...Be].sort((R,z)=>{let Q=new Date(R.date).getTime()||0;return(new Date(z.date).getTime()||0)-Q}),M=C.findIndex(R=>R.title&&R.title.toLowerCase().includes("disponibilidade bau"));if(M!==-1){let R=C[M];C.splice(M,1);let z=document.createElement("div");z.id="cw-bau-widget",Object.assign(z.style,i.bauContainer);let Q=[],d=(R.text||"").split(`
`),v=/\d{1,2}\/\d{1,2}/,k="\u{1F4C5}";if(d.forEach(u=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(u)?k="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(u)&&(k="\u{1F1EA}\u{1F1F8}");let L=u.match(v);if(L){let N=L[0],X=k;/🇧🇷|🇵🇹|PT|BR/i.test(u)?X="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(u)&&(X="\u{1F1EA}\u{1F1F8}"),Q.some(te=>te.flag===X&&te.date===N)||Q.push({flag:X,date:N})}}),Q.length===0){let u=(R.text||"").match(/\d{1,2}\/\d{1,2}/g);u&&[...new Set(u)].forEach(L=>Q.push({flag:"\u{1F4C5}",date:L}))}let b="",S='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(S=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${S}
              `),Q.length>0?b=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${Q.map(L=>`
                  <div style="${xe(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${xe(i.bauFlag)}">${L.flag}</span>
                      <span style="${xe(i.bauDate)}">${L.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${S}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${r(R.text)}</div>
              `:b=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${r(R.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,z.innerHTML=`
              <div style="${xe(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${xe(i.liveIndicator)}">
                      <div style="${xe(i.pulseDot)}"></div>
                      <span style="${xe(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${n(R.date)}</div>
              </div>
              ${b}
          `,m.after(z);let A=z.querySelector("#cw-bau-toggle-btn"),T=z.querySelector("#cw-bau-full");if(A&&T&&(A.onclick=()=>{let u=T.style.display==="none";T.style.display=u?"block":"none",A.textContent=u?"Ocultar":"Detalhes"}),window._cwIsAdmin){let u=z.querySelector(".cw-bau-edit");u&&(u.onclick=()=>_(R))}}let Z=C.sort((R,z)=>{let Q=w.includes(R.id),d=w.includes(z.id);return Q===d?0:Q?1:-1});if(Z.length===0&&!M){let R=document.createElement("div");Object.assign(R.style,i.emptyState),R.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,W.appendChild(R)}let oe=Z.filter(R=>!w.includes(R.id)),O=Z.filter(R=>w.includes(R.id));if(oe.forEach(R=>W.appendChild(H(R,!1))),O.length>0){let R=document.createElement("div");Object.assign(R.style,i.historyDivider),R.innerHTML=`<span>Hist\xF3rico (${O.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let z=document.createElement("div");Object.assign(z.style,i.historyContainer),O.forEach(d=>z.appendChild(H(d,!0)));let Q=!1;R.onclick=()=>{P.playClick(),Q=!Q,z.style.display=Q?"flex":"none",R.querySelector("svg").style.transform=Q?"rotate(180deg)":"rotate(0deg)"},W.appendChild(R),W.appendChild(z)}}function H(h,w){let C=document.createElement("div");Object.assign(C.style,w?i.cardHistory:i.card);let M=s[h.type]||s.info,Z=document.createElement("div");Object.assign(Z.style,i.cardHeader);let oe=document.createElement("div");Object.assign(oe.style,i.typeTag,{color:M.color,background:M.bg}),oe.innerHTML=`${M.icon} <span>${h.type}</span>`;let O=document.createElement("span");if(Object.assign(O.style,i.dateTag),O.textContent=n(h.date),Z.appendChild(oe),w)Z.appendChild(O);else{let v=document.createElement("button");v.className="cw-btn-interactive",Object.assign(v.style,i.dismissBtn),v.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',v.onmouseenter=()=>{v.style.color="#1e8e3e",v.style.background="#e6f4ea",v.style.borderColor="#1e8e3e"},v.onmouseleave=()=>{v.style.color="#5f6368",v.style.background="#fff",v.style.borderColor="rgba(0,0,0,0.1)"},v.onclick=k=>{k.stopPropagation(),P.playClick(),C.style.transform="translateX(20px)",C.style.opacity="0",setTimeout(()=>{let b=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");b.push(h.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(b)),I(),B()},200)},Z.appendChild(v)}let R=document.createElement("div");Object.assign(R.style,i.cardContent);let z=document.createElement("div");Object.assign(z.style,i.msgTitle),z.textContent=h.title;let Q=document.createElement("div");Object.assign(Q.style,i.msgBody),Q.innerHTML=r(h.text);let d=document.createElement("div");if(Object.assign(d.style,i.msgMeta),d.innerHTML=`Publicado por <b>${h.author||"Sistema"}</b>`,w||(d.innerHTML+=` \u2022 ${n(h.date)}`),R.appendChild(z),R.appendChild(Q),R.appendChild(d),C.appendChild(Z),C.appendChild(R),window._cwIsAdmin){let v=document.createElement("div");v.className="cw-card-actions";let k=document.createElement("button");k.className="cw-action-btn edit",k.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',k.onclick=()=>_(h);let b=document.createElement("button");b.className="cw-action-btn delete",b.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',b.onclick=()=>$(h.id),v.appendChild(k),v.appendChild(b),C.appendChild(v)}return C}let K=ce.getCachedBroadcasts();K.length>0&&(Nt(K),I()),setTimeout(y,500),ae(),o||(o=setInterval(ae,da));let G=document.createElement("div");Object.assign(G.style,qe),G.className="no-drag",l.appendChild(G),_e(l,G),document.body.appendChild(l);let D=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),U=Be.some(h=>!D.includes(h.id));return{toggle:c,hasUnread:U}}function Fo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},a=document.createElement("div");Object.assign(a.style,o.overlay);let n=document.createElement("div");Object.assign(n.style,o.card);let i=document.createElement("div");Object.assign(i.style,o.icon);let s=document.createElement("div");Object.assign(s.style,o.title);let r=document.createElement("div");Object.assign(r.style,o.text);let l=document.createElement("div");Object.assign(l.style,o.dotsContainer);let g=document.createElement("div");Object.assign(g.style,o.btnContainer);let c=document.createElement("button");c.textContent="Pular",Object.assign(c.style,o.btn,o.btnSkip),c.onmouseover=()=>c.style.color="#202124",c.onmouseout=()=>c.style.color="#5f6368";let p=document.createElement("button");p.textContent="Pr\xF3ximo",Object.assign(p.style,o.btn,o.btnNext),p.onmouseover=()=>p.style.transform="scale(1.05)",p.onmouseout=()=>p.style.transform="scale(1)",g.appendChild(c),g.appendChild(p),n.appendChild(i),n.appendChild(s),n.appendChild(r),n.appendChild(l),n.appendChild(g),a.appendChild(n),document.body.appendChild(a);function x(y){let m=t[y];i.textContent=m.icon,s.textContent=m.title,r.textContent=m.text,l.innerHTML="",t.forEach((E,_)=>{let F=document.createElement("div");Object.assign(F.style,o.dot),_===y&&Object.assign(F.style,o.dotActive),l.appendChild(F)}),m.isLast?(c.style.display="none",p.textContent="Come\xE7ar \u{1F680}",p.style.width="100%"):(c.style.display="block",p.textContent="Pr\xF3ximo",p.style.width="auto")}function f(){localStorage.setItem("cw_onboarding_seen_v1","true"),a.style.opacity="0",n.style.transform="translateY(20px)",setTimeout(()=>a.remove(),400),P.playSuccess(),ee("Tudo pronto! Use o menu flutuante.")}p.onclick=()=>{P.playClick(),e<t.length-1?(e++,x(e)):f()},c.onclick=async()=>{await ve("Pular o tutorial?")&&f()},x(0),requestAnimationFrame(()=>{a.style.opacity="1",n.style.transform="translateY(0)"})}var Io={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function Lo(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&pa(t)}function pa(t){let e=Io.slides,o=0,a={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,a.overlay);let i=document.createElement("div");Object.assign(i.style,a.card);let s=document.createElement("div");Object.assign(s.style,a.badge),s.textContent=`Atualiza\xE7\xE3o ${t}`;let r=document.createElement("div");Object.assign(r.style,a.icon);let l=document.createElement("div");Object.assign(l.style,a.title);let g=document.createElement("div");Object.assign(g.style,a.text);let c=document.createElement("div");Object.assign(c.style,a.dotsContainer);let p=document.createElement("button");Object.assign(p.style,a.btn),p.onmouseover=()=>p.style.transform="scale(1.02)",p.onmouseout=()=>p.style.transform="scale(1)",i.appendChild(s),i.appendChild(r),i.appendChild(l),i.appendChild(g),i.appendChild(c),i.appendChild(p),n.appendChild(i),document.body.appendChild(n);function x(y){let m=e[y];r.textContent=m.icon,l.textContent=m.title,g.textContent=m.text,c.innerHTML="",e.forEach((E,_)=>{let F=document.createElement("div");Object.assign(F.style,a.dot),_===y&&Object.assign(F.style,a.dotActive),c.appendChild(F)}),y===e.length-1?p.textContent="Entendi, vamos l\xE1! \u{1F44D}":p.textContent="Pr\xF3ximo"}function f(){localStorage.setItem("cw_last_version",t),n.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>n.remove(),400),P.playSuccess(),ee(`TechSol atualizado para ${t}!`)}p.onclick=()=>{P.playClick(),o<e.length-1?(o++,x(o)):f()},x(0),requestAnimationFrame(()=>{n.style.opacity="1",i.style.transform="translateY(0)"})}var Oo="cw_timezone_pinned",zt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],ua=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function qo(){let t="v2.2 Pro",e=!1,o=null,a="mx",n=JSON.parse(localStorage.getItem(Oo)||"[]"),i="",s="all",r=new Date;r.setHours(14,0,0,0);let l={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},g={container:{display:"flex",flexDirection:"column",height:"100%",background:l.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:l.surface,borderBottom:`1px solid ${l.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:l.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:l.primary,borderBottomColor:l.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:l.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:l.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${l.border}`,background:l.surface,color:l.textSub,transition:"all 0.2s"},chipActive:{background:l.primaryBg,color:l.primary,borderColor:l.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:l.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${l.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:l.surface,border:`1px solid ${l.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:l.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},c=document.createElement("div");c.id="timezone-popup",c.classList.add("cw-module-window"),Object.assign(c.style,ye,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let x=ge(c,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:c},()=>C());c.appendChild(x);let f=document.createElement("div");Object.assign(f.style,g.container),c.appendChild(f);let y=document.createElement("div");Object.assign(y.style,g.tabHeader);let m=document.createElement("div");m.textContent="Monitoramento",Object.assign(m.style,g.tabBtn,g.tabActive);let E=document.createElement("div");E.textContent="Planejador",Object.assign(E.style,g.tabBtn),y.appendChild(m),y.appendChild(E),f.appendChild(y);let _=document.createElement("div");Object.assign(_.style,g.toolbar);let F=document.createElement("div");Object.assign(F.style,g.searchInputWrapper);let q=document.createElement("div");q.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(q.style,g.searchIcon);let $=document.createElement("input");$.placeholder="Buscar cidade ou pa\xEDs...",Object.assign($.style,g.searchInput),$.onfocus=()=>{$.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",$.style.borderColor="rgba(26,115,232,0.3)"},$.onblur=()=>{$.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",$.style.borderColor="transparent"},$.oninput=M=>{i=M.target.value.toLowerCase(),D()},F.appendChild(q),F.appendChild($),_.appendChild(F);let W=document.createElement("div");Object.assign(W.style,g.chipsRow),ua.forEach(M=>{let Z=document.createElement("div");Z.textContent=M.label,Z.id=`tz-filter-${M.id}`,Object.assign(Z.style,g.chip),M.id===s&&Object.assign(Z.style,g.chipActive),Z.onclick=()=>{P.playClick(),s=M.id,Array.from(W.children).forEach(oe=>{Object.assign(oe.style,g.chip)}),Object.assign(Z.style,g.chipActive),D()},W.appendChild(Z)}),_.appendChild(W),f.appendChild(_);let ae=document.createElement("div");Object.assign(ae.style,g.listContainer);let B=document.createElement("style");B.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",f.appendChild(B);let I=document.createElement("div");Object.assign(I.style,g.plannerWrapper,{display:"none"}),f.appendChild(ae),f.appendChild(I),m.onclick=()=>H("live"),E.onclick=()=>H("plan");function H(M){P.playClick(),M==="live"?(Object.assign(m.style,g.tabActive),Object.assign(E.style,g.tabBtn),E.style.borderBottomColor="transparent",ae.style.display="flex",_.style.display="flex",I.style.display="none",h()):(Object.assign(E.style,g.tabActive),Object.assign(m.style,g.tabBtn),m.style.borderBottomColor="transparent",I.style.display="flex",ae.style.display="none",_.style.display="none",w(),U())}function K(M){return M>=9&&M<17?{color:l.success,bg:l.successBg,label:"Aberto",icon:"\u{1F7E2}"}:M>=8&&M<9?{color:l.warning,bg:l.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:M>=17&&M<19?{color:l.warning,bg:l.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:l.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function G(M){n.includes(M)?n=n.filter(Z=>Z!==M):n.push(M),localStorage.setItem(Oo,JSON.stringify(n)),D(),P.playClick()}function D(){ae.innerHTML="";let M=new Date,Z=zt.filter(O=>{let R=O.name.toLowerCase().includes(i)||O.label.toLowerCase().includes(i),z=s==="all"||O.region===s;return R&&z});if(Z.sort((O,R)=>{let z=n.includes(O.id),Q=n.includes(R.id);return z&&!Q?-1:!z&&Q?1:O.name.localeCompare(R.name)}),Z.length===0){ae.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}Z.forEach(O=>{let R=n.includes(O.id),z=M.toLocaleTimeString("pt-BR",{timeZone:O.zone,hour:"2-digit",minute:"2-digit"}),Q=parseInt(z.split(":")[0]),d=K(Q),v=Q<6||Q>18,k=document.createElement("div");Object.assign(k.style,g.hubCard),R&&Object.assign(k.style,g.hubCardPinned);let b=R?"\u2605":"\u2606",S=R?"#F9AB00":"#DADCE0";k.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${S}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${b}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${O.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${l.text}; letter-spacing:-0.2px;">${O.name}</div>
                        <div style="font-size:12px; color:${l.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${v?"\u{1F319}":"\u2600\uFE0F"} ${O.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${l.text}; font-family:'Google Sans', sans-serif;">${z}</div>
                    <div style="font-size:11px; font-weight:600; color:${d.color}; background:${d.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${d.label}
                    </div>
                </div>
            `,k.onmouseenter=()=>{k.style.transform="translateY(-2px)",k.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},k.onmouseleave=()=>{k.style.transform="translateY(0)",k.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let A=k.querySelector(".cw-pin-btn");A.onmouseenter=()=>{A.style.backgroundColor="#F1F3F4"},A.onmouseleave=()=>{A.style.backgroundColor="transparent"},A.onclick=T=>{T.stopPropagation(),G(O.id)},k.onclick=()=>{a=O.id,H("plan")},ae.appendChild(k)});let oe=document.createElement("div");oe.style.height="20px",oe.style.width="100%",ae.appendChild(oe)}function U(){I.innerHTML="";let M=document.createElement("div"),Z=document.createElement("label");Z.textContent="Onde est\xE1 o cliente?",Z.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let oe=document.createElement("select");Object.assign(oe.style,Xt),oe.style.padding="14px",[...zt].sort((te,Y)=>te.name.localeCompare(Y.name)).forEach(te=>{let Y=document.createElement("option");Y.value=te.id,Y.textContent=`${te.flag} ${te.name} (${te.zone})`,te.id===a&&(Y.selected=!0),oe.appendChild(Y)}),oe.onchange=te=>{a=te.target.value,V(),P.playClick()},M.appendChild(Z),M.appendChild(oe),I.appendChild(M);let R=document.createElement("div");Object.assign(R.style,g.timeComparisonRow);let z=document.createElement("div");Object.assign(z.style,g.timeCard),z.style.backgroundColor="#F8FAFF",z.style.borderColor="#E8F0FE",z.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let Q=document.createElement("div");Object.assign(Q.style,g.timeCard),Q.style.backgroundColor="#FFF8E1",Q.style.borderColor="#FEF7E0",Q.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,R.appendChild(z),R.appendChild(Q),I.appendChild(R);let d=document.createElement("div");d.id="cw-planner-status",Object.assign(d.style,g.statusBadge),I.appendChild(d);let v=document.createElement("div");Object.assign(v.style,{padding:"0 4px",marginTop:"12px"});let k=document.createElement("div");k.textContent="Arraste para simular o hor\xE1rio:",k.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let b=document.createElement("div");Object.assign(b.style,g.timelineContainer);let S=document.createElement("div");Object.assign(S.style,g.timelineTrack);let A=document.createElement("div");Object.assign(A.style,g.dayZone),S.appendChild(A);let T=document.createElement("input");T.type="range",T.min="0",T.max="1439",T.step="15",T.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let u=document.createElement("div");u.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",u.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",b.appendChild(S),b.appendChild(T),b.appendChild(u),v.appendChild(k),v.appendChild(b),I.appendChild(v);let L=z.querySelector("#cw-time-input-br"),N=Q.querySelector("#cw-time-display-client"),X=Q.querySelector("#cw-client-label");function V(){let te=zt.find(Oe=>Oe.id===a);X.textContent=`${te.flag} ${te.label} (${te.zone})`;let Y=r.getHours(),ne=r.getMinutes(),le=`${String(Y).padStart(2,"0")}:${String(ne).padStart(2,"0")}`;L.value=le,T.value=Y*60+ne;let Ae=r.toLocaleTimeString("pt-BR",{timeZone:te.zone,hour:"2-digit",minute:"2-digit"});N.textContent=Ae;let Se=parseInt(Ae.split(":")[0]);Se>=9&&Se<17?(d.style.background=l.successBg,d.style.color=l.success,d.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):Se>=8&&Se<9||Se>=17&&Se<19?(d.style.background=l.warningBg,d.style.color=l.warning,d.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(d.style.background=l.errorBg,d.style.color=l.error,d.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}T.oninput=te=>{let Y=parseInt(te.target.value);r.setHours(Math.floor(Y/60)),r.setMinutes(Y%60),V()},L.oninput=te=>{let[Y,ne]=te.target.value.split(":");Y&&ne&&(r.setHours(parseInt(Y)),r.setMinutes(parseInt(ne)),V())},V()}function h(){D(),o||(o=setInterval(D,6e4))}function w(){o&&(clearInterval(o),o=null)}function C(){e=!e,be(e,c,"cw-btn-timezone"),e?H("live"):w()}return document.body.appendChild(c),C}function _o(){let t="v1.1",e=!1,o="general",a=null,n=null,i={tabs:{general:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',note:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>',email:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0 1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'},actions:{copy:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',delete:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',add:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'},toolbar:{bold:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>',italic:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>',code:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',image:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'},empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(26, 115, 232, 0.2)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>',media:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'};if(!document.getElementById("cw-lib-styles")){let h=document.createElement("style");h.id="cw-lib-styles",h.innerHTML=`
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
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #474747; }
            .cw-toolbar-btn:hover { background: rgba(0,0,0,0.04); color: #1a73e8; }
            .cw-toolbar-btn.active { background: rgba(26, 115, 232, 0.1); color: #1a73e8; border-color: rgba(26, 115, 232, 0.2); }
            .cw-shimmer {
                background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
            }
            #library-popup {
                width: 650px !important;
                max-width: 95vw !important;
                height: 700px !important;
                max-height: 90vh !important;
            }
            .cw-lib-loading-overlay {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(8px);
                z-index: 1000;
                display: none;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 16px;
                animation: cwLibFadeIn 0.3s ease;
            }
            .cw-lib-loading-overlay.active {
                display: flex;
            }
            .cw-lib-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid rgba(26, 115, 232, 0.1);
                border-top-color: #1a73e8;
                border-radius: 50%;
                animation: cwLibRotate 0.8s linear infinite;
                margin-bottom: 12px;
            }
            .cw-lib-loading-text {
                font-size: 14px;
                font-weight: 600;
                color: #1a73e8;
                letter-spacing: 0.3px;
            }
            @keyframes cwLibRotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes cwLibFadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `,document.head.appendChild(h)}let s={bg:"linear-gradient(180deg, #F8FAFD 0%, #EEF2F8 100%)",surface:"rgba(255, 255, 255, 0.85)",glass:"rgba(255, 255, 255, 0.7)",primary:"#1a73e8",primaryLight:"rgba(26, 115, 232, 0.1)",text:"#1f1f1f",textSub:"#474747",border:"rgba(0, 0, 0, 0.06)",danger:"#d93025"},r={container:{display:"flex",flexDirection:"column",height:"100%",background:s.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"16px 24px 0 24px",background:"transparent",borderBottom:`1px solid ${s.border}`,gap:"8px"},tabBtn:{flex:1,padding:"16px 16px",textAlign:"center",cursor:"pointer",fontSize:"14px",fontWeight:"500",color:s.textSub,borderBottom:"3px solid transparent",transition:"all 0.3s ease",userSelect:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",borderRadius:"12px 12px 0 0"},tabActive:{color:s.primary,borderBottomColor:s.primary,fontWeight:"600",background:"rgba(26, 115, 232, 0.04)"},listContainer:{flex:1,overflowY:"auto",padding:"24px",display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:"16px",alignContent:"start"},emptyState:{padding:"64px 24px",textAlign:"center",color:s.textSub,display:"flex",flexDirection:"column",alignItems:"center",gap:"16px",gridColumn:"1 / -1"},card:{background:s.surface,borderRadius:"24px",padding:"24px",border:`1px solid ${s.border}`,boxShadow:"0 4px 12px rgba(0,0,0,0.03)",transition:"all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",cursor:"default",position:"relative",display:"flex",flexDirection:"column",justifyContent:"space-between"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px"},cardTitle:{fontSize:"15px",fontWeight:"600",color:s.text,letterSpacing:"-0.01em"},cardPreview:{fontSize:"13px",color:s.textSub,lineHeight:"1.6",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"16px",marginTop:"16px",paddingTop:"16px",borderTop:`1px solid ${s.border}`},actionBtn:{padding:"8px 16px",borderRadius:"8px",fontSize:"13px",fontWeight:"500",cursor:"pointer",border:"none",background:"transparent",transition:"all 0.2s",display:"flex",alignItems:"center",gap:"8px"},fab:{position:"absolute",bottom:"32px",right:"32px",width:"64px",height:"64px",borderRadius:"20px",background:`linear-gradient(135deg, ${s.primary}, #0059c1)`,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.9)",backdropFilter:"blur(30px) saturate(180%)",webkitBackdropFilter:"blur(30px) saturate(180%)",zIndex:20,transform:"translateY(100%)",transition:"transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"24px 32px",background:"transparent",borderBottom:`1px solid ${s.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"32px",overflowY:"auto"},inputGroup:{marginBottom:"24px"},label:{display:"block",fontSize:"13px",fontWeight:"600",color:s.textSub,marginBottom:"8px",letterSpacing:"0.02em"},input:{width:"100%",padding:"16px 16px",borderRadius:"16px",border:`1px solid ${s.border}`,fontSize:"15px",fontFamily:"inherit",outline:"none",background:s.surface,transition:"all 0.2s ease",boxSizing:"border-box"}},l=document.createElement("div");l.id="library-popup",l.classList.add("cw-module-window"),Object.assign(l.style,ye,{right:"auto",left:"50%",width:"650px",height:"700px",maxHeight:"90vh",transform:"translateX(-50%) scale(0.05)"});let c=ge(l,"Minha Biblioteca",t,"Gerencie seus snippets, textos e templates.",{popup:l},()=>U());l.appendChild(c);let p=document.createElement("div");Object.assign(p.style,r.container),l.appendChild(p);let x=document.createElement("div");Object.assign(x.style,r.tabHeader);let f=[{id:"general",label:"Geral",icon:i.tabs.general},{id:"note",label:"Notas",icon:i.tabs.note},{id:"email",label:"Emails",icon:i.tabs.email}];f.forEach(h=>{let w=document.createElement("div");w.innerHTML=`${h.icon} <span>${h.label}</span>`,w.id=`lib-tab-${h.id}`,Object.assign(w.style,r.tabBtn),h.id===o&&Object.assign(w.style,r.tabActive),w.onmouseenter=()=>P.playHover(),w.onclick=()=>B(h.id),x.appendChild(w)}),p.appendChild(x);let y=document.createElement("div");Object.assign(y.style,r.listContainer),p.appendChild(y);let m=document.createElement("div");m.className="cw-fab cw-tactile",Object.assign(m.style,r.fab),m.innerHTML=i.actions.add,m.onmouseenter=()=>{m.style.transform="scale(1.1)",m.style.boxShadow="0 12px 32px rgba(26, 115, 232, 0.5)"},m.onmouseleave=()=>{m.style.transform="scale(1)",m.style.boxShadow="0 8px 24px rgba(26, 115, 232, 0.4)"},m.onclick=()=>H(),p.appendChild(m),a=document.createElement("div"),Object.assign(a.style,r.editorOverlay);let E=document.createElement("div");Object.assign(E.style,r.editorHeader),E.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let _=document.createElement("button");_.innerHTML="Cancelar",_.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",_.onclick=K,E.appendChild(_),a.appendChild(E);let F=document.createElement("div");Object.assign(F.style,r.editorBody),a.appendChild(F);let q=document.createElement("div");q.style.cssText="padding:24px 32px; border-top:1px solid rgba(0,0,0,0.06); background:transparent; display:flex; justify-content:flex-end;";let $=document.createElement("button");$.textContent="Salvar",$.style.cssText="padding:12px 32px; background:linear-gradient(135deg, #1a73e8, #0059c1); color:white; border:none; border-radius:16px; font-weight:600; cursor:pointer; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition: all 0.2s;",$.onclick=G,q.appendChild($),a.appendChild(q);let W=document.createElement("div");W.className="cw-lib-loading-overlay",W.innerHTML=`
        <div class="cw-lib-spinner"></div>
        <div class="cw-lib-loading-text">Salvando...</div>
    `,a.appendChild(W),p.appendChild(a);let ae=document.createElement("div");Object.assign(ae.style,qe),ae.className="no-drag",l.appendChild(ae),_e(l,ae),document.body.appendChild(l);function B(h){P.playClick(),o=h,f.forEach(w=>{let C=document.getElementById(`lib-tab-${w.id}`);w.id===h?Object.assign(C.style,r.tabActive):Object.assign(C.style,r.tabBtn)}),I()}function I(){y.innerHTML="";let h=Ee.getSnippets(o);if(h.length===0){y.innerHTML=`
                <div style="${xe(r.emptyState)}">
                    <div style="opacity:0.8;">${i.empty}</div>
                    <div style="font-weight:600; font-size:16px; color:${s.text};">Nada aqui ainda.</div>
                    <div style="font-size:14px; opacity:0.7;">Clique no bot\xE3o de adicionar para come\xE7ar sua cole\xE7\xE3o.</div>
                </div>
            `;return}h.forEach(w=>{let C=document.createElement("div");C.className="cw-aura-card",Object.assign(C.style,r.card),w.isCode&&(C.style.borderLeft=`4px solid ${s.primary}`,C.style.background="rgba(26, 115, 232, 0.02)");let M=w.content,Z="";if(w.isRich){let oe=document.createElement("div");oe.innerHTML=w.content;let O=oe.querySelector("img");M=oe.innerText.substring(0,150)+(oe.innerText.length>150?"...":""),O&&(Z=`<span style="display:inline-flex; align-items:center; background:rgba(26, 115, 232, 0.1); color:#1a73e8; padding:2px 8px; border-radius:10px; font-size:11px; margin-bottom:8px; font-weight:600;">${i.media} Media</span>`)}C.innerHTML=`
                <div style="${xe(r.cardHeader)}">
                    <div style="${xe(r.cardTitle)}">${w.title}</div>
                    <div style="display:flex; gap:6px;">
                        ${w.isCode?'<span style="font-size:10px; background:rgba(0,0,0,0.05); color:#474747; padding:3px 8px; border-radius:6px; font-family:monospace; font-weight:700;">CODE</span>':""}
                        ${o==="email"?'<span style="font-size:10px; background:rgba(26, 115, 232, 0.1); color:#1a73e8; padding:3px 8px; border-radius:6px; font-weight:700;">TEMPLATE</span>':""}
                    </div>
                </div>
                ${Z}
                <div style="${xe(r.cardPreview)}; ${w.isCode?"font-family:'Roboto Mono', monospace; font-size:12px; background:rgba(0,0,0,0.02); padding:12px; border-radius:12px;":""}">${M}</div>
                <div style="${xe(r.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${xe(r.actionBtn)}; color:#1a73e8;">
                        ${i.actions.copy}
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${xe(r.actionBtn)}; color:#474747;">
                        ${i.actions.edit}
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${xe(r.actionBtn)}; color:#d93025;">
                        ${i.actions.delete}
                        <span>Excluir</span>
                    </button>
                </div>
            `,C.onmouseenter=()=>{P.playHover()},C.querySelector(".cw-act-copy").onclick=oe=>{if(oe.stopPropagation(),P.playClick(),w.isRich){let O=new Blob([w.content],{type:"text/html"}),R=document.createElement("div");R.style.whiteSpace="pre-wrap",R.innerHTML=w.content;let z=new Blob([R.innerText],{type:"text/plain"}),Q=[new ClipboardItem({"text/html":O,"text/plain":z})];navigator.clipboard.write(Q)}else navigator.clipboard.writeText(w.content);ee("Copiado!")},C.querySelector(".cw-act-edit").onclick=oe=>{oe.stopPropagation(),P.playClick(),H(w)},C.querySelector(".cw-act-del").onclick=async oe=>{oe.stopPropagation(),P.playClick(),await ve("Excluir este item?")&&(Ee.delete(w.id),I(),ee("Item exclu\xEDdo."))},y.appendChild(C)})}function H(h=null){n=h?h.id:null,F.innerHTML="",F.appendChild(D("title","T\xEDtulo / Nome",h?h.title:"")),o==="email"&&F.appendChild(D("subject","Assunto do Email",h?h.subject:""));let w="Conte\xFAdo";o==="email"&&(w="Corpo do Email (HTML)"),o==="note"&&(w="Texto da Nota (Reason)"),F.appendChild(D("content",w,h?h.content:"",{isRich:!0,isCode:h?h.isCode:!1})),E.querySelector("span").textContent=h?"Editar Item":"Novo Item",a.style.transform="translateY(0)",setTimeout(()=>{let C=F.querySelector("input");C&&C.focus()},300)}function K(){a.style.transform="translateY(100%)",setTimeout(()=>n=null,300)}async function G(){let h=F.querySelector("#cw-inp-title"),w=F.querySelector("#cw-inp-content"),C=h.value.trim(),M=w.contentEditable==="true"?w.innerHTML:w.value.trim(),Z=w.getAttribute("data-is-code")==="true";if(!C||!M||M==="<br>"){ee("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let oe={id:n,type:o,title:C,content:M,isCode:Z,isRich:w.contentEditable==="true"};if(o==="email"){let O=F.querySelector("#cw-inp-subject").value.trim();if(!O){ee("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}oe.subject=O}W.classList.add("active"),$.disabled=!0;try{await Ee.save(oe),I(),K(),ee("Salvo com sucesso!"),P.playSuccess()}catch(O){console.error("Erro ao salvar nota:",O),ee("Erro ao salvar nota.",{error:!0})}finally{W.classList.remove("active"),$.disabled=!1}}function D(h,w,C,M={}){let Z=document.createElement("div");Object.assign(Z.style,r.inputGroup);let oe=document.createElement("label");oe.textContent=w,Object.assign(oe.style,r.label);let O;if(M.isRich){let R=document.createElement("div");R.style.cssText="display:flex; gap:8px; margin-bottom:16px; background:rgba(255, 255, 255, 0.5); padding:8px; border-radius:16px; border:1px solid rgba(0,0,0,0.06); backdrop-filter: blur(10px); width: fit-content;",R.innerHTML=`
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
            `,O=document.createElement("div"),O.contentEditable="true",Object.assign(O.style,r.input,{minHeight:"180px",maxHeight:"350px",overflowY:"auto",whiteSpace:"pre-wrap",lineHeight:"1.6",outline:"none"}),O.innerHTML=C||"",M.isCode&&(O.style.fontFamily="'Roboto Mono', monospace",O.style.backgroundColor="#F8F9FA",O.setAttribute("data-is-code","true")),R.querySelectorAll(".cw-toolbar-btn").forEach(z=>{z.onmouseenter=()=>P.playHover(),z.onmousedown=()=>P.playClick()}),R.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),O.focus()},R.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),O.focus()},R.querySelector(".cw-tb-code").onclick=z=>{let d=!(O.getAttribute("data-is-code")==="true");O.setAttribute("data-is-code",d),O.style.fontFamily=d?"'Roboto Mono', monospace":"inherit",O.style.backgroundColor=d?"rgba(0, 122, 255, 0.03)":s.surface,d?z.currentTarget.classList.add("active"):z.currentTarget.classList.remove("active"),O.focus()},R.querySelector(".cw-tb-img").onclick=async()=>{let z=await to("Cole a URL da imagem:");z&&(document.execCommand("insertImage",!1,z),O.querySelectorAll("img").forEach(d=>{d.style.maxWidth="100%",d.style.borderRadius="8px"}))},O.onpaste=z=>{let Q=(z.clipboardData||z.originalEvent.clipboardData).items;for(let d of Q)if(d.kind==="file"&&d.type.startsWith("image/")){z.preventDefault();let v=d.getAsFile(),k=new FileReader;k.onload=b=>{let S=`<img src="${b.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;document.execCommand("insertHTML",!1,S)},k.readAsDataURL(v)}},Z.appendChild(oe),Z.appendChild(R)}else O=document.createElement("input"),O.type="text",Object.assign(O.style,r.input),O.value=C||"",Z.appendChild(oe);return O.id=`cw-inp-${h}`,O.onfocus=()=>{O.style.borderColor=s.primary,O.style.boxShadow=`0 0 0 2px ${s.primaryBg}`},O.onblur=()=>{O.style.borderColor=s.border,O.style.boxShadow="none"},Z.appendChild(O),Z}function U(){e=!e,be(e,l,"cw-btn-library"),e?(document.body.style.overflow="hidden",I()):document.body.style.overflow=""}return U}function Do(){let t="v1.0",e=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},a="cw-configs-styles";if(!document.getElementById(a)){let y=document.createElement("style");y.id=a,y.innerHTML=`
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
        `,document.head.appendChild(y)}let n=document.createElement("div");n.id="configs-popup",n.classList.add("cw-module-window"),Object.assign(n.style,ye,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let s=ge(n,"Configura\xE7\xF5es",t,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:n},()=>f());n.appendChild(s);let r=document.createElement("div");r.className="cw-configs-container",n.appendChild(r);let l=document.createElement("div");l.className="cw-profile-card",l.id="cw-user-profile-section",l.style.display="none",r.appendChild(l);async function g(){l.style.display="flex",l.innerHTML=`
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
        `,setTimeout(async()=>{try{let y=fe(),m=y?y.split("@")[0]:"user",E=await it(m);if(!E){l.innerHTML=`
                <div class="cw-profile-avatar" style="background: #e8eaed; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5f6368; font-weight: bold;">
                    ${m.charAt(0).toUpperCase()}
                </div>
                <div class="cw-profile-info">
                    <h2 class="cw-profile-ldap">@${m}</h2>
                    <div class="cw-profile-badges">
                        <span class="cw-profile-badge">Consultor</span>
                    </div>
                    <div style="font-size: 12px; color: ${o.textSub}; margin-top: 4px;">
                        Perfil n\xE3o localizado na base de dados.
                    </div>
                </div>
            `;return}l.innerHTML=`
        <img src="https://moma-teams-photos.corp.google.com/photos/${m}?sz=600&type=PLUS"
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
    `}catch(y){console.warn("Erro ao renderizar perfil:",y),l.style.display="none"}},3e3)}g();let c=document.createElement("div");c.className="cw-configs-section",c.innerHTML=`
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
    `;let p=c.querySelector("#cw-config-sound-toggle");p.onchange=y=>{P.setMuted(!y.target.checked),y.target.checked&&P.playClick()},r.appendChild(c);let x=document.createElement("div");x.className="cw-configs-section",x.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank">Reportar Bug/Sugest\xF5es</a>
            </div>
        </div>
    `,r.appendChild(x);function f(){e=!e,be(e,n,"cw-btn-configs"),e&&P.playClick()}return document.body.appendChild(n),f}var $e={blue:"#1A73E8",red:"#D93025",yellow:"#F9AB00",green:"#1E8E3E",blueLight:"#E8F0FE",redLight:"#FCE8E6",yellowLight:"#FEF7E0",greenLight:"#E6F4EA",textPrimary:"#202124",textSecondary:"#5F6368",border:"#DADCE0",surface:"rgba(255, 255, 255, 0.8)",white:"#FFFFFF"};var Ve="cubic-bezier(0.4, 0, 0.2, 1)",js=`all 0.3s ${Ve}`,Mo=()=>{if(document.getElementById("bau-form-global-styles"))return;let t=document.createElement("style");t.id="bau-form-global-styles",t.textContent=`
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
      animation: cw-genie-effect-in 0.4s ${Ve};
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
        animation: bauAuraCombined 5s ${Ve} 0.2s infinite;
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
        color: ${$e.green};
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
        animation: bauCheckDraw 0.55s ${Ve} 0.75s forwards;
    }

    .bau-success-view.active .bau-success-title {
        font-size: 24px;
        font-weight: 700;
        color: #202124;
        margin: 0 0 8px 0;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Ve} 0.85s forwards;
    }

    .bau-success-view.active .bau-success-subtitle {
        font-size: 15px;
        color: #5F6368;
        margin-bottom: 36px;
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Ve} 0.95s forwards;
    }

    .bau-success-view.active #bau-success-back-btn {
        opacity: 0;
        animation: bauSlideUpFade 0.6s ${Ve} 1.05s forwards;
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
  `,document.head.appendChild(t)};var Ye={steps:[{id:0,title:"Selecione o tipo de atendimento",isBranching:!0},{id:1,title:"Contexto e Valida\xE7\xE3o",fields:[{id:"advName",name:"advName",label:"Nome do Anunciante",type:"text",placeholder:"Nome do Anunciante",required:!0,isSmart:!0},{id:"cid",name:"cid",label:"CID",type:"text",placeholder:"000-000-0000",required:!0,isSmart:!0,tooltip:"Use o formato 000-000-0000 ou 10 d\xEDgitos",validation:{regex:"^(\\d{3}-\\d{3}-\\d{4}|\\d{10})$",error:"Formato de CID incorreto"}},{id:"amName",name:"amName",label:"Account Manager (AM)",type:"text",placeholder:"Nome do AM",required:!0,isSmart:!0},{id:"website",name:"website",label:"Website",type:"text",placeholder:"https://www.exemplo.com",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text-with-button",placeholder:"Speakeasy ID",required:!1,isSmart:!0,button:{id:"bau-top-se-search",icon:"wand",title:"Buscar ID automaticamente"}}]},{id:2,title:"Tasks",fields:[{id:"reason",name:"reason",label:"O que deve ser feito em BAU",type:"textarea",placeholder:"Descreva as a\xE7\xF5es esperadas...",required:!0,style:{minHeight:"80px"}},{id:"taskType",name:"taskType",label:"Tasks para BAU (Selecione 1 ou mais)",type:"checkbox-grid",required:!0,tooltip:"Selecione os tipos de implementa\xE7\xE3o t\xE9cnica",options:["Ads Conversion Tracking","Ads Dynamic Remarketing","Ads Enhanced Conversions","Ads Website Call Conversion","Ads Remarketing","Analytics Cross Domain Tracking","Analytics E-Commerce Tracking","Analytics Enhanced E-Commerce Tracking","Analytics Event Tracking","Analytics Health Check","Analytics Remarketing","Analytics Setup","Fix GA4 implementation","Consent Mode","Fix Sitewide Tagging (OGT & CT)","Google Tag Manager Installation","Customer Match"]}]},{id:3,title:"Justificativa e Agendamento",fields:[{id:"nonImplementationReason",name:"nonImplementationReason",label:"Motivo da N\xE3o Implementa\xE7\xE3o (Justificativa BAU)",type:"select",required:!0,options:[{value:"",text:"Selecione um motivo..."},{value:"Tempo da consultoria esgotado",text:"Tempo da consultoria esgotado"},{value:"Solicita\xE7\xE3o de reagendamento pelo anunciante",text:"Solicita\xE7\xE3o de reagendamento pelo anunciante"},{value:"Falta de acessos ou backup do site",text:"Falta de acessos ou backup do site"},{value:"Anunciante indispon\xEDvel ou n\xE3o preparado",text:"Anunciante indispon\xEDvel ou n\xE3o preparado"},{value:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)",text:"Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"},{value:"Solicita\xE7\xE3o de tarefas (tasks) adicionais",text:"Solicita\xE7\xE3o de tarefas (tasks) adicionais"},{value:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)",text:"Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"},{value:"Retorno de contato ap\xF3s prazo de 14 dias expirado",text:"Retorno de contato ap\xF3s prazo de 14 dias expirado"}]},{id:"description",name:"description",label:"Justificativa / Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva detalhadamente o que precisa ser feito...",required:!0},{id:"availability",name:"availability",label:"Disponibilidade (m\xEDnimo 1 op\xE7\xE3o)",type:"datetime-group",required:!0,fields:[{name:"availability_1",label:"Op\xE7\xE3o 1 (Prioridade)",required:!0},{name:"availability_2",label:"Op\xE7\xE3o 2 (Opcional)",required:!1},{name:"availability_3",label:"Op\xE7\xE3o 3 (Opcional)",required:!1}]}]},{id:4,title:"Confirma\xE7\xE3o",isConfirmation:!0},{id:5,title:"Solicitar Descarte",fields:[{id:"caseId",name:"caseId",label:"Case ID",type:"text",placeholder:"Case ID",required:!0,isSmart:!0},{id:"language",name:"language",label:"Idioma",type:"text",placeholder:"Idioma",required:!0,isSmart:!0},{id:"seId",name:"seId",label:"Speakeasy ID (SE ID)",type:"text",placeholder:"Speakeasy ID",required:!0,isSmart:!0},{id:"description",name:"description",label:"Descri\xE7\xE3o",type:"textarea",placeholder:"Descreva o motivo do descarte...",required:!0},{id:"discardReason",name:"reason",label:"Motivo do Descarte",type:"select",required:!0,groups:[{label:"Live Appointments",options:[{value:"Caso Filho gerado no atendimento",text:"Caso Filho gerado no atendimento"},{value:"3\xAA Tentativa de contato sem sucesso",text:"3\xAA Tentativa de contato sem sucesso"}]},{label:"Live Meet",options:[{value:"Apenas o AM presente",text:"Apenas o AM presente"},{value:"Estouro de tempo para conclus\xE3o",text:"Estouro de tempo para conclus\xE3o"},{value:"Gera\xE7\xE3o de caso BAU (Reagendamento)",text:"Gera\xE7\xE3o de caso BAU (Reagendamento)"}]}]}]}]};var ue={add:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',wand:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>',send:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',check:'<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path class="bau-check-path" d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',folder:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',empty:'<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',expand:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'};function No(t){switch(t){case"PENDING_TL_CREATION":return{text:"Aguardando TL",class:"status-yellow",aura:"status-yellow-aura"};case"CREATED":return{text:"Aprovado / Criado",class:"status-green",aura:"status-green-aura"};case"DISCARDED":return{text:"Descartado pelo TL",class:"status-red",aura:"status-red-aura"};case"CANCELED_BY_AGENT":return{text:"Cancelado",class:"status-gray",aura:""};default:return{text:t||"Pendente",class:"status-gray",aura:""}}}function zo(t){let e=document.createElement("div");if(e.className="bau-dynamic-input",e.id=`wrapper-${t.id}`,t.label){let a=document.createElement("label");a.className="bau-label",a.textContent=t.label,t.tooltip&&a.setAttribute("data-tooltip",t.tooltip),e.appendChild(a)}let o;switch(t.type){case"textarea":o=document.createElement("textarea"),o.style.minHeight="80px",e.appendChild(o);break;case"select":o=document.createElement("select"),t.groups?t.groups.forEach(s=>{let r=document.createElement("optgroup");r.label=s.label,s.options.forEach(l=>{let g=document.createElement("option");g.value=l.value,g.textContent=l.text,r.appendChild(g)}),o.appendChild(r)}):t.options&&t.options.forEach(s=>{let r=document.createElement("option");r.value=s.value,r.textContent=s.text,o.appendChild(r)}),e.appendChild(o);break;case"checkbox-grid":return o=document.createElement("div"),o.className="bau-tasks-grid",t.options.forEach(s=>{let r=document.createElement("label");r.className="bau-task-item",r.innerHTML=`<input type="checkbox" name="${t.name}" value="${s}"><span>${s}</span>`,r.addEventListener("click",l=>{l.preventDefault();let g=r.querySelector("input");g.checked=!g.checked,r.classList.toggle("active",g.checked),P.playClick()}),o.appendChild(r)}),e.appendChild(o),e;case"datetime-group":o=document.createElement("div"),o.className="bau-availability-container",t.fields.forEach(s=>{let r=document.createElement("div");r.className="bau-availability-field",r.innerHTML=`
                    <span class="bau-field-hint">${s.label}</span>
                    <input type="datetime-local" name="${s.name}" class="bau-input" ${s.required?"required":""}>
                `,o.appendChild(r)});let a=document.createElement("div");return a.className="bau-availability-disclaimer",a.innerHTML=`
                <div class="bau-disclaimer-text">
                    <strong>Aten\xE7\xE3o:</strong> Para clientes fora do fuso hor\xE1rio do Brasil, o hor\xE1rio inserido deve corresponder sempre ao hor\xE1rio local do cliente, e n\xE3o ao do agente.
                </div>
                <button type="button" class="bau-timezone-link" id="bau-open-timezone">
                    ${ue.refresh}
                    Consultar Time Zone
                </button>
            `,a.querySelector("#bau-open-timezone").onclick=()=>{let s=document.getElementById("cw-btn-timezone");s?(s.click(),P.playClick()):ee("M\xF3dulo Time Zone n\xE3o encontrado.",{error:!0})},e.appendChild(o),e.appendChild(a),e;case"text-with-button":let n=document.createElement("div");n.className="bau-input-group",o=document.createElement("input"),o.type="text";let i=document.createElement("button");i.type="button",i.id=t.button.id,i.className="bau-mini-btn-input",i.title=t.button.title,i.innerHTML=ue[t.button.icon]||"",n.appendChild(o),n.appendChild(i),e.appendChild(n);break;default:o=document.createElement("input"),o.type="text",e.appendChild(o)}return o&&t.type!=="checkbox-grid"&&t.type!=="datetime-group"&&(o.id=`bau-form-${t.id}`,o.name=t.name,o.className=t.type==="select"?"bau-select":t.type==="textarea"?"bau-textarea":"bau-input",t.placeholder&&(o.placeholder=t.placeholder),t.required&&(o.required=!0)),e}function Ro(){Mo();let t=!1,e="dashboard",o=null,a=0,n="BAU",i=!1,s=null,r=Ye.steps.length,l=document.createElement("div");l.id="bau-form-popup",l.className="bau-popup cw-module-window",l.style.display="none";let g=ge(l,"BAU Central","v2.2.0","Dashboard de Casos BAU",{},()=>Q());l.appendChild(g);let c=document.createElement("div");c.className="bau-view-container",l.appendChild(c);let p=document.createElement("div");p.id="bau-view-details",p.className="bau-details-view",c.appendChild(p);let x=document.createElement("div");x.id="bau-view-dashboard",x.className="bau-view active",x.innerHTML=`
        <div class="bau-dashboard-content">
            <div class="bau-dashboard-metrics" id="bau-dashboard-metrics"></div>
            <ul class="bau-case-list" id="bau-case-list-container"></ul>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            ${ue.add}
            Novo Caso BAU
        </button>
    `,c.appendChild(x);let f=document.createElement("div");f.id="bau-view-form",f.className="bau-view";let y=document.createElement("div");y.className="bau-view-header",y.innerHTML=`
      <button class="bau-back-btn" id="bau-form-back-btn">
        ${ue.back}
        Voltar ao Dashboard
      </button>
    `,f.appendChild(y);let m=document.createElement("div");m.className="bau-content",f.appendChild(m);let E=document.createElement("div");E.className="bau-form-loading-overlay",E.innerHTML=`
        <div class="bau-spinner"></div>
        <div class="bau-loading-text">Configurando Edi\xE7\xE3o...</div>
    `,m.appendChild(E);let _=d=>{E.classList.toggle("active",d)},F=document.createElement("div");F.className="bau-progress-indicator",m.appendChild(F);let q=document.createElement("form");q.id="bau-escalation-form",q.noValidate=!0,m.appendChild(q),Ye.steps.forEach(d=>{let v=document.createElement("div");if(v.className="bau-step"+(d.id===a?" active":""),v.id=`bau-step-${d.id}`,d.isBranching)v.innerHTML=`
                <div class="bau-branching-container">
                    <div class="bau-branching-card" id="bau-opt-full">
                        <div class="bau-branching-icon">${ue.add}</div>
                        <h3 class="bau-branching-title">Abrir caso para BAU</h3>
                        <p class="bau-branching-subtitle">Fluxo completo para implementa\xE7\xF5es t\xE9cnicas e suporte especializado.</p>
                    </div>
                    <div class="bau-branching-card" id="bau-opt-discard">
                        <div class="bau-branching-icon">${ue.empty}</div>
                        <h3 class="bau-branching-title">Solicitar Descarte</h3>
                        <p class="bau-branching-subtitle">Fluxo simplificado para casos que n\xE3o requerem implementa\xE7\xE3o.</p>
                    </div>
                </div>
            `,v.querySelector("#bau-opt-full").onclick=()=>{n="BAU",a=1,q.querySelectorAll(".bau-highlight-panel").forEach(k=>k.classList.remove("discard-theme")),w(),P.playClick()},v.querySelector("#bau-opt-discard").onclick=()=>{n="DISCARD",a=5,q.querySelectorAll(".bau-highlight-panel").forEach(k=>k.classList.add("discard-theme")),w(),P.playClick()};else if(d.isConfirmation)v.innerHTML=`
                <div class="bau-card">
                    <h3 class="bau-step-title">Confirme os dados antes de enviar</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;else{let k=document.createElement("div");if(k.className="bau-card",d.id===1||d.id===5){k.innerHTML=`
                    <div class="bau-vital-highlights bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div class="bau-all-data"></div>
                `;let b=k.querySelector(".bau-dynamic-inputs-container");d.fields.forEach(A=>{b.appendChild(zo(A))});let S=k.querySelector("#wrapper-cid");if(S){let A=document.createElement("div");A.id="bau-cid-error",A.className="bau-cid-error-hint",A.style.display="none",A.textContent="Formato de CID incorreto",S.appendChild(A)}}else d.fields.forEach(b=>{k.appendChild(zo(b))});v.appendChild(k)}q.appendChild(v)});let $=document.createElement("div");$.className="bau-footer";let W=document.createElement("button");W.type="button",W.id="bau-step-back-btn",W.className="bau-btn-secondary",W.textContent="Voltar";let ae=document.createElement("button");ae.type="button",ae.id="bau-step-next-btn",ae.className="bau-btn-primary",ae.textContent="Pr\xF3ximo";let B=document.createElement("button");B.type="submit",B.className="bau-btn-submit",B.innerHTML=`${ue.send} Enviar para o TL`,B.style.display="none",$.appendChild(W),$.appendChild(ae),$.appendChild(B),q.appendChild($),c.appendChild(f);let I=document.createElement("div");I.id="bau-view-success",I.className="bau-view bau-success-view",I.innerHTML=`
        <div class="bau-success-content">
            <div class="bau-success-icon" style="color: ${$e.green};">${ue.check}</div>
            <h2 class="bau-success-title">Caso enviado com sucesso!</h2>
            <p class="bau-success-subtitle">Sua solicita\xE7\xE3o foi recebida e ser\xE1 processada em breve.</p>
            <button class="bau-btn-primary" id="bau-success-back-btn">Voltar ao Dashboard</button>
        </div>
    `,c.appendChild(I),document.body.appendChild(l);function H(d){e=d,l.querySelectorAll(".bau-view").forEach(A=>A.classList.remove("active"));let v=l.querySelector(`#bau-view-${d}`);v&&v.classList.add("active");let k=g.querySelector(".cw-module-header-title")||g.querySelector("h2"),b=g.querySelector(".cw-module-header-subtitle")||g.querySelector("p");k&&(d==="form"?k.textContent=i?`Editando Caso #${s}`:"Novo Caso BAU":k.textContent="BAU Central"),b&&(b.textContent=d==="form"?"Preencha os detalhes abaixo":"Dashboard de Casos BAU");let S=q.querySelector(".bau-btn-submit");S&&(S.innerHTML=i?`${ue.send} Salvar Altera\xE7\xF5es`:`${ue.send} Enviar para o TL`)}function K(){let d=l.querySelector("#bau-case-list-container"),v=l.querySelector("#bau-dashboard-metrics");v&&(v.innerHTML=`
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `),d&&(d.innerHTML=Array(5).fill(0).map(()=>`
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join(""))}async function G(){let d=l.querySelector("#bau-case-list-container"),v=l.querySelector("#bau-dashboard-metrics");if(!(!d||!v)){K();try{let k=await Ht();if(!Array.isArray(k))throw new Error("API response is not a valid array");h(k)}catch(k){console.error("Critical Error loading BAU cases:",k),v&&(v.innerHTML=""),d.innerHTML=`
                <div class="bau-empty-state bau-error-state">
                    <div style="color: ${$e.red}; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">Ops! Algo deu errado</h3>
                    <p class="bau-empty-subtitle">N\xE3o conseguimos carregar seus casos BAU no momento.</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        Tentar Novamente
                    </button>
                </div>
            `,l.querySelector("#bau-retry-btn")?.addEventListener("click",()=>G()),ee("Erro ao carregar Dashboard. Verifique sua conex\xE3o.",{error:!0})}}}function D(d){if(!d)return;let v=No(d.status),k=(S,A)=>{navigator.clipboard.writeText(S).then(()=>{ee("Copiado para a \xE1rea de transfer\xEAncia!"),P.playClick();let T=A.style.color;A.style.color="#1E8E3E",setTimeout(()=>{A.style.color=T},800)})};p.innerHTML=`
            <div class="bau-details-header">
                <h2 class="bau-details-title">Detalhes do Caso</h2>
                <button class="bau-details-close-btn">
                    ${ue.back}
                    Voltar
                </button>
            </div>
            <div class="bau-details-content">
                <div class="bau-details-grid">
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Anunciante</span>
                            <span class="bau-details-value">${d.advName||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${ue.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Status</span>
                            <span class="bau-case-status-badge ${v.class}">${v.text}</span>
                        </div>
                    </div>
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">CID</span>
                            <span class="bau-details-value">${d.cid||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${ue.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Case ID</span>
                            <span class="bau-details-value">${d.caseId||"---"}</span>
                            <button class="bau-copy-btn" title="Copiar">${ue.wand}</button>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Motivo BAU</span>
                            <span class="bau-details-value">${d.reason||"N\xE3o informado"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Tasks solicitadas</span>
                            <span class="bau-details-value">${d.taskType||"Nenhuma"}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Justificativa</span>
                            <span class="bau-details-value">${d.nonImplementationReason||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Descri\xE7\xE3o detalhada</span>
                            <span class="bau-details-value">${d.description||"---"}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Disponibilidade</span>
                            <span class="bau-details-value">${rt(d.availability)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;let b=p.querySelector(".bau-details-close-btn");b.onclick=()=>{p.classList.remove("active"),P.playSwoosh(),setTimeout(()=>{p.style.display="none"},600)},p.querySelectorAll(".bau-copy-btn").forEach(S=>{S.onclick=A=>{let T=A.target.closest(".bau-details-row").querySelector(".bau-details-value").textContent;k(T,S)}}),p.style.display="flex",requestAnimationFrame(()=>{p.classList.add("active"),P.playClick()})}function U(d){if(!d)return"";let v=No(d?.status),k=rt(d?.date),b="",S="";if(d?.status==="PENDING_TL_CREATION"&&d?.availability_1){let N=new Date(d.availability_1),X=new Date;(N<=X||N-X<36e5*2)&&(b='<span class="bau-sla-badge">Urgente</span>',S="bau-pulse-attention")}let A=d?.reason&&d.reason.trim()?d.reason:"Nenhum contexto adicional fornecido pelo agente.",u=/^(\d{3}-\d{3}-\d{4}|\d{10})$/.test(d?.cid||""),L=!d?.caseId||d.caseId==="N/A"||!u;return L&&d?.status==="PENDING_TL_CREATION"&&(S="bau-pulse-attention"),`
            <li class="bau-case-card ${v.aura} ${S}" data-case-id="${d?.id||""}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${ue.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${d?.advName||"Nome indefinido"}</h3>
                            ${b}
                            <span class="bau-case-date">${k}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="Customer ID do Anunciante">Case: ${d?.caseId||"N/A"}</span> \u2022
                            <span data-tooltip="CID do Anunciante (Formato: 000-000-0000)" class="${u?"":"bau-error-text"}">CID: ${d?.cid||"N/A"}</span> \u2022
                            <span data-tooltip="O que deve ser feito em BAU">Motivo: ${A}</span>
                        </p>
                        ${L?`<div class="bau-data-error-hint">${!d?.caseId||d?.caseId==="N/A"?"Dados Incompletos":"CID Inv\xE1lido"} - Contate o Suporte</div>`:""}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                    <span class="bau-case-status-badge ${v.class}">${v.text}</span>
                    ${d?.status&&d.status.includes("PENDING")?`
                        <button class="bau-case-edit-btn" data-id="${d.id}" title="Editar Solicita\xE7\xE3o">
                            ${ue.edit}
                            Editar
                        </button>
                    `:""}
                </div>
            </li>
        `}function h(d){let v=l.querySelector("#bau-case-list-container"),k=l.querySelector("#bau-dashboard-metrics");if(!v||!k)return;let b=Array.isArray(d)?d.filter(Boolean):[];if(b.length===0){k.innerHTML=`
                <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard">
                    ${ue.refresh}
                    Atualizar
                </button>
            `,v.innerHTML=`
                <div class="bau-empty-state">
                    ${ue.empty}
                    <h3 class="bau-empty-title">Nenhum caso recente</h3>
                    <p class="bau-empty-subtitle">Seus casos BAU aparecer\xE3o aqui</p>
                </div>
            `,l.querySelector("#bau-refresh-dashboard")?.addEventListener("click",()=>G());return}let S=b.filter(N=>N.status==="PENDING_TL_CREATION").length,A=b.filter(N=>N.status==="CREATED").length;k.innerHTML=`
            <div class="bau-metric-card">
                <span class="bau-metric-value">${S}</span>
                <span class="bau-metric-label">Aguardando TL</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${A}</span>
                <span class="bau-metric-label">Criados / Aprovados</span>
            </div>
            <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard" title="Atualizar Dashboard">
                ${ue.refresh}
            </button>
        `;let T=k.querySelector("#bau-refresh-dashboard");T?.addEventListener("click",async()=>{T.classList.contains("spinning")||(T.classList.add("spinning"),P.playClick(),await G(),setTimeout(()=>T.classList.remove("spinning"),1e3))}),v.innerHTML="";let u=b.slice(0,5),L=b.slice(5);if(u.forEach(N=>{let X=U(N),V=document.createElement("div");V.innerHTML=X;let te=V.firstElementChild;te.addEventListener("click",ne=>{ne.target.closest(".bau-case-edit-btn")||D(N)});let Y=te.querySelector(".bau-case-edit-btn");Y&&(Y.onclick=ne=>{ne.stopPropagation(),R(N)}),v.appendChild(te)}),L.length>0){let N=document.createElement("li");N.className="bau-accordion-container";let X=document.createElement("button");X.className="bau-accordion-toggle",X.innerHTML=`${ue.expand} <span>Mostrar ${L.length} casos mais antigos</span>`;let V=document.createElement("ul");V.className="bau-case-list bau-accordion-content",V.style.display="none",L.forEach(te=>{let Y=U(te),ne=document.createElement("div");ne.innerHTML=Y;let le=ne.firstElementChild;le.addEventListener("click",Se=>{Se.target.closest(".bau-case-edit-btn")||D(te)});let Ae=le.querySelector(".bau-case-edit-btn");Ae&&(Ae.onclick=Se=>{Se.stopPropagation(),R(te)}),V.appendChild(le)}),X.addEventListener("click",()=>{let te=V.style.display==="none";V.style.display=te?"block":"none",X.classList.toggle("expanded",te),X.querySelector("span").textContent=te?"Esconder casos mais antigos":`Mostrar ${L.length} casos mais antigos`,P.playClick()}),N.appendChild(X),N.appendChild(V),v.appendChild(N)}}function w(){let d=n==="BAU"?[1,2,3,4]:[5,4];q.querySelectorAll(".bau-step").forEach(b=>{let S=parseInt(b.id.replace("bau-step-","")),A=S===a,T=d.includes(S)||S===0;b.classList.toggle("active",A),b.style.display=A?"block":"none",b.querySelectorAll("input, select, textarea").forEach(u=>{u.disabled=!T})});let v=a===0;if(F.style.display=v?"none":"flex",!v){F.innerHTML="";let b=n==="BAU"?[1,2,3,4]:[5,4];b.forEach((S,A)=>{let T=document.createElement("div"),u=S===a,L=b.indexOf(a),N=A<L;T.className=`bau-progress-step ${u?"active":N?"completed":""}`,T.textContent=A+1,F.appendChild(T)})}let k=a===4;W.style.display=a>0?"inline-block":"none",ae.style.display=!v&&!k?"inline-block":"none",B.style.display=k?"flex":"none",k&&O()}function C(d){let v=Ye.steps.find(k=>k.id===d);if(!v||!v.fields||v.isConfirmation)return!0;for(let k of v.fields){let b=q.querySelector(`#bau-step-${d} #wrapper-${k.id}`);if(!(b&&b.style.display==="none")&&k.validation){let S=q.querySelector(`#bau-step-${d} [name="${k.name}"]`);if(S&&S.offsetParent!==null&&S.value.trim())if(new RegExp(k.validation.regex).test(S.value.trim())){S.classList.remove("invalid-cid");let T=q.querySelector("#bau-cid-error");T&&(T.style.display="none")}else{console.warn(`Validation failed for field "${k.name}" in step ${d}: Regex mismatch.`),ee(`Erro: ${k.validation.error}`,{error:!0}),S.classList.add("invalid-cid");let T=q.querySelector("#bau-cid-error");return T&&(T.style.display="flex"),!1}}}return!0}function M(d){if(!q.querySelector(`#bau-step-${d}`))return!1;let k=Ye.steps.find(S=>S.id===d);if(!k||!k.fields||k.isConfirmation)return!0;let b=!0;for(let S of k.fields){let A=q.querySelector(`#bau-step-${d} #wrapper-${S.id}`);if(!(A&&A.style.display==="none")&&S.required){let T=!0,u="";if(S.type==="checkbox-grid")q.querySelector(`#bau-step-${d} input[name="${S.name}"]:checked`)||(u="No option selected in checkbox-grid",ee(`Erro: Selecione pelo menos uma op\xE7\xE3o para "${S.label}".`,{error:!0}),T=!1);else if(S.type==="datetime-group"){let L=q.querySelector(`#bau-step-${d} input[name="${S.fields[0].name}"]`);if(!L||L.offsetParent===null)continue;L.value.trim()||(u="Datetime group first field is empty",ee(`Erro: O campo "${S.fields[0].label}" \xE9 obrigat\xF3rio.`,{error:!0}),T=!1)}else{let L=q.querySelector(`#bau-step-${d} [name="${S.name}"]`);if(!L||L.offsetParent===null)continue;L.value.trim()||(u="Field is empty",ee(`Erro: O campo '${S.label}' \xE9 obrigat\xF3rio.`,{error:!0}),T=!1)}if(!T){console.warn(`Validation failed for required field "${S.name}" in step ${d}: ${u}`),b=!1;break}}}return b}ae.addEventListener("click",()=>{if(C(a)&&M(a)){n==="BAU"?a++:a===5?a=4:a++,w();let d=l.querySelector(".bau-content");d&&(d.scrollTop=0),P.playClick()}}),W.addEventListener("click",()=>{a>0&&(n==="BAU"?a--:a===4?a=5:a===5?a=0:a--,w(),P.playClick())});async function Z(){let d=await Fe()||{};(!d.amName||d.amName==="N/A")&&(d.amName=d.internalEmail||"N/A"),o=d,q.querySelectorAll(".bau-vital-highlights").forEach(b=>{let S=[{label:"Anunciante",value:d.advName},{label:"CID",value:d.cid},{label:"Website",value:d.website||d.site},{label:"Case ID",value:d.caseId}];b.innerHTML=S.map(A=>{let T=A.value&&A.value!=="N/A"&&A.value!=="undefined"&&A.value!=="null"?A.value:"N\xE3o capturado";return`
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${A.label}</span>
                        <span class="bau-highlight-value">${T}</span>
                    </div>
                `}).join("")}),Ye.steps.forEach(b=>{b.fields&&b.fields.forEach(S=>{if(S.isSmart){let A=d[S.id];S.id==="language"&&d.userProfile?.defaultLanguage&&(A=d.userProfile.defaultLanguage);let T=q.querySelector(`#bau-step-${b.id} [name="${S.name}"]`),u=q.querySelector(`#bau-step-${b.id} #wrapper-${S.id}`);if(T&&(T.value=A&&A!=="N/A"?A:"",S.id==="language"&&A&&A!=="N/A"&&(T.readOnly=!0,T.style.background="#F1F3F4",T.style.cursor="not-allowed")),u){let L=A&&A!==""&&A!=="N/A"&&A!=="undefined"&&A!=="null";S.id==="language"?u.style.display="block":u.style.display=L?"none":"block"}}})}),q.querySelectorAll(".bau-all-data").forEach(b=>{let S=[{label:"Anunciante",value:d.advName},{label:"CID",value:d.cid},{label:"AM",value:d.amName},{label:"SE ID",value:d.seId},{label:"Site",value:d.website||d.site},{label:"Email",value:d.email},{label:"Timezone",value:d.timezone},{label:"Case ID",value:d.caseId},{label:"Programa",value:d.salesProgram},{label:"Idioma",value:d.language}];b.innerHTML=`
                <div class="bau-context-badges-grid">
                    ${S.filter(A=>A.value&&A.value!=="N/A"&&A.value!=="---"&&A.value!=="undefined"&&A.value!=="null").map(A=>`
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${A.label}:</span>
                                <span class="bau-badge-value">${A.value}</span>
                            </div>
                        `).join("")}
                </div>
            `})}l.querySelector("#bau-top-se-search")?.addEventListener("click",d=>{d.preventDefault(),ut("bau-form-seId")});let oe=l.querySelector("#bau-form-cid");oe&&oe.addEventListener("input",()=>C(1));function O(){let d=new FormData(q),v=Object.fromEntries(d.entries()),k=l.querySelector("#bau-confirmation-details");if(k){if(n==="BAU"){let b=d.getAll("taskType"),S=b.length>0?b.join(", "):"Nenhuma";k.innerHTML=`
                ${i?`<div class="bau-highlight-panel" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${$e.yellow}; background: rgba(255, 186, 0, 0.05); border-radius: 8px; font-weight: 500;">Voc\xEA est\xE1 editando o caso #<span style="color: ${$e.yellow}">${s}</span></div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Anunciante</span>
                        <input class="bau-confirm-value-input" data-field="advName" data-step="1" value="${v.advName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">CID</span>
                        <input class="bau-confirm-value-input" data-field="cid" data-step="1" value="${v.cid||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">AM</span>
                        <input class="bau-confirm-value-input" data-field="amName" data-step="1" value="${v.amName||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Website</span>
                        <input class="bau-confirm-value-input" data-field="website" data-step="1" value="${v.website||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="1" value="${v.seId||""}" placeholder="N\xE3o informado">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">O que deve ser feito</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="reason" data-step="2" placeholder="---">${v.reason||""}</textarea>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Tasks</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="Para editar as tasks, volte ao Passo 2">${S}</span>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Justificativa BAU</span>
                        <select class="bau-confirm-value-input" data-field="nonImplementationReason" data-step="3">
                            <option value="Tempo da consultoria esgotado" ${v.nonImplementationReason==="Tempo da consultoria esgotado"?"selected":""}>Tempo da consultoria esgotado</option>
                            <option value="Solicita\xE7\xE3o de reagendamento pelo anunciante" ${v.nonImplementationReason==="Solicita\xE7\xE3o de reagendamento pelo anunciante"?"selected":""}>Solicita\xE7\xE3o de reagendamento pelo anunciante</option>
                            <option value="Falta de acessos ou backup do site" ${v.nonImplementationReason==="Falta de acessos ou backup do site"?"selected":""}>Falta de acessos ou backup do site</option>
                            <option value="Anunciante indispon\xEDvel ou n\xE3o preparado" ${v.nonImplementationReason==="Anunciante indispon\xEDvel ou n\xE3o preparado"?"selected":""}>Anunciante indispon\xEDvel ou n\xE3o preparado</option>
                            <option value="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)" ${v.nonImplementationReason==="Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)"?"selected":""}>Implementa\xE7\xE3o parcial (nem todas as tasks conclu\xEDdas)</option>
                            <option value="Solicita\xE7\xE3o de tarefas (tasks) adicionais" ${v.nonImplementationReason==="Solicita\xE7\xE3o de tarefas (tasks) adicionais"?"selected":""}>Solicita\xE7\xE3o de tarefas (tasks) adicionais</option>
                            <option value="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)" ${v.nonImplementationReason==="Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)"?"selected":""}>Necessidade de novas altera\xE7\xF5es (fase de acompanhamento)</option>
                            <option value="Retorno de contato ap\xF3s prazo de 14 dias expirado" ${v.nonImplementationReason==="Retorno de contato ap\xF3s prazo de 14 dias expirado"?"selected":""}>Retorno de contato ap\xF3s prazo de 14 dias expirado</option>
                        </select>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Descri\xE7\xE3o</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="3" placeholder="---">${v.description||""}</textarea>
                    </div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Disponibilidade (Prioridade)</span>
                        <input type="datetime-local" class="bau-confirm-value-input" data-field="availability_1" data-step="3" value="${v.availability_1||""}">
                    </div>
                </div>
            `}else k.innerHTML=`
                ${i?`<div class="bau-highlight-panel discard-theme" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${$e.red}; background: rgba(217, 48, 37, 0.05); border-radius: 8px; font-weight: 500;">Voc\xEA est\xE1 editando o descarte do caso #<span style="color: ${$e.red}">${s}</span></div>`:""}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Case ID</span>
                        <input class="bau-confirm-value-input" data-field="caseId" data-step="5" value="${v.caseId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Idioma</span>
                        <input class="bau-confirm-value-input" data-field="language" data-step="5" value="${v.language||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="5" value="${v.seId||""}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Motivo do Descarte</span>
                        <input class="bau-confirm-value-input" data-field="reason" data-step="5" value="${v.reason||""}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Descri\xE7\xE3o do Descarte</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="5" placeholder="---">${v.description||""}</textarea>
                    </div>
                </div>
            `;k.querySelectorAll(".bau-confirm-value-input").forEach(b=>{b.addEventListener("input",S=>{let A=S.target.dataset.field,T=S.target.dataset.step;if(!A||!T)return;let u=q.querySelector(`#bau-step-${T} [name="${A}"]`);u&&(u.value=S.target.value,A==="cid"&&C(1))})})}}async function R(d){if(!await ve("Aten\xE7\xE3o: Para editar as informa\xE7\xF5es, voc\xEA deve estar com a p\xE1gina deste Caso espec\xEDfico aberta no sistema. Caso contr\xE1rio, os dados capturados estar\xE3o incorretos.",{confirmText:"Estou na p\xE1gina correta"}))return;_(!0),z(),i=!0,s=d.id,n=d.status==="PENDING_TL_DISCARD"||d.reason&&!d.task?"DISCARD":"BAU",H("form"),await Z(),o={...o,advName:d.advName||o.advName,cid:d.cid||o.cid,caseId:d.caseId||o.caseId,seId:d.seId||o.seId,site:d.site||d.website||o.site||o.website,email:d.advEmail||o.email,timezone:d.timezone||o.timezone,language:d.language||o.language,amName:d.amName||o.amName,salesProgram:d.salesProgram||o.salesProgram};let k=d.availability?d.availability.split("|").map(b=>b.trim()):[];q.querySelectorAll("input, select, textarea").forEach(b=>{let S=b.name,T={advEmail:"advEmail",website:"site",site:"site"}[S]||S;if(S==="taskType"){let u=(d.task||d.taskType||"").split(",").map(L=>L.trim());b.type==="checkbox"&&(b.checked=u.includes(b.value),b.closest(".bau-task-item")?.classList.toggle("active",b.checked))}else if(S.startsWith("availability_")){let u=parseInt(S.split("_")[1])-1,L=k[u];if(L&&b.type==="datetime-local")try{let N=new Date(L);if(!isNaN(N.getTime())){let X=new Date(N.getTime()-N.getTimezoneOffset()*6e4).toISOString().slice(0,16);b.value=X}}catch{}}else d[T]!==void 0?b.value=d[T]:S==="reason"?b.value=d.reason:S==="description"?b.value=d.description:S==="nonImplementationReason"&&(b.value=d.nonImplementationReason||"")}),a=n==="BAU"?1:5,w(),P.playClick(),setTimeout(()=>_(!1),500)}q.onsubmit=async d=>{d.preventDefault();let v=n==="BAU"?[1,2,3]:[5];for(let u of v)if(!Ye.steps.find(N=>N.id===u)?.isConfirmation&&(!C(u)||!M(u))){console.warn(`Form submission blocked by validation failure in step ${u}`),a=u,w();return}let k=l.querySelector(".bau-btn-submit");k.disabled=!0,k.innerHTML="Enviando...";let b=new FormData(q),S=Object.fromEntries(b.entries()),A=o||{},T={...A,...S,requestType:n};if(S.advEmail?T.advEmail=S.advEmail:A.email&&(T.advEmail=A.email),S.website?T.website=S.website:A.website?T.website=A.website:A.site&&(T.website=A.site),n==="BAU"){let u=b.getAll("taskType"),L=[S.availability_1,S.availability_2,S.availability_3].filter(N=>N&&N.trim()!=="").join(" | ");T.taskType=u.join(", "),T.availability=L,i?(S.nonImplementationReason?T.nonImplementationReason=S.nonImplementationReason:delete T.nonImplementationReason,S.description?T.description=S.description:delete T.description):(T.nonImplementationReason=S.nonImplementationReason||"",T.description=S.description||"",T.nonImplementationReason||console.warn("Aviso: Campo 'Justificativa' (nonImplementationReason) est\xE1 saindo vazio."),T.description||console.warn("Aviso: Campo 'Descri\xE7\xE3o detalhada' (description) est\xE1 saindo vazio."))}else T.reason=S.reason,i?(S.description?T.description=S.description:delete T.description,delete T.taskType,delete T.availability,delete T.nonImplementationReason):(T.taskType="",T.availability="",T.nonImplementationReason="",T.description=S.description||"");try{i?await jt(s,T):await Pt(T,A.agentEmail||"anon"),P.playSuccess();let u=l.querySelector(".bau-success-title");u&&(i?u.textContent="Caso atualizado com sucesso!":u.textContent=n==="DISCARD"?"Caso enviado para descarte com sucesso!":"Caso enviado com sucesso!"),H("success")}catch(u){ee("Erro: "+(u.message||"Erro desconhecido"),{error:!0}),console.error("Payload que tentou enviar:",T)}finally{k.disabled=!1,k.innerHTML=`${ue.send} Enviar para o TL`}};function z(){q.reset(),a=0,n="BAU",i=!1,s=null,w(),q.querySelectorAll(".bau-task-item.active").forEach(v=>v.classList.remove("active"));let d=q.querySelector('[name="language"]');d&&(d.readOnly=!1,d.style.background="",d.style.cursor="")}l.querySelector("#bau-new-case-btn").addEventListener("click",()=>{z(),H("form"),Z()}),l.querySelector("#bau-form-back-btn").addEventListener("click",()=>H("dashboard")),l.querySelector("#bau-success-back-btn").addEventListener("click",()=>H("dashboard"));async function Q(){t=!t,l.style.display=t?"flex":"none",t&&(H("dashboard"),G()),be(t,l,"cw-btn-bauform")}return w(),Q}function ma(){if(window.techSolInitialized){Ft();return}window.techSolInitialized=!0;let t="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{Yt();try{P.initGlobalListeners(),P.playStartup()}catch(c){console.warn("\xC1udio bloqueado:",c)}ce.fetchTips(),Ft();let e=ho(),o=So(),a=Eo(),n=ko(),i=qo(),s=_o(),r=Do(),l=Ro(),g=To();po({toggleNotes:e,toggleEmail:o,toggleScript:a,toggleLinks:n,toggleTimezone:i,toggleLibrary:s,toggleConfigs:r,toggleBAUForm:l,broadcastControl:g}),setTimeout(()=>{ce.logEvent("App","Start","Session Start"),Fo(),setTimeout(()=>{Lo(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),ee("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}ma();})();
